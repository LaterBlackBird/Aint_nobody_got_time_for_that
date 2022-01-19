from flask.cli import AppGroup
from .users import seed_users, undo_users
from .meal_plans import seed_meal_plans, undo_meal_plans

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_meal_plans()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_meal_plans()
