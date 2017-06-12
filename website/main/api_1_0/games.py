from . import api
from flask import jsonify
from main.models import auth, Game

@api.route('/games/')
@auth.login_required
def get_games():

    # SELECT * FROM games
    games = Game.query.all()

    # Create an empty list
    data = []

    # Loop trough all games. Append a list with the db row data everytime
    for game in games:

        achievements = []

        # For every game, loop through the achievement relation
        for x in range(0, len(game.achievements)):
            achievements.append({
                'id': game.achievements[x].id,
                'name': game.achievements[x].name,
                'description': game.achievements[x].description
            })

        data.append({
            'name': game.name,
            'description': game.description,
            'achievements': achievements
        })


    # Convert the data to JSON
    response = jsonify(data)

    # Return the response
    return response
