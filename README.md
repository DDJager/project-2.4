# Project-2.4

# Extra Documentation
- [Information about the main application structure](https://github.com/DDJager/project-2.4/blob/master/website/documentation/README-application-structure.md)
- [Information about the API structure](https://github.com/DDJager/project-2.4/blob/master/website/documentation/README-api.md)

# Libraries used:
- (NOT USED) Flask-RESTful (misschien? Kan ook zonder) (https://flask-restful.readthedocs.io/en/0.3.5/)
- (NOT USED) Flask-PyMongo (http://flask-pymongo.readthedocs.io/en/latest/)

# How to install:
## Windows
- Install Python 3+
- Install Pip (Add Python and pip to your PATH. It Comes with Python 3.4+)
- Use "pip install virtualenv" to install virtualenv. With virtualenv you can use extensions without installing them globally on your computer.
This means that you can "pip install flask" or certain other flask libraries for your application specifically.
- Go to project-2.4/website in the command line and enter "virtualenv venv". If an environment is installed on your computer locally,
use "venv\Scripts\activate.bat" (Windows) to switch to this application's environment. Type "deactivate" in the command line to switch back to the global environment.
- Use "pip install -r requirements.txt" (in virtualenv mode) to install all python libraries to your virtual environment. NOTE: If you ever add a new library (like flask-redis
), use "pip freeze > requirements.txt" to write all the current pip installations along with the recently installed pip library to the requirements.txt file (For more info: https://pip.pypa.io/en/stable/reference/pip_freeze/)
- To run the server, go to the /website director (with setup.py in it) and type "pip install -e ." in the command line. After that type: "set FLASK_APP=main" and "set FLASK_DEBUG=true". If you use OSX or Linux, use export instead of set. Then type: "flask run". The server will be running on http://127.0.0.1:5000/
- Download and install MongoDB (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- Enable MongoDB authentication (https://docs.mongodb.com/master/tutorial/enable-authentication/)
- Watch this 30 minute MongoDB tutorial (https://www.youtube.com/watch?v=pWbMrx5rVBE)

## macOS
- Install [Python 3 & pip](http://python-guide-pt-br.readthedocs.io/en/latest/starting/install3/osx/)
- Install "virtualenv"
- In terminal:  
  - Goto project-2.4/website and enter "virtualenv venv"
  - Enter "source venv/bin/activate" to activate and enter the virtual environment

- In the virtual environment use "pip install -r requirements.txt"
- To set up the server go to the "/website" directory and use "pip install -e . " NOTE: Don't forget the dot
- use "export FLASK_APP=main"
- use "export FLASK_DEBUG=1"
- use "deactivate" to exit the virtualenv

- See 'readme: Using migrations' to set up the database.
- Once you have done that go to 'readme: how to use' and see 'macOS'

# How to use:
## macOS
### Enter the virtual environment and start the server
- After install enter the virtual environment by going to folder where 'venv' is located and use "source venv/bin/activate"
- Go to folder "/website" and use "flask run" to start the server
    - The server is running on http://127.0.0.1:5000/
### Stop the server and deactivate and exit the virtual environment
- use "ctrl+c" to stop the flask process
- use "deactivate" to deactivate and extit the virtual environment

# Using migrations
- Create database "project2-4" in MySQL
- Run the command "flask db upgrade"
If this doesn't work, try deleting the migrations and do the following
- Run the command "flask db init"
- Run the command "Flask db migrate -m [message]"
- Run the command "flask db upgrade"
