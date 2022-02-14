from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Recipe, day_to_recipe, Tag, tag_to_recipe, Ingredient, ingredient_to_recipe, Measurement
from app.forms import RecipeSearchForm, RecipeCreateForm
from sqlalchemy import and_, or_, delete, func

recipe_routes = Blueprint('recipes', __name__)


#Create a new recipe by name only
@recipe_routes.route('', methods=['POST'])
@login_required
def create_new_recipe():
    form = RecipeCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_recipe = Recipe(
            name=form.data['newRecipeName'],
            author=form.data['userId']
        )
        db.session.add(new_recipe)
        db.session.commit()
    return new_recipe.to_dict()



# Search recipes
@recipe_routes.route('/search/<term>')
@login_required
def recipes_search(term):
    recipes = Recipe.query.join(tag_to_recipe).join(Tag).filter(
        or_(
            Recipe.name.ilike(f'%{term}%'),
            Tag.name.ilike(f'%{term}%')
            )
        ).all()
    return {'search_results': [recipe.to_dict() for recipe in recipes]}


# Add a recipe to a daily schedule from search
@recipe_routes.route('/day_recipes', methods=['POST'])
@login_required
def add_searched_recipe():
    dayId = request.json['dayId']
    recipeId = request.json['recipeId']

    db.session.execute(day_to_recipe.insert().values(day_id=dayId, recipe_id=recipeId))
    db.session.commit()
    return jsonify('added')


# Remove a recipe from a daily schedule
@recipe_routes.route('/day_recipes/<dayId>/<recipeId>', methods=['DELETE'])
@login_required
def remove_from_day(dayId, recipeId):
    remove_this = (
        delete(day_to_recipe).where(
            and_(
                day_to_recipe.c.day_id == dayId,
                day_to_recipe.c.recipe_id == recipeId
                )
        )
    )

    db.session.execute(remove_this)
    db.session.commit()
    return jsonify('removed')


# Get ingredients associated with only one recipe
@recipe_routes.route('/<int:recipe_id>/ingredients')
@login_required
def ingredients_for_recipe(recipe_id):
    ingredients = db.session.query(Ingredient.name, Ingredient.id, ingredient_to_recipe.c.amount, Measurement.name.label('measurement')).select_from(Ingredient).join(ingredient_to_recipe).join(Measurement).filter(ingredient_to_recipe.c.recipe_id == recipe_id).all()

    data = [dict(ingredient) for ingredient in ingredients]
    for query in data:
        query['amount'] = float(query['amount'])

    return {'ingredients': data}


# Get tags associated with a recipe
@recipe_routes.route('/<int:recipe_id>/tags')
@login_required
def get_tags_for_recipe(recipe_id):
    tags = Tag.query.join(tag_to_recipe).join(Recipe).filter(Recipe.id == recipe_id).all()
    return {'tags': [tag.to_dict() for tag in tags]}
