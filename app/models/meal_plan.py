from .db import db


class Meal_Plan(db.Model):
    __tablename__ = 'meal_plans'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='meal_plans')
    daily_schedule = db.relationship('Day', back_populates='meal_plan', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id
        }
