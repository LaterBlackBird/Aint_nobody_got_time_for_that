from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Recipe


class RecipeEditForm(FlaskForm):
    newRecipeName = StringField('newRecipeName', validators=[DataRequired()])
