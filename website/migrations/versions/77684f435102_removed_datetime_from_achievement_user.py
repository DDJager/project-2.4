"""removed_datetime_from_achievement_user

Revision ID: 77684f435102
Revises: 5b82289ab0db
Create Date: 2017-06-23 17:21:35.961642

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '77684f435102'
down_revision = '5b82289ab0db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('achievements_users', 'date_achieved')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('achievements_users', sa.Column('date_achieved', mysql.DATETIME(), nullable=True))
    # ### end Alembic commands ###