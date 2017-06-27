from . import api
from flask import jsonify
from main.models import auth, User

@api.route('/user', defaults={'user_id': None})
@api.route('/user/', defaults={'user_id': None})
@api.route('/user/<int:user_id>')
@api.route('/user/<int:user_id>/')
@auth.login_required
def get_user(user_id):
    if user_id is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'User id not supplied'
        }), 400

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            'result': 'failure',
            'error': '404',
            'message': 'User not found'
        }), 404

    return jsonify({
        'result': 'success',
        'user': {
            'id': user.id,
            'username': user.username,
            'picture_url': user.picture_url,
            'description': user.description,
            'ranking': user.ranking
        }
    }), 200


@api.route('/search/user', defaults={'username': None})
@api.route('/search/user/', defaults={'username': None})
@api.route('/search/user/<username>')
@auth.login_required
def get_user_by_username(username):
    if username is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'Username not supplied'
        }), 400

    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({
            'result': 'failure',
            'error': '404',
            'message': 'User not found'
        }), 404

    return jsonify({
        'result': 'success',
        'user': {
            'id': user.id,
            'username': user.username,
            'picture_url': user.picture_url,
            'description': user.description,
            'ranking': user.ranking
        }
    }), 200

@api.route('/users/')
@api.route('/users')
@auth.login_required
def get_users():

    # SELECT * FROM users
    users = User.query.all()

    # Create an empty list
    data = []

    # Loop trough all users. Append a list with the db row data everytime
    for user in users:
        data.append({
            'username': user.username,
            'picture_url': user.picture_url,
            'description': user.description
        })

    # Convert the data to JSON
    response = jsonify(data)

    # Return the response
    return response, 200
