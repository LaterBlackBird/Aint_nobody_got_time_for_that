"""empty message

Revision ID: 9fc778f28fdc
Revises: c126b1513463
Create Date: 2022-01-29 19:05:06.158498

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fc778f28fdc'
down_revision = 'c126b1513463'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('recipes', 'instructions',
               existing_type=sa.TEXT(),
               nullable=True)
    op.alter_column('recipes', 'servings',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('recipes', 'servings',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('recipes', 'instructions',
               existing_type=sa.TEXT(),
               nullable=False)
    # ### end Alembic commands ###
