from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Day


class NewDayForm(FlaskForm):
    newDayName = StringField('newDayName', validators=[DataRequired()])
    mealId = IntegerField('planId')
