from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Day


class EditDayForm(FlaskForm):
    editedDayName = StringField('editedDayName', validators=[DataRequired()])
