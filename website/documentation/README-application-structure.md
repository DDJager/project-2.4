#### (file) requirements.txt
The requirements such as libraries that are needed for this project

#### (file) setup.py
A simple setup/configuration file

#### (folder) venv
The folder for your virtual environment. Certain libraries gets installed in this folder if venv is activated.
Else it will install the packages globally.

#### (folder) website/api_1_0
* __init__.py (The bootstrapper for the API, we actually make a Blueprint of this folder/module which gets imported in the main application's __init__.py)
* comments.py (API and HTTP verbs specifically for the comments)

#### (folder) website/static
This is where all the css and/or javascript files will reside.

#### (folder) website/templates
The folder for the views in an MVC structure (think of users.php or users.html)

#### (folder) website/__init__.py
The bootstrapper of the application. It starts the application and imports all the neccesary files/modules

#### (folder) website/users.py or website/comments.py
You can see this as the controllers of the main application. In the main application folder, you can add a users.py or a comments.py.
