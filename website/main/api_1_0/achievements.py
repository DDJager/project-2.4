from . import api
from flask import jsonify
from main.models import auth, Achievement, Game

@api.route('/achievements/')
@auth.login_required
def get_achievements():

    # SELECT * FROM users
    achievements = Achievement.query.all()

    # Create an empty list
    data = [

    ]

    # Loop trough all users. Append a list with the db row data everytime
    for achievement in achievements:
        # For every achievement, grab a game object, by their id
        game = Game.query.filter_by(id=achievement.game_id).first()

        data.append({
            'name': achievement.name,
            'description': achievement.description,
            'game': {
                'id': game.id,
                'name': game.name,
                'description': game.description

            }
        })

    # Convert the data to JSON
    response = jsonify(data)

    # Return the response
    return response
