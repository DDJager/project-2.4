from flask_sqlalchemy import SQLAlchemy
from main import app, manager
from flask_migrate import Migrate, MigrateCommand
from flask_bcrypt import Bcrypt
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
from flask_httpauth import HTTPBasicAuth




## Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/project2-4'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '\x8b;\x98\xf0{\x9f;\xb4\x93\xcd5F\x18\xbe\xf3\xa5D\xe4\x9aB^\xc0v\xe3'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
auth = HTTPBasicAuth()

## Migration
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

## Relations
# user ~> profile                               (one to one)
# user ~> friendships <~ user                   (many to many)
# game ~> achievements                          (one to many)
# user ~> achievements_users <~ achievements    (many to many)

## User model
class User(db.Model):
    # Table name
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    password = db.Column(db.String(128))
    picture_url = db.Column(db.String(256))
    description = db.Column(db.Text())
    # friends = db.relationship('User', backref='user')

    # Default return value
    def __repr__(self):
        return '<User %r>' % self.username

    # Helper methods
    def hash_password(self, password):
        self.password = bcrypt.generate_password_hash(password)

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({ 'id': self.id })

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user



## Friendship model
class Friendship(db.Model):
    # Table name
    __tablename__ = 'friendships'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id_1 = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_id_2 = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Default return value
    def __repr__(self):
        return '<Friendship %r>' % self.name

## Game model
class Game(db.Model):
    # Table name
    __tablename__ = 'games'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    description = db.Column(db.Text())
    achievements = db.relationship('Achievement', backref='game')

    # Default return value
    def __repr__(self):
        return '<Game %r>' % self.name


## Achievement model
class Achievement(db.Model):
    # Table name
    __tablename__ = 'achievements'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    name = db.Column(db.String(64))
    description = db.Column(db.Text())

    # Default return value
    def __repr__(self):
        return '<Achievement %r>' % self.name
