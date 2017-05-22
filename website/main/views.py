from main import app

# # # # # # #
# DUMMY FILE
# # # # # # #

@app.route('/')
def index():
    return '<h1>Hello world!</h1>'
