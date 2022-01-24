from app.models import db, tag_to_recipe


# Adds a demo user, you can add other users here if you want
def seed_receipe_tags():
    recipe_tag_1 = tag_to_recipe(
        recipe_id=1, tag_id=2)
    recipe_tag_2 = tag_to_recipe(
        recipe_id=1, tag_id=3)


    db.session.add(recipe_tag_1)
    db.session.add(recipe_tag_2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_receipe_tags():
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.commit()
