from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Recipe, day_to_recipe
from app.forms import RecipeSearchForm

recipe_routes = Blueprint('recipes', __name__)


# Search recipes
@recipe_routes.route('/search/<term>')
@login_required
def recipes_search(term):
    recipes = Recipe.query.filter(Recipe.name.ilike(f'%{term}%')).all()
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
