# project-2.4
Project 2.4

How to install:
- Install Python 3+
- Install Pip (Add Python and pip to your PATH. It Comes with Python 3.4+)
- Use "pip install virtualenv" to install virtualenv. With virtualenv you can use extensions without installing them globally on your computer.
This means that you can "pip install flask" or certain other flask libraries for your application specifically.
- Go to project-2.4/website in the command line and enter "virtualenv venv". If an environment is installed on your computer locally,
use "venv\Scripts\activate.bat" (Windows) to switch to this application's environment. Type "deactivate" in the command line to switch back to the global environment.
- Use "pip install -r requirements.txt" (in virtualenv mode) to install all python libraries to your virtual environment. NOTE: If you ever add a new library (like flask-redis
), use "pip freeze > requirements.txt" to write all the current pip installations along with the recently installed pip library to the requirements.txt file (For more info: https://pip.pypa.io/en/stable/reference/pip_freeze/)
- To run the server, find out what Python file initializes/bootstraps the application and type "python file_name.py". The server will be running on http://127.0.0.1:5000/
