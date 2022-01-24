from .db import db
from .ingredient_to_recipe import ingredient_to_recipe


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    ingredient_recipe = db.relationship('Recipe', secondary=ingredient_to_recipe, back_populates='recipe_ingredient')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
