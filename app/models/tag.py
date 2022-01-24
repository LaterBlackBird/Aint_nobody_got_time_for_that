from .db import db
from .tag_to_recipe import tag_to_recipe


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    tag_recipe = db.relationship('Recipe', secondary=tag_to_recipe, back_populates='recipe_tag')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
