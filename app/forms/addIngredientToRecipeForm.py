from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from app.models import ingredient_to_recipe


class AddIngToRecipeForm(FlaskForm):
    recipe_id = IntegerField('recipe_id')
    ingredient_id = IntegerField('ingredient_id')
    amount = FloatField('ingAmount')
    measurement_id = IntegerField('ingMeasurement')
