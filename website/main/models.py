from flask_sqlalchemy import SQLAlchemy
from main import app

## Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/project2-4'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db = SQLAlchemy(app)

## User model
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64))

    def __repr__(self):
        return '<User %r>' % self.username
