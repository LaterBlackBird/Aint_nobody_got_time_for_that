from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

meal_routes = Blueprint('meal_plans', __name__)

@meal_routes.route('/')
@login_required
def get_meal_plans():
    meal_plans = Meal_Plan.query.filter(Meal_Plan.user_id == userId).all()
    return {'meal_plans': [user.to_dict() for user in users]}


@meal_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
