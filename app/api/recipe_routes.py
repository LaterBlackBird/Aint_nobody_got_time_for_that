from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Recipe, day_to_recipe, Tag, tag_to_recipe, Ingredient, ingredient_to_recipe
from app.forms import RecipeSearchForm
from sqlalchemy import and_, or_, delete

recipe_routes = Blueprint('recipes', __name__)


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


# Add a recipe from search
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
    ingredients = Ingredient.query.join(ingredient_to_recipe).join(Recipe).filter(ingredient_to_recipe.c.recipe_id == recipe_id).all()
    return {'ingredients': [ingredient.to_dict() for ingredient in ingredients]}
