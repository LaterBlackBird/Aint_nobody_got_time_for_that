from flask.cli import AppGroup
from .users import seed_users, undo_users
from .meal_plans import seed_meal_plans, undo_meal_plans
from .days import seed_days, undo_days
from .measurements import seed_measurements, undo_measurements
from .ingredients import seed_ingredients, undo_ingredients
from .tags import seed_tags, undo_tags
from .recipes import seed_recipes, undo_recipes
from .day_to_recipes import seed_daily_recipes, undo_daily_recipes
from .tags_to_recipe import seed_receipe_tags, undo_receipe_tags
from .ingredients_to_recipe import seed_recipe_ingredients, undo_recipe_ingredients

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_meal_plans()
    seed_days()
    seed_measurements()
    seed_ingredients()
    seed_tags()
    seed_recipes()
    seed_daily_recipes()
    seed_receipe_tags()
    seed_recipe_ingredients()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_meal_plans()
    undo_days()
    undo_measurements()
    undo_ingredients()
    undo_tags()
    undo_recipes()
    undo_daily_recipes()
    undo_receipe_tags()
    undo_recipe_ingredients()
