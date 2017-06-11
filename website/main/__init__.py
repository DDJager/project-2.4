# # # # # # # # # # # # #
#
# This file bootstraps the application. It imports the Flask library.
# You can add multiple files to this application as long as you import them here.
# To import a file, use: "import main.FILENAME" without the .py extension.
# You then need to open the FILENAME.py file and import the app variable
# from this __init__.py file. Like so: "from main import app"
#
# # # # # # # # # # # # #

# Import flask & Flask Manager
from flask import Flask
from flask_script import Manager

app = Flask(__name__)
manager = Manager(app)


# Import Blueprints
from .api_1_0 import api as api_1_0_blueprint
app.register_blueprint(api_1_0_blueprint, url_prefix='/api/v1-0')

# Import commands
import main.commands

# Import models
import main.models

# Import views (controllers)
import main.views
