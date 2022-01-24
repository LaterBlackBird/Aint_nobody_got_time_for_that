from .db import db


day_to_recipe = db.Table(
    'day_to_recipe',
    db.Column('day_id',
            db.Integer,
            db.ForeignKey('days.id'),
            primary_key=True),
    db.Column('recipe_id',
            db.Integer,
            db.ForeignKey('recipes.id'),
            primary_key=True),
)
