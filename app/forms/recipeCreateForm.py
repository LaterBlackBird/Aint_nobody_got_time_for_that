from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from app.models import Recipe


class RecipeCreateForm(FlaskForm):
    newRecipeName = StringField('newRecipeName')
    userId = IntegerField('userId')
    recipePhotoURL = StringField('recipePhotoURL')
