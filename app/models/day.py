from .db import db


class Day(db.Model):
    __tablename__ = 'days'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    meal_plan_id = db.Column(db.Integer, db.ForeignKey('meal_plans.id'), nullable=False)

    meal_plan = db.relationship('Meal_Plan', back_populates='daily_schedule')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'meal_plan_id': self.meal_plan_id
        }
