from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Meal_Plan, db
from app.forms import NewMealPlanForm

meal_routes = Blueprint('meal_plans', __name__)

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


@meal_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
