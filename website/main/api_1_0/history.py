from . import api
from flask import jsonify, request, abort, g
from main.models import db, auth, User
from main import mongo
import json
from bson.objectid import ObjectId
from bson import Binary, Code
from bson.json_util import dumps

# Example code
# {
# 	"players": [1, 2],
# 	"playerOne": 1,
# 	"word": "PIZZA",
# 	"gameId": 2
# }
@api.route('/history', methods=['POST'])
@auth.login_required
def add_game():
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

    if request.json.get('gameId') is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'Requires gameId field'
        }), 400

    games = mongo.db.games
    # check if game already exists
    look_up_game = games.find_one({
        "gameId": request.json.get('gameId')
    })

    if look_up_game is None:
        game = {
            "playerOne": {
                "id": request.json.get('playerOne')
            },
            "players": [
                { "id": request.json.get('players')[0]},
                { "id": request.json.get('players')[1]}
            ],
            "word": request.json.get('word'),
            "gameId": request.json.get('gameId'),
            "lettersPlayed": []
        }

        game_id = str(games.insert_one(game).inserted_id)
        return jsonify({
            'game': {
                'id': str(game_id)
            }
        }), 201
    else:
        game_id = look_up_game['_id']
        return jsonify({
            'game': {
                'id': str(game_id)
            }
        }), 200


#
# <id> is the mongo ObjectId not the game id
#
# Example code
# {
# 	"letter": "B",
# 	"player": 2
# }
@api.route('/history/', methods=['POST'], defaults={'id': None})
@api.route('/history/<id>', methods=['POST'])
@auth.login_required
def add_history(id):
    if id is None:
        return jsonify({
            'result': 'failure',
            'error': 400,
            'message': 'id field not provided'
        }), 400

    if not ObjectId.is_valid(id):
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'id is not valid'
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

    game_id = {
        "_id": ObjectId(id)
    };
    games = mongo.db.games
    game = games.find_one(game_id)

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
        {'_id': ObjectId(id)},
        { "$set": {
            "lettersPlayed": lettersPlayed
        }
    })

    return jsonify({
        'status': 'success'
    }), 200

@api.route('/history/get/id', methods=['GET'], defaults={'game_id': None})
@api.route('/history/get/id/', methods=['GET'], defaults={'game_id': None})
@api.route('/history/get/id/<int:game_id>', methods=['GET'])
def get_id_by_game_id(game_id):
    if game_id is None:
        return jsonify({
            'result': 'failure',
            'error': 400,
            'message': 'game_id field not provided'
        }), 400

    game = mongo.db.games.find_one({
        "gameId": game_id
    })

    if game is None:
        return jsonify({
            'result': 'failure',
            'error': 404,
            'message': 'game does not exist'
        }), 404
    else:
        return jsonify({
            "id": str(game['_id'])
        }), 200
