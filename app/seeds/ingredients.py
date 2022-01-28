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
        name="White Sugar")
    ingredient_20 = Ingredient(
        name="Ground Cinnamon")
    ingredient_21 = Ingredient(
        name="Brown Sugar")
    ingredient_22 = Ingredient(
        name="Vanilla Extract")
    ingredient_23 = Ingredient(
        name=" Confectioners' Sugar")
    ingredient_24 = Ingredient(
        name="Milk")
    ingredient_25 = Ingredient(
        name="Egg")
    ingredient_26 = Ingredient(
        name="Olive Oil")
    ingredient_27 = Ingredient(
        name=" Jalapeno Pepper")
    ingredient_28 = Ingredient(
        name="Applewood-Smoked Ham")
    ingredient_29 = Ingredient(
        name="Soy Sauce")
    ingredient_30 = Ingredient(
        name="Lime Juice")
    ingredient_31 = Ingredient(
        name="Orange Juice")
    ingredient_32 = Ingredient(
        name="Thai-Style Sweet Chili Sauce")
    ingredient_33 = Ingredient(
        name="Chile-Garlic Sauce (ex Sriracha)")
    ingredient_34 = Ingredient(
        name="Cloves Garlic")
    ingredient_35 = Ingredient(
        name="Curry Powder")
    ingredient_36 = Ingredient(
        name="Boneless Chicken Thighs")


    db.session.add(ingredient_1)
    db.session.add(ingredient_2)
    db.session.add(ingredient_3)
    db.session.add(ingredient_4)
    db.session.add(ingredient_5)
    db.session.add(ingredient_6)
    db.session.add(ingredient_7)
    db.session.add(ingredient_8)
    db.session.add(ingredient_9)
    db.session.add(ingredient_10)
    db.session.add(ingredient_11)
    db.session.add(ingredient_12)
    db.session.add(ingredient_13)
    db.session.add(ingredient_14)
    db.session.add(ingredient_15)
    db.session.add(ingredient_16)
    db.session.add(ingredient_17)
    db.session.add(ingredient_18)
    db.session.add(ingredient_19)
    db.session.add(ingredient_20)
    db.session.add(ingredient_21)
    db.session.add(ingredient_22)
    db.session.add(ingredient_23)
    db.session.add(ingredient_24)
    db.session.add(ingredient_25)
    db.session.add(ingredient_26)
    db.session.add(ingredient_27)
    db.session.add(ingredient_28)
    db.session.add(ingredient_29)
    db.session.add(ingredient_30)
    db.session.add(ingredient_31)
    db.session.add(ingredient_32)
    db.session.add(ingredient_33)
    db.session.add(ingredient_34)
    db.session.add(ingredient_35)
    db.session.add(ingredient_36)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
