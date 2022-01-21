from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Day
from app.forms import NewDayForm

day_routes = Blueprint('daily_schedules', __name__)

# create a new meal plan
@day_routes.route('', methods = ['POST'])
@login_required
def add_day_plan():
    form = NewDayForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_day = Day(
            name=form.data['newDayName'],
            meal_plan_id=form.data['planId']
        )
        db.session.add(new_day)
        db.session.commit()
    return new_day.to_dict()
