from app.models import db, Tag


# Adds a demo user, you can add other users here if you want
def seed_tags():
    tag_1 = Tag(
        name='Breakfast')
    tag_2 = Tag(
        name='Lunch')
    tag_3 = Tag(
        name="Dinner")
    tag_4 = Tag(
        name="Snack")
    tag_5 = Tag(
        name="Mexican")
    tag_6 = Tag(
        name="Italian")
    tag_7 = Tag(
        name="Asian")


    db.session.add(tag_1)
    db.session.add(tag_2)
    db.session.add(tag_3)
    db.session.add(tag_4)
    db.session.add(tag_5)
    db.session.add(tag_6)
    db.session.add(tag_7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
