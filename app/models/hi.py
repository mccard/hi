from sqlalchemy import Column, Integer, String
from database.database import Base

class Hi(Base):
    __tablename__ = 'hi'
    
    id = Column(Integer, primary_key=True)
    sender = Column(Integer, db.ForeignKey('user.id'))
    reciver = Column(Integer, db.ForeignKey('user.id'))
    date = Column(Integer, unique=False)

    def __init__(self, name=None, sender=None, reciver=None, database=None):
        self.name = name
        self.sender = sender
        self.reciver = reciver
        self.database = database