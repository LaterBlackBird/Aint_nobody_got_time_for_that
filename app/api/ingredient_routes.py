from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Ingredient, ingredient_to_recipe, Measurement
from sqlalchemy import and_, or_, delete, func

ingredient_routes = Blueprint('ingredients', __name__)


# Search recipes
@ingredient_routes.route('/<term>')
@login_required
def ingredient_search(term):
    recipes = Ingredient.query.filter(Ingredient.name.ilike(f'%{term}%')).all()
    return {"searchResults":[recipe.to_dict() for recipe in recipes]}
