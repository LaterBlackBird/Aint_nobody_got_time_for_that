from app.models import db, ingredient_to_recipe


# Adds a demo user, you can add other users here if you want
def seed_recipe_ingredients():
    recipe_ingredient_1 = ingredient_to_recipe.insert().values(
        recipe_id=1,
        ingredient_id=1,
        amount=2,
        measurement_id=14)
    recipe_ingredient_2 = ingredient_to_recipe.insert().values(
        recipe_id=1,
        ingredient_id=3,
        amount=2,
        measurement_id=14)
    recipe_ingredient_3 = ingredient_to_recipe.insert().values(
        recipe_id=1,
        ingredient_id=4,
        amount=2,
        measurement_id=2)

    recipe_ingredient_4 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=7,
        amount=2,
        measurement_id=4)
    recipe_ingredient_5 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=4,
        amount=2,
        measurement_id=3)
    recipe_ingredient_6 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=8,
        amount=6.8,
        measurement_id=5)
    recipe_ingredient_7 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=9,
        amount=3,
        measurement_id=16)
    recipe_ingredient_8 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=11,
        amount=1,
        measurement_id=7)
    recipe_ingredient_9 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=12,
        amount=1,
        measurement_id=3)
    recipe_ingredient_10 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=13,
        amount=2,
        measurement_id=2)
    recipe_ingredient_11 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=14,
        amount=2,
        measurement_id=2)
    recipe_ingredient_12 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=15,
        amount=2,
        measurement_id=2)
    recipe_ingredient_13 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=16,
        amount=0.5,
        measurement_id=2)
    recipe_ingredient_14 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=17,
        amount=2,
        measurement_id=2)
    recipe_ingredient_15 = ingredient_to_recipe.insert().values(
        recipe_id=2,
        ingredient_id=18,
        amount=0.5,
        measurement_id=4)
    recipe_ingredient_16 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=19,
        amount=0.5,
        measurement_id=4)
    recipe_ingredient_17 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=20,
        amount=2,
        measurement_id=3)
    recipe_ingredient_18 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=21,
        amount=2,
        measurement_id=3)
    recipe_ingredient_19 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=22,
        amount=1,
        measurement_id=3)
    recipe_ingredient_20 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=23,
        amount=0.5,
        measurement_id=4)
    recipe_ingredient_21 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=24,
        amount=2,
        measurement_id=2)
    recipe_ingredient_22 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=25,
        amount=1,
        measurement_id=17)
    recipe_ingredient_23 = ingredient_to_recipe.insert().values(
        recipe_id=3,
        ingredient_id=4,
        amount=0.25,
        measurement_id=4)
    recipe_ingredient_24 = ingredient_to_recipe.insert().values(
        recipe_id=4,
        ingredient_id=25,
        amount=8,
        measurement_id=18)
    recipe_ingredient_25 = ingredient_to_recipe.insert().values(
        recipe_id=4,
        ingredient_id=24,
        amount=3,
        measurement_id=3)
    recipe_ingredient_26 = ingredient_to_recipe.insert().values(
        recipe_id=4,
        ingredient_id=26,
        amount=0.25,
        measurement_id=4)
    recipe_ingredient_27 = ingredient_to_recipe.insert().values(
        recipe_id=4,
        ingredient_id=27,
        amount=1,
        measurement_id=18)
    recipe_ingredient_28 = ingredient_to_recipe.insert().values(
        recipe_id=4,
        ingredient_id=28,
        amount=0.5,
        measurement_id=4)
    recipe_ingredient_29 = ingredient_to_recipe.insert().values(
        recipe_id=4,
        ingredient_id=1,
        amount=1,
        measurement_id=4)
    recipe_ingredient_30 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=29,
        amount=.13,
        measurement_id=4)
    recipe_ingredient_31 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=21,
        amount=.13,
        measurement_id=4)
    recipe_ingredient_32 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=30,
        amount=2,
        measurement_id=3)
    recipe_ingredient_33 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=31,
        amount=2,
        measurement_id=3)
    recipe_ingredient_34 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=32,
        amount=1,
        measurement_id=3)
    recipe_ingredient_35 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=33,
        amount=1,
        measurement_id=2)
    recipe_ingredient_36 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=34,
        amount=3,
        measurement_id=18)
    recipe_ingredient_37 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=35,
        amount=.25,
        measurement_id=2)
    recipe_ingredient_38 = ingredient_to_recipe.insert().values(
        recipe_id=5,
        ingredient_id=36,
        amount=4,
        measurement_id=18)


    db.session.execute(recipe_ingredient_1)
    db.session.execute(recipe_ingredient_2)
    db.session.execute(recipe_ingredient_3)
    db.session.execute(recipe_ingredient_4)
    db.session.execute(recipe_ingredient_5)
    db.session.execute(recipe_ingredient_6)
    db.session.execute(recipe_ingredient_7)
    db.session.execute(recipe_ingredient_8)
    db.session.execute(recipe_ingredient_9)
    db.session.execute(recipe_ingredient_10)
    db.session.execute(recipe_ingredient_11)
    db.session.execute(recipe_ingredient_12)
    db.session.execute(recipe_ingredient_13)
    db.session.execute(recipe_ingredient_14)
    db.session.execute(recipe_ingredient_15)
    db.session.execute(recipe_ingredient_16)
    db.session.execute(recipe_ingredient_17)
    db.session.execute(recipe_ingredient_18)
    db.session.execute(recipe_ingredient_19)
    db.session.execute(recipe_ingredient_20)
    db.session.execute(recipe_ingredient_21)
    db.session.execute(recipe_ingredient_22)
    db.session.execute(recipe_ingredient_23)
    db.session.execute(recipe_ingredient_24)
    db.session.execute(recipe_ingredient_25)
    db.session.execute(recipe_ingredient_26)
    db.session.execute(recipe_ingredient_27)
    db.session.execute(recipe_ingredient_28)
    db.session.execute(recipe_ingredient_29)
    db.session.execute(recipe_ingredient_30)
    db.session.execute(recipe_ingredient_31)
    db.session.execute(recipe_ingredient_32)
    db.session.execute(recipe_ingredient_33)
    db.session.execute(recipe_ingredient_34)
    db.session.execute(recipe_ingredient_35)
    db.session.execute(recipe_ingredient_36)
    db.session.execute(recipe_ingredient_37)
    db.session.execute(recipe_ingredient_38)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipe_ingredients():
    db.session.execute('TRUNCATE ingredient_to_recipe RESTART IDENTITY CASCADE;')
    db.session.commit()
