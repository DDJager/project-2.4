from flask import Flask
app = Flask(__name__)

# This file bootstraps the application. It imports the Flask library.
# You can add multiple files to this application as long as you import them here.
# To import a file, use: "import main.FILENAME" without the .py extension.
# You then need to open the FILENAME.py file and import the app variable
# from this __init__.py file. Like so: "from main import app"

# Import Blueprints
from .api_1_0 import api as api_1_0_blueprint
app.register_blueprint(api_1_0_blueprint, url_prefix='/api/v1-0')

# Import normal files
import main.views
