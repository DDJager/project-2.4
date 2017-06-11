from main import app
from main.models import db, Game, Achievement, User, Friendship
import random

## In this file, you can add new commands for the CLI
## Run flask --help to see which commands you can use

###############
# DATABASE UP #
###############
@app.cli.command()
def init_db():
    """Initializes the database"""
    print("Initializing the database")

    print("Database initialized")

#################
# DATABASE DOWN #
#################
@app.cli.command()
def drop_db():
    """Drops the database"""
    print("Dropping the database")

    print("Database dropped")


###################
# DATABASE SEEDER #
###################
@app.cli.command()
def seed():
    """Seeds the database with dummy data"""
    print("Seeding the database")

    # ------------------- #
    # --- RANDOM DATA --- #
    # ------------------- #

    random_data = {

        # Descriptions
        'descriptions': [
            'Nullam sit amet ex volutpat, accumsan ex eu, ullamcorper libero. Nunc libero sapien, volutpat at ex a, vulputate viverra sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean quis efficitur arcu', 'Nullam molestie dapibus libero volutpat viverra. Etiam sit amet nulla leo.', 'Etiam velit tortor, venenatis a leo commodo, feugiat scelerisque erat. Curabitur sed dui ac urna congue vestibulum vitae ut enim. Quisque at tellus finibus orci pretium laoreet.', 'Quisque vulputate eros nisi, ut fermentum tellus lobortis eget', 'Etiam vel mi vitae magna congue malesuada.'
        ],

        # Users
        'users': [

        ],

        # Users
        'games': [
            'Tic-Tac-Toe', 'Guess the word', 'Whack-A-Mole', 'Pong', 'Othello'
        ],

        'game_ids': [

        ],
    }


    # ------------------ #
    # --- SEED USERS --- #
    # ------------------ #

    # Loop 25 times
    for i in range(125, 150):

        # Generate random description
        random_description = random_data['descriptions'][random.randint(0, len(random_data['descriptions'])-1)]

        # Create a random User
        user = User(
            username='test{0}'.format(i),
            picture_url='via.placeholder.com/100x100',
            description=random_description
        )
        # Use the hash_password() method on the User object (Model)
        user.hash_password('password{0}'.format(i))

        # Add the user to the database
        db.session.add(user)
        db.session.commit()

        # Add the user to the users list
        random_data['users'].append(user)


    # ------------------ #
    # --- SEED GAMES --- #
    # ------------------ #

    # Loop random_data['games'] size times
    for i in range(0, len(random_data['games'])):

        # Generate random description
        random_description = random_data['descriptions'][random.randint(0, len(random_data['descriptions'])-1)]

        # Create a random Game
        game = Game(
            name=random_data['games'][i],
            description=random_description
        )

        # Add the game to the database
        db.session.add(game)
        db.session.commit()

        # Add the user to the users list
        random_data['game_ids'].append(game.id)


    # ------------------------ #
    # --- SEED FRIENDSHIPS --- #
    # ------------------------ #

    # Loop 50 times
    for i in range(0, 50):

        # The same user can never befriend itself so if id1 and id2 are the same, keep looping
        same_id = True
        while same_id:
            # Generate random user id's
            random_user_id1 = random_data['users'][random.randint(0, len(random_data['users'])-1)].id
            random_user_id2 = random_data['users'][random.randint(0, len(random_data['users'])-1)].id

            # If the id's are different OR if the random_user_id1 is empty
            if random_user_id1 != random_user_id2 or random_user_id1 == None:
                same_id = False

        # Create a random Friendship
        friendship = Friendship(
            user_id_1=random_user_id1,
            user_id_2=random_user_id2
        )

        # Add the friendship to the database
        db.session.add(friendship)
        db.session.commit()



    # ------------------------- #
    # --- SEED ACHIEVEMENTS --- #
    # ------------------------- #

    for i in range (0, 50):

        # Generate a random game id & description
        random_description = random_data['descriptions'][random.randint(0, len(random_data['descriptions'])-1)]
        random_game_id = random_data['game_ids'][random.randint(0, len(random_data['game_ids'])-1)]

        # Create a random Achievement
        achievement = Achievement(
            name='Achievement {0}'.format(i),
            description=random_description,
            game_id=random_game_id
        )

        # Add the friendship to the database
        db.session.add(achievement)
        db.session.commit()



    print("Done seeding the database")
