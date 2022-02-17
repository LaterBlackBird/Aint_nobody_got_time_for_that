from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import  db, Tag

tag_routes = Blueprint('tags', __name__)


# Send all tag names
@tag_routes.route('')
@login_required
def send_all_tags():
    tags = Tag.query.all()
    return {"tags":[tag.to_dict() for tag in tags]}
