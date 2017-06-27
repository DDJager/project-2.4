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
    
    return jsonify({
        'status': 'success',
        'achievements': achievements
    }), 200



@api.route('/achievements')
@api.route('/achievements/')
@auth.login_required
def get_achievements():
    achievements = get_achievements_from_user(g.user.id)

    return jsonify({
        'status': 'success',
        'achievements': achievements
    }), 200
