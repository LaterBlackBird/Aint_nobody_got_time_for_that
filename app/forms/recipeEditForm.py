from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FloatField
from wtforms.validators import DataRequired
from app.models import Recipe


class RecipeEditForm(FlaskForm):
    newRecipeName = StringField('newRecipeName')
    recipeInstructions = TextAreaField('recipeInstructions')
    recipePhotoURL = StringField('recipePhotoURL')
    recipeSourceURL = StringField('recipeSourceURL')
    recipeServingSize = FloatField('recipeServingSize')
