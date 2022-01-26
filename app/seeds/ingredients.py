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
    ingredient_8 = Ingredient(
        name="Spanish Style Rice")
    ingredient_9 = Ingredient(
        name="Poblano Peppers")
    ingredient_10 = Ingredient(
        name="Ground Beef")
    ingredient_11 = Ingredient(
        name="Black Pepper")
    ingredient_12 = Ingredient(
        name="Chili Powder")
    ingredient_13 = Ingredient(
        name="Ground Cumin")
    ingredient_14 = Ingredient(
        name="Onion Powder")
    ingredient_15 = Ingredient(
        name="Garlic Powder")
    ingredient_16 = Ingredient(
        name="Cayenne Pepper")
    ingredient_17 = Ingredient(
        name="Condensed Tomato Soup")
    ingredient_18 = Ingredient(
        name="Mozzarella Cheese")
    ingredient_19 = Ingredient(
        name="Ground Beef")
    ingredient_20 = Ingredient(
        name="Black Pepper")
    ingredient_21 = Ingredient(
        name="Chili Powder")
    ingredient_22 = Ingredient(
        name="Ground Cumin")
    ingredient_23 = Ingredient(
        name="Onion Powder")
    ingredient_24 = Ingredient(
        name="Garlic Powder")
    ingredient_25 = Ingredient(
        name="Cayenne Pepper")


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
