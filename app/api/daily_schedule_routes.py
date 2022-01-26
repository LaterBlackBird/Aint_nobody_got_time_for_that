from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Day, Recipe, day_to_recipe
from app.forms import NewDayForm, EditDayForm

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



# update an existing daily schedule name
@day_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_daily_schedule(id):
    day = Day.query.get(id)
    form = EditDayForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        day.name = form.data['editedDayName'],
        db.session.commit()
    return day.to_dict()


# delete a daily schedule
@day_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_daily_schedule(id):
    day = Day.query.get(id)
    db.session.delete(day)
    db.session.commit()
    return jsonify(f"successfully deleted daily schedule{day.name}")


# Get recipes associated with only one daily schedule
@day_routes.route('/<int:daily_schedule_id>/recipes')
@login_required
def daily_schedules_by_meal_plan(daily_schedule_id):
    recipes = Recipe.query.join(day_to_recipe).join(Day).filter(day_to_recipe.c.day_id == daily_schedule_id).all()
    data = {'recipes': [recipe.to_dict() for recipe in recipes]}
    data['dayId']=daily_schedule_id
    return data
