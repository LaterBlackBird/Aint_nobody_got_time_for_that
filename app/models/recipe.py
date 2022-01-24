from .db import db
from .day_to_recipe import day_to_recipe
from .tag_to_recipe import tag_to_recipe
from .ingredient_to_recipe import ingredient_to_recipe


class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    source = db.Column(db.String, nullable=True)
    picture = db.Column(db.String, nullable=True)
    servings = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='recipes')
    recipe_day = db.relationship('Day', secondary=day_to_recipe, back_populates='day_recipe')
    recipe_tag = db.relationship('Tag', secondary=tag_to_recipe, back_populates='tag_recipe')
    recipe_ingredient = db.relationship('Ingredient', secondary=ingredient_to_recipe, back_populates='ingredient_recipe')
    recipe_measurement = db.relationship('Measurement', secondary=ingredient_to_recipe, back_populates='measurement_recipe')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'author': self.author,
            'instructions': self.instructions,
            'source': self.source,
            'picture': self.picture,
            'servings': self.servings,
        }
