from app.models import db, ingredient_to_recipe


# Adds a demo user, you can add other users here if you want
def seed_recipe_ingredients():
    recipe_ingredient_1 = ingredient_to_recipe(
        recipe_id=1,
        ingredient_id=1,
        amount=2,
        measurement_id=14)
    recipe_ingredient_2 = ingredient_to_recipe(
        recipe_id=1,
        ingredient_id=3,
        amount=2,
        measurement_id=14)
    recipe_ingredient_3 = ingredient_to_recipe(
        recipe_id=1,
        ingredient_id=4,
        amount=2,
        measurement_id=2)

    db.session.add(recipe_ingredient_1)
    db.session.add(recipe_ingredient_2)
    db.session.add(recipe_ingredient_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipe_ingredients():
    db.session.execute('TRUNCATE ingredient_to_recipe RESTART IDENTITY CASCADE;')
    db.session.commit()
