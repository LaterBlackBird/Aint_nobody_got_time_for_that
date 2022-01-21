from app.models import db, Day


# Adds a demo user, you can add other users here if you want
def seed_days():
    daily_schedule_1 = Day(
        name='Monday', meal_plan_id=1)
    daily_schedule_2 = Day(
        name='Tuesday', meal_plan_id=1)
    daily_schedule_3 = Day(
        name="Don't Show", meal_plan_id=2)

    db.session.add(daily_schedule_1)
    db.session.add(daily_schedule_2)
    db.session.add(daily_schedule_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_days():
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.commit()
