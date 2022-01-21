from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Meal_Plan, db, Day
from app.forms import NewMealPlanForm, EditMealPlanForm

meal_routes = Blueprint('meal_plans', __name__)

# create a new meal plan
@meal_routes.route('', methods = ['POST'])
@login_required
def add_meal_plan():
    form = NewMealPlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_meal_plan = Meal_Plan(
            name=form.data['newPlanName'],
            user_id=form.data['userId']
        )
        db.session.add(new_meal_plan)
        db.session.commit()
    return new_meal_plan.to_dict()


# update an existing meal plan name
@meal_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_meal_plan(id):
    plan = Meal_Plan.query.get(id)
    form = EditMealPlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        plan.name = form.data['editedPlanName'],
        db.session.commit()

    return plan.to_dict()


# delete a meal plan
@meal_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_meal_plan(id):
    plan = Meal_Plan.query.get(id)
    db.session.delete(plan)
    db.session.commit()
    return jsonify(f"successfully deleted meal plan {plan.name}")


# Get daily schedules associated with only one meal plan
@meal_routes.route('/<int:meal_plan_id>/daily_schedules')
@login_required
def daily_schedules_by_meal_plan(meal_plan_id):
    daily_schedules = Day.query.filter(Day.meal_plan_id == meal_plan_id).all()
    return {'daily_schedules': [daily_schedule.to_dict() for daily_schedule in daily_schedules]}
