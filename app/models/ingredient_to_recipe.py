from .db import db


ingredient_to_recipe = db.Table(
    'ingredient_to_recipe',
    db.Column('recipe_id',
            db.Integer,
            db.ForeignKey('recipes.id'),
            primary_key=True),
    db.Column('ingredient_id',
            db.Integer,
            db.ForeignKey('ingredients.id'),
            primary_key=True),
    db.Column('amount',
            db.Float(asdecimal=True),
            ),
    db.Column('measurement_id',
            db.Integer,
            db.ForeignKey('measurements.id'),
            primary_key=True),
)
