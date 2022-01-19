from app.models import db, Meal_Plan


# Adds a demo user, you can add other users here if you want
def seed_meal_plans():
    meal_plan_1 = Meal_Plan(
        name='Bulk', user_id=1)
    meal_plan_2 = Meal_Plan(
        name='Cut', user_id=1)
    meal_plan_3 = Meal_Plan(
        name="Don't Show", user_id=2)

    db.session.add(meal_plan_1)
    db.session.add(meal_plan_2)
    db.session.add(meal_plan_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_meal_plans():
    db.session.execute('TRUNCATE meal_plans RESTART IDENTITY CASCADE;')
    db.session.commit()
