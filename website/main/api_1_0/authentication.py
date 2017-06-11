from . import api
from flask import jsonify, request
from main.models import db, User

@api.route('/authenticate/', methods=['POST'])
def authenticate():

    # Get POST data
    username = request.form['username']
    password = request.form['password']
    picture_url = 'via.placeholder.com/100x100'
    description = request.form['description']

    # Create a new User object and pass the POST data in the constructor. Hash the password
    user = User(username=username, picture_url=picture_url, description=description)
    user.hash_password(password)

    # Add the user object to the database
    db.session.add(user)
    db.session.commit()

    return "Created new user"
