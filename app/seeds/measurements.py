from app.models import db, Measurement


# Adds a demo user, you can add other users here if you want
def seed_measurements():
    measurement_1 = Measurement(
        name='pinch (p)')
    measurement_2 = Measurement(
        name='teaspoons (tsp)')
    measurement_3 = Measurement(
        name='tablespoons (Tbsp)')
    measurement_4 = Measurement(
        name="cups (C)")
    measurement_5 = Measurement(
        name="ounces (oz)")
    measurement_6 = Measurement(
        name="grams (g)")
    measurement_7 = Measurement(
        name="pounds (lbs)")
    measurement_8 = Measurement(
        name="milliliters (ml)")
    measurement_9 = Measurement(
        name="liters (L)")
    measurement_10 = Measurement(
        name="pints (pt)")
    measurement_11 = Measurement(
        name="quarts (qt)")
    measurement_12 = Measurement(
        name="gallons (gal)")
    measurement_13 = Measurement(
        name="fluid ounces (fl oz)")
    measurement_14 = Measurement(
        name="slices")
    measurement_15 = Measurement(
        name="cans")
    measurement_16 = Measurement(
        name="large")
    measurement_17 = Measurement(
        name="package")
    measurement_18 = Measurement(
        name="count")

    db.session.add(measurement_1)
    db.session.add(measurement_2)
    db.session.add(measurement_3)
    db.session.add(measurement_4)
    db.session.add(measurement_5)
    db.session.add(measurement_6)
    db.session.add(measurement_7)
    db.session.add(measurement_8)
    db.session.add(measurement_9)
    db.session.add(measurement_10)
    db.session.add(measurement_11)
    db.session.add(measurement_12)
    db.session.add(measurement_13)
    db.session.add(measurement_14)
    db.session.add(measurement_15)
    db.session.add(measurement_16)
    db.session.add(measurement_17)
    db.session.add(measurement_18)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_measurements():
    db.session.execute('TRUNCATE measurements RESTART IDENTITY CASCADE;')
    db.session.commit()
