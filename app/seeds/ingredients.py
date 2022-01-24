from app.models import db, Ingredient


# Adds a demo user, you can add other users here if you want
def seed_ingredients():
    ingredient_1 = Ingredient(
        name='Cheddar Cheese')
    ingredient_2 = Ingredient(
        name='Chicken')
    ingredient_3 = Ingredient(
        name="Dave's Killer Bread")
    ingredient_4 = Ingredient(
        name="Butter")
    ingredient_5 = Ingredient(
        name="Spinach")
    ingredient_6 = Ingredient(
        name="Oatmeal")
    ingredient_7 = Ingredient(
        name="Water")


    db.session.add(ingredient_1)
    db.session.add(ingredient_2)
    db.session.add(ingredient_3)
    db.session.add(ingredient_4)
    db.session.add(ingredient_5)
    db.session.add(ingredient_6)
    db.session.add(ingredient_7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
