from . import api

# # # # # # #
# DUMMY FILE
# # # # # # #

@api.route('/users/')
def users():
    return 'users';
