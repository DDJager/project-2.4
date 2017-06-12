from . import api
from flask import jsonify, request, abort, g
from main.models import db, auth, User

@api.route('/authenticate/', methods=['POST'])
def authenticate():

    # Get POST data
    username = request.json.get('username')
    password = request.json.get('password')
    picture_url = request.json.get('picture_url')
    description = request.json.get('description')
    if picture_url is None:
        picture_url = 'via.placeholder.com/100x100'

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
    return jsonify({ 'username': user.username })




@api.route('/token')
@auth.login_required
def get_token():
    token = g.user.generate_auth_token(600)
    return jsonify({ 'token': token.decode('ascii') })

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
