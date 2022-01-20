from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Meal_Plan


class NewMealPlanForm(FlaskForm):
    newPlanName = StringField('newPlanName', validators=[DataRequired()])
    userId = IntegerField('userId')
