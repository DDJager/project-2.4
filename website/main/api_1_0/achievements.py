from . import api
from flask import jsonify, g
from main.models import auth, Achievement, AchievementUser, User, Game

def get_achievements_from_user(user_id):
    # select * from achievements_users
    achievements = Achievement.query.all()
    achievements_users = AchievementUser.query.filter_by(user_id=user_id).all()

    # Create an empty list
    data = [ ]

    # Loop through all achievements
    for achievement_user in achievements_users:
        achievement_id = achievement_user.achievement_id
        achievement = Achievement.query.filter_by(id=achievement_id).first()

        game = Game.query.filter_by(id=achievement.game_id).first()
        user = User.query.filter_by(id=user_id).first()


        data.append({
            'name': achievement.name,
            'description': achievement.description,
            'game': {
                'id': game.id,
                'name': game.name,
                'description': game.description
            }
        })
    return data

@api.route('/achievements/<int:user_id>')
@auth.login_required
def get_achievements_where_user_id_is(user_id):
    achievements = get_achievements_from_user(user_id)
    # # select * from achievements_users
    # achievements = Achievement.query.all()
    # achievements_users = AchievementUser.query.filter_by(user_id=user_id).all()
    #
    # # Create an empty list
    # data = [ ]
    #
    # # Loop through all achievements
    # for achievement_user in achievements_users:
    #     achievement_id = achievement_user.achievement_id
    #     achievement = Achievement.query.filter_by(id=achievement_id).first()
    #
    #     game = Game.query.filter_by(id=achievement.game_id).first()
    #     user = User.query.filter_by(id=user_id).first()
    #
    #
    #     data.append({
    #         'name': achievement.name,
    #         'description': achievement.description,
    #         'game': {
    #             'id': game.id,
    #             'name': game.name,
    #             'description': game.description
    #         }
    #     })

    return jsonify({
        'status': 'success',
        'achievements': achievements,
        'id': user_id
    }), 200



@api.route('/achievements')
@api.route('/achievements/')
#@auth.login_required
def get_achievements():
    achievements = get_achievements_from_user(g.user.id)

    return jsonify({
        'status': 'success',
        'achievements': achievements,
        'id': g.user.id
    }), 200
    # # SELECT * FROM users
    # achievements = Achievement.query.all()
    #
    # # Create an empty list
    # data = [
    #
    # ]
    #
    # # Loop trough all users. Append a list with the db row data everytime
    # for achievement in achievements:
    #     # For every achievement, grab a game object, by their id
    #     game = Game.query.filter_by(id=achievement.game_id).first()
    #
    #     data.append({
    #         'name': achievement.name,
    #         'description': achievement.description,
    #         'game': {
    #             'id': game.id,
    #             'name': game.name,
    #             'description': game.description
    #         }
    #     })
    #
    # # Convert the data to JSON
    # response = jsonify(data)
    #
    # # Return the response
    # return response
