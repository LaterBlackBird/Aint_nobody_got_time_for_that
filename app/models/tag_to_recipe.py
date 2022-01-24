from .db import db


tag_to_recipe = db.Table(
    'tag_to_recipe',
    db.Column('recipe_id',
            db.Integer,
            db.ForeignKey('recipes.id'),
            primary_key=True),
    db.Column('tag_id',
            db.Integer,
            db.ForeignKey('tags.id'),
            primary_key=True),
)
