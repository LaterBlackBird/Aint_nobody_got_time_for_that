"""empty message

Revision ID: bf000ec69c16
Revises: d71c1a5eaaf3
Create Date: 2022-01-24 11:03:01.570691

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf000ec69c16'
down_revision = 'd71c1a5eaaf3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ingredients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('measurements',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('author', sa.Integer(), nullable=False),
    sa.Column('instructions', sa.Text(), nullable=False),
    sa.Column('source', sa.String(), nullable=True),
    sa.Column('picture', sa.String(), nullable=True),
    sa.Column('servings', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['author'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ingredient_to_recipe',
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('ingredient_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(asdecimal=True), nullable=True),
    sa.Column('measurement_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredients.id'], ),
    sa.ForeignKeyConstraint(['measurement_id'], ['measurements.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('recipe_id', 'ingredient_id', 'measurement_id')
    )
    op.create_table('tag_to_recipe',
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('recipe_id', 'tag_id')
    )
    op.create_table('day_to_recipe',
    sa.Column('day_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['day_id'], ['days.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('day_id', 'recipe_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('day_to_recipe')
    op.drop_table('tag_to_recipe')
    op.drop_table('ingredient_to_recipe')
    op.drop_table('recipes')
    op.drop_table('tags')
    op.drop_table('measurements')
    op.drop_table('ingredients')
    # ### end Alembic commands ###
