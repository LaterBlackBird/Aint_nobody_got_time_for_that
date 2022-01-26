from app.models import db, tag_to_recipe


# Adds a demo user, you can add other users here if you want
def seed_receipe_tags():
    recipe_tag_1 = tag_to_recipe.insert().values(
        recipe_id=1, tag_id=2)
    recipe_tag_2 = tag_to_recipe.insert().values(
        recipe_id=1, tag_id=3)
    recipe_tag_3 = tag_to_recipe.insert().values(
        recipe_id=2, tag_id=3)
    recipe_tag_4 = tag_to_recipe.insert().values(
        recipe_id=2, tag_id=6)
    recipe_tag_5 = tag_to_recipe.insert().values(
        recipe_id=3, tag_id=1)
    recipe_tag_6 = tag_to_recipe.insert().values(
        recipe_id=4, tag_id=1)
    recipe_tag_7 = tag_to_recipe.insert().values(
        recipe_id=5, tag_id=2)
    recipe_tag_8 = tag_to_recipe.insert().values(
        recipe_id=5, tag_id=3)
    recipe_tag_9 = tag_to_recipe.insert().values(
        recipe_id=5, tag_id=7)



    db.session.execute(recipe_tag_1)
    db.session.execute(recipe_tag_2)
    db.session.execute(recipe_tag_3)
    db.session.execute(recipe_tag_4)
    db.session.execute(recipe_tag_5)
    db.session.execute(recipe_tag_6)
    db.session.execute(recipe_tag_7)
    db.session.execute(recipe_tag_8)
    db.session.execute(recipe_tag_9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_receipe_tags():
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.commit()
