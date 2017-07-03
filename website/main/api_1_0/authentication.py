from . import api
from flask import jsonify, request, abort, g
from main.models import db, auth, User
from random import randint

def get_picture_url():
    eyes = [1,10,2,3,4,5,6,7,9]
    noses = [2,3,4,5,6,7,8,9]
    mouths = [1,10,11,3,5,6,7,9]
    colors = [
        'B44D66', '42794C', 'BB620B', '0072BD', 'CA8E88',
        'E6E850', 'F0DE4C', '747A86', 'D0F209', 'F11451',
        'E9367F', 'F798C1', 'FBF0F4', 'E6E6CB', 'C60849'
    ]
    picture_url = "https://api.adorable.io/avatars/face/eyes{0}/nose{1}/mouth{2}/{3}".format(
        eyes[randint(0,len(eyes)-1)],
        noses[randint(0,len(noses)-1)],
        mouths[randint(0,len(mouths)-1)],
        colors[randint(0, len(colors)-1)]
    )
    return picture_url

@api.route('/signup', methods=['POST'])
#@api.route('/signup/', methods=['POST'])
def sign_up():
    username = request.json.get('username')
    password = request.json.get('password')
    picture_url = request.json.get('picture_url')
    description = request.json.get('description')

    if description is None:
        description = ''

    if picture_url is None:
        picture_url = get_picture_url()

    if username is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'Username field is empty'
        }), 400

    if password is None:
        return jsonify({
            'result': 'failure',
            'error': '400',
            'message': 'Password field is empty'
        })

    if User.query.filter_by(username = username).first() is not None:
        return jsonify({
            'result': 'failure',
            'error': '409',
            'message': 'User already exists'
        }), 409

    user = User(username=username, picture_url=picture_url, description=description)
    user.hash_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'result': 'success',
        'user': {
            'id': user.id,
            'username': username,
            'picture_url': picture_url,
            'description': description,
            'ranking': 1
        }
    }), 201 # created

@api.route('/signin', methods=['GET'])
@api.route('/signin/', methods=['GET'])
@auth.login_required
def sign_in():
    token = g.user.generate_auth_token(600)

    return jsonify({
        'result': 'success',
        'token': token.decode('ascii'),
        'user': {
            'id': g.user.id,
            'username': g.user.username,
            'picture_url': g.user.picture_url,
            'description': g.user.description,
            'ranking': g.user.ranking
        }
    }), 200

@auth.verify_password
def verify_password(username_or_token, password):
    # First try to authenticate by token
    user = User.verify_auth_token(username_or_token)

    if not user:
        # Try to authenticate with username/password
        user = User.query.filter_by(username = username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True




@api.route('/authenticate/', methods=['POST'])
def authenticate():
    eyes = [1,10,2,3,4,5,6,7,9]
    noses = [2,3,4,5,6,7,8,9]
    mouths = [1,10,11,3,5,6,7,9]
    # Get POST data
    username = request.json.get('username')
    password = request.json.get('password')
    picture_url = request.json.get('picture_url')
    description = request.json.get('description')
    if picture_url is None:
        picture_url = "https://api.adorable.io/avatars/face/eyes{0}/nose{1}/mouth{2}/{3}".format(
            eyes[randint(0,len(eyes)-1)],
            noses[randint(0,len(noses)-1)],
            mouths[randint(0,len(mouths)-1)],
            'FF6600'
        )

    if username is None or password is None or description is None:
        abort(400) # Missing arguments
    if User.query.filter_by(username = username).first() is not None:
        abort(400) # User already exists

    # Create a new User object and pass the POST data in the constructor. Hash the password
    user = User(username=username, picture_url=picture_url, description=description)
    user.hash_password(password)

    # Add the user object to the database
    db.session.add(user)
    db.session.commit()

    # @TODO in the future: {'Location': url_for('get_user', id = user.id, _external = True)}
    return jsonify({
        'username': user.username
    })




@api.route('/token')
@auth.login_required
def get_token():
    token = g.user.generate_auth_token(600)
    return jsonify({
        'token': token.decode('ascii'),
        'user': {
            'id': g.user.id,
            'username': g.user.username,
            'picture_url': g.user.picture_url,
            'description': g.user.description
        }
    })

@auth.verify_password
def verify_password(username_or_token, password):
    # First try to authenticate by token
    user = User.verify_auth_token(username_or_token)

    if not user:
        # Try to authenticate with username/password
        user = User.query.filter_by(username = username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True
