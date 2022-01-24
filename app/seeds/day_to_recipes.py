from app.models import db, day_to_recipe


# Adds a demo user, you can add other users here if you want
def seed_daily_recipes():
    daily_recipe_1 = day_to_recipe(
        day_id=1, recipe_id=1)

    db.session.add(daily_recipe_1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_daily_recipes():
    db.session.execute('TRUNCATE day_to_recipe RESTART IDENTITY CASCADE;')
    db.session.commit()
