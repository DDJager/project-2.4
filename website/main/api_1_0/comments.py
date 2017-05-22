from . import api

# # # # # # #
# DUMMY FILE
# # # # # # #

@api.route('/comments/')
def comments():
    return 'comments';
