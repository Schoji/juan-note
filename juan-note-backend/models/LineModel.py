from pydantic import BaseModel

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from db import Base

class Line(Base):
    __tablename__ = "lines"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    lineNo = Column(Integer, nullable=False)
    idNote = Column(Integer, ForeignKey("notes.id"))
    note = relationship("Note", back_populates="lines")

class LineModel(BaseModel):
    content: str
    lineNo: int
    idNote: int
