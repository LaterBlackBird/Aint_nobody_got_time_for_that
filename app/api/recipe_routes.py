from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Recipe
from app.forms import RecipeSearchForm

recipe_routes = Blueprint('recipes', __name__)


# Search recipes
@recipe_routes.route('/search/<term>')
@login_required
def recipes_search(term):
    recipes = Recipe.query.filter(Recipe.name.ilike(f'%{term}%')).all()
    return {'search_results': [recipe.to_dict() for recipe in recipes]}
