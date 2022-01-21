from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Meal_Plan


class EditMealPlanForm(FlaskForm):
    editedPlanName = StringField('editedPlanName', validators=[DataRequired()])
