from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Measurement

measurement_routes = Blueprint('measurements', __name__)


# Search recipes
@measurement_routes.route('')
@login_required
def measurement_search():
    measurements = Measurement.query.all()
    return {"measurements":[measurement.to_dict() for measurement in measurements]}
