from . import api
from flask import jsonify, request, abort, g
from main.models import db, auth, User
from main import mongo
import json
from bson.objectid import ObjectId
from bson import Binary, Code
from bson.json_util import dumps

# both players lose
# {
# 	"winner": null,
# 	"losers": [
# 		{ "id": 1},
# 		{ "id": 2}
# 		]
# }

# one player wins and the other loses
# {
# 	"winner": { "id": 1 },
# 	"losers": [ { "id": 2 } ]
# }
@api.route('/game/stop', methods=['POST'], defaults={'game_id': None})
@api.route('/game/stop/', methods=['POST'], defaults={'game_id': None})
@api.route('/game/stop/<game_id>', methods=['POST'])
# @auth.login_required
def game_stop(game_id):
    if game_id is None:
        return jsonify({
            'result': 'failure',
            'error': 400,
            'message': 'game id parameter not provided'
        }), 400

    game = mongo.db.games.find_one({
        "gameId": game_id
    })
    print(game)
    if game is None:
        return jsonify({
            'result': 'failure',
            'error': '404',
            'message': 'game does not exist'
        }), 404

    mongo.db.games.update_one(
        {'_id': ObjectId(str(game['_id']))},
        { "$set": {
            "winner": request.json.get('winner'),
            "losers": request.json.get('losers')
        }
    })

    return jsonify({
        'status': 'success'
    }), 200


# Example code
# {
# 	"players": [1, 2],
# 	"playerOne": 1,
# 	"word": "PIZZA",
# 	"gameId": 2
# }
@api.route('/game/new', methods=['POST'])
# @auth.login_required
def game_new():
    if request.json.get('players') is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'Requires players array'
        }), 400

    if request.json.get('playerOne') is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'PlayerOne should be provided'
        }), 400

    if request.json.get('word') is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'Word should be provided'
        }), 400

    games = mongo.db.games

    game = {
        "playerOne": {
            "id": request.json.get('playerOne')
        },
        "players": [
            { "id": request.json.get('players')[0]},
            { "id": request.json.get('players')[1]}
        ],
        "word": request.json.get('word'),
        # "gameId": request.json.get('gameId'),
        "lettersPlayed": [],
        "winner": None,
        "losers": []
    }
    inserted_game = games.insert_one(game)

    games.update_one(
        {'_id': inserted_game.inserted_id},
        { "$set": {
            "gameId": str(inserted_game.inserted_id)
        }
    })

    look_up_game = games.find_one({
        "gameId": str(inserted_game.inserted_id)
    })

    return jsonify({
        'status': 'success',
        'gameId': look_up_game['gameId']
    }), 201

    # check if game already exists
    # look_up_game = games.find_one({
    #     "gameId": request.json.get('gameId')
    # })

    # if look_up_game is None:
    #     game = {
    #         "playerOne": {
    #             "id": request.json.get('playerOne')
    #         },
    #         "players": [
    #             { "id": request.json.get('players')[0]},
    #             { "id": request.json.get('players')[1]}
    #         ],
    #         "word": request.json.get('word'),
    #         "gameId": request.json.get('gameId'),
    #         "lettersPlayed": [],
    #         "winner": None,
    #         "losers": []
    #     }
    #     games.insert_one(game)
    #     return jsonify({
    #         'status': 'success'
    #     }), 201
    # else:
    #     return jsonify({
    #         'result': 'failure',
    #         'error': '409',
    #         'message': 'conflicted. game already exists'
    #     }), 409


#
# Example code
# {
# 	"letter": "B",
# 	"player": 2
# }
@api.route('/game/play', methods=['POST'], defaults={'game_id': None})
@api.route('/game/play/', methods=['POST'], defaults={'game_id': None})
@api.route('/game/play/<game_id>', methods=['POST'])
# @auth.login_required
def game_play(game_id):
    if game_id is None:
        return jsonify({
            'result': 'failure',
            'error': 400,
            'message': 'game id parameter not provided'
        }), 400

    if request.json.get('player') is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'player field is required'
        }), 400

    if request.json.get('letter') is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'letter field is required'
        }), 400

    gameId = {
        "gameId": int(game_id)
    }
    games = mongo.db.games
    game = games.find_one(gameId)
    print(game)
    if game is None:
        return jsonify({
            'result': 'failure',
            'error': '404',
            'message': 'game does not exist'
        }), 404

    letterPlayed = {
        "letter": request.json.get('letter'),
        "player": request.json.get('player')
    }

    lettersPlayed = game['lettersPlayed']

    lettersPlayed.append(letterPlayed)

    mongo.db.games.update_one(
        {'_id': ObjectId(str(game['_id']))},
        { "$set": {
            "lettersPlayed": lettersPlayed
        }
    })

    return jsonify({
        'status': 'success'
    }), 200

@api.route('/history/<int:user_id>')
@auth.login_required
def history(user_id):
    games = mongo.db.games.find({
        'players': {
            '$elemMatch': {
                'id': user_id
            }
        }
    })
    won = 0;
    lost = 0;
    played = 0;
    # print(g.user.id)
    # print(games)
    for game in games:
        played += 1
        if game['winner'] is not None:
            if game['winner']['id'] == user_id:
                won += 1

        if len(game['losers']) > 0:
            for loser in game['losers']:
                if loser['id'] == user_id:
                    lost += 1

        # print(game)


    return jsonify({
        'result': 'success',
        'games': {
            'played': played,
            'won': won,
            'lost': lost
        }
    }), 200
