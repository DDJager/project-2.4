from flask import Blueprint

api = Blueprint('api', __name__)

# @api.route('/users/')
# def users():
#     return 'users';


from . import history, users, achievements, friendships, games, authentication
