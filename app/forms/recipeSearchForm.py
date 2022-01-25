from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Recipe


class RecipeSearchForm(FlaskForm):
    searchRecipes = StringField('searchRecipes')
