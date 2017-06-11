from main import app

## In this file, you can add new commands for the CLI
## Run flask --help to see which commands you can use

@app.cli.command()
def seed():
    """Seeds the database with dummy data"""
    print("Seeding the database")

    # @TODO
    # db.session.add() and db.session.commit here

    print("Done seeding the database")
