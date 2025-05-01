from pydantic import BaseModel

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from db import Base

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    owner = Column(String)
    title = Column(String, nullable=False)
    lines = relationship("Line", back_populates="note")

class NoteModel(BaseModel):
    owner: str
    title: str
