from app.models import db, Recipe


# Adds a demo user, you can add other users here if you want
def seed_recipes():
    recipe_1 = Day(
        name='Grilled Cheese',
        author=1,
        instructions='Spread 1/2 tablespoon of butter on one side of each piece of bread. Lie the slices of Cheddar on one of the slices of bread on the unbuttered side. Sprinkle the parsley, basil, oregano, rosemary, and dill on the other slice of bread on its unbuttered side. Sandwich the two slices of bread together with the buttered sides facing outwards.  Heat a skillet over medium heat. When skillet is hot, gently lie the sandwich in the skillet; cook on each side for 3 minutes until cheese has melted.',
        source='https://www.allrecipes.com/recipe/145967/quick-and-easy-grilled-cheese/',
        picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9416780.jpg&q=85',
        servings=1)


    db.session.add(recipe_1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipes():
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.commit()
