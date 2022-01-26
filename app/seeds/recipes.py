from app.models import db, Recipe


# Adds a demo user, you can add other users here if you want
def seed_recipes():
    recipe_1 = Recipe(
        name='Grilled Cheese',
        author=1,
        instructions='Spread 1/2 tablespoon of butter on one side of each piece of bread. Lie the slices of Cheddar on one of the slices of bread on the unbuttered side. Sprinkle the parsley, basil, oregano, rosemary, and dill on the other slice of bread on its unbuttered side. Sandwich the two slices of bread together with the buttered sides facing outwards.  Heat a skillet over medium heat. When skillet is hot, gently lie the sandwich in the skillet; cook on each side for 3 minutes until cheese has melted.',
        source='https://www.allrecipes.com/recipe/145967/quick-and-easy-grilled-cheese/',
        picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9416780.jpg&q=85',
        servings=1)

    recipe_2 = Recipe(
        name='Taco Stuffed Poblano Peppers',
        author=1,
        instructions='''Bring 2 cups water and butter to a boil in a saucepan; add rice and seasoning packet. Return to a boil, cover saucepan, reduce heat to low, and simmer until most water is absorbed, 20 to 25 minutes. Fluff rice using a fork.

                        Spray a 9x13-inch baking dish with cooking spray.

                        Bring a pot of water to a boil; cook poblano peppers until slightly tender, about 5 minutes. Transfer peppers to a bowl of ice water to stop the cooking process; drain. Pat peppers dry and place in the prepared baking dish.

                        Heat a large skillet over medium-high heat. Cook and stir beef in the hot skillet until browned and crumbly, 5 to 7 minutes; drain and discard grease. Season beef with black pepper. Mix 1/2 cup water, chili powder, cumin, onion powder, garlic powder, and cayenne pepper into ground beef; cook and stir until liquid evaporates, 2 to 3 minutes.

                        Preheat oven to 350 degrees F (175 degrees C).

                        Mix rice into beef mixture; cook and stir until evenly mixed and all liquid is evaporated, 5 to 10 minutes. Spoon mixture into the peppers.

                        Stir tomato soup and about 1 tablespoon water together in a bowl until soup is thinned to a gravy consistency, adding more water if needed. Pour tomato gravy over stuffed peppers; top with mozzarella cheese. Cover baking dish with aluminum foil.

                        Bake in the preheated oven for 20 minutes. Remove aluminum foil and continue baking until cheese is slightly browned, 10 to 15 minutes more.''',
        source='https://www.allrecipes.com/recipe/244863/taco-stuffed-poblano-peppers/',
        picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3206849.jpg&w=596&h=596&c=sc&poi=face&q=85',
        servings=6)

    recipe_3 = Recipe(
        name='Cinnamon Rolls',
        author=1,
        instructions='''Preheat the oven to 350 degrees F (175 degrees C). Butter the bottom of an 8-inch round or square baking pan and sprinkle with 2 tablespoons brown sugar.

                        Combine white sugar, cinnamon, 2 tablespoons brown sugar, and vanilla extract in a bowl. Mix filling well.

                        Combine confectioners' sugar and milk for glaze in another bowl until well mixed.

                        Separate biscuits and roll or punch down each one until flat. Coat with melted butter and sprinkle each with filling mixture to coat. Roll up each piece of dough and cut in 1/2, placing each cut-side down into the prepared pan, yielding 20 pieces.

                        Bake in the preheated oven until biscuit portion on top of rolls begins to brown, about 15 minutes. Remove from the oven and glaze.''',
        source='https://www.allrecipes.com/recipe/275745/biscuit-cinnamon-rolls/',
        picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7058306.jpg&w=596&h=596&c=sc&poi=face&q=85',
        servings=3)

    recipe_4 = Recipe(
        name='Egg and Ham Scramble',
        author=1,
        instructions='''Beat eggs, milk, seasoned salt, salt, and black pepper together in a bowl.

                        Heat olive oil in a large non-stick skillet over medium-high heat; saute jalapeno in hot oil until slightly softened, 2 to 3 minutes. Add ham to jalapeno and cook until heated through, about 1 minute.

                        Pour egg mixture into ham mixture. Cook and stir until eggs are set but not dry, 3 to 5 minutes. Sprinkle 1/2 of the Cheddar cheese over eggs; cook and stir until cheese is melted. Transfer eggs to a plate and sprinkle remaining cheese over the top.''',
        source='https://www.allrecipes.com/recipe/240125/sharons-egg-and-ham-scramble/',
        picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1674368.jpg&w=596&h=596&c=sc&poi=face&q=85',
        servings=1)

    recipe_5 = Recipe(
        name='Asian Grilled Chicken',
        author=1,
        instructions='''Place the soy sauce, brown sugar, lime juice, orange juice, sweet chili sauce, chili-garlic sauce, garlic, and curry powder in a large plastic zipper bag. Seal and knead the bag with your fingers to mix all the ingredients and dissolve the sugar. Place the chicken thighs into the marinade, squeeze out the air from the bag, zip the bag closed, and refrigerate for 4 hours or overnight.

                        Preheat an outdoor grill for medium-low heat; lightly oil the grate.

                        Remove the chicken from the bag, pour the excess marinade into a small saucepan, and bring to a full boil for about 1 minute to sterilize the marinade.

                        Grill the chicken thighs until they are no longer pink in the middle and show grill marks, about 25 minutes, basting them generously with the sterilized marinade as they grill.''',
        source='https://www.allrecipes.com/recipe/211190/asian-grilled-chicken/',
        picture='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F782626.jpg',
        servings=1)

    db.session.add(recipe_1)
    db.session.add(recipe_2)
    db.session.add(recipe_3)
    db.session.add(recipe_4)
    db.session.add(recipe_5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipes():
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.commit()
