from .db import db
from .day_to_recipe import day_to_recipe


class Day(db.Model):
    __tablename__ = 'days'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    meal_plan_id = db.Column(db.Integer, db.ForeignKey('meal_plans.id'), nullable=False)

    meal_plan = db.relationship('Meal_Plan', back_populates='daily_schedule')
    day_recipe = db.relationship('Recipe', secondary=day_to_recipe, back_populates='recipe_day')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'meal_plan_id': self.meal_plan_id
        }
