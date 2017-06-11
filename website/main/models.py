from flask_sqlalchemy import SQLAlchemy
from main import app, manager
from flask_migrate import Migrate, MigrateCommand

## Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/project2-4'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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
    friends = db.relationship('Friendship', backref='user')

    # Default return value
    def __repr__(self):
        return '<User %r>' % self.username


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
        return '<Role %r>' % self.name

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
        return '<Role %r>' % self.name


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
        return '<Role %r>' % self.name
