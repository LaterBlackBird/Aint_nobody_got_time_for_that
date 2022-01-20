from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Meal_Plan

user_routes = Blueprint('users', __name__)

# Get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# Get information for one user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Get meal plans associated with only one user
@user_routes.route('/<int:userId>/meal_plans')
@login_required
def meal_plans_by_user(userId):
    meal_plans = Meal_Plan.query.filter(Meal_Plan.user_id == userId).all()
    return {'meal_plans': [meal_plan.to_dict() for meal_plan in meal_plans]}
