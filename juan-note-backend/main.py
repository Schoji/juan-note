from fastapi import Depends, HTTPException

from sqlalchemy.orm import Session
from models.NoteModel import NoteModel, Note
from models.LineModel import LineModel, Line
from db import app, get_db


@app.post("/lines/", response_model=LineModel)
def createLine(line: LineModel, db: Session=Depends(get_db)):
    line = Line(content=line.content, lineNo=line.lineNo, idNote=line.idNote)
    db.add(line)
    db.commit()
    db.refresh(line)
    return line

@app.post("/notes/", response_model=NoteModel)
def createNote(note: NoteModel, db: Session=Depends(get_db)):
    note = Note(owner = note.owner)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.get('/notes/{note_id}')
def getNote(note_id: int, db: Session = Depends(get_db)):
    post_lines = db.query(Line).filter(Line.idNote == note_id).order_by(Line.lineNo).all()
    note = db.query(Note).filter(Note.id == note_id).first()

    lines = [{"line": line.lineNo, "content": line.content} for line in post_lines]

    response = {
        "id": note_id,
        "title": note.title,
        "lines": lines
    }
    return response
@app.delete('/notes/{note_id}', status_code=200)
def deleteNote(note_id: int, db: Session = Depends(get_db)):
    lines = db.query(Line).filter(Line.idNote == note_id).all()
    if (len(lines) != 0):
        for line in lines:
            db.delete(line)
    
    note = db.query(Note).filter(Note.id == note_id).first()
    if note == None:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return 200

@app.get('/notes/labels/')
def getNoteLabels(db: Session = Depends(get_db)):
    notes = db.query(Note).all()
    response = []
    for note in notes:
        singleNote = {}
        singleNote["id"] = note.id
        singleNote["title"] = note.title
        response.append(singleNote)
    return response

@app.get('/notes/first_valid_note/')
def getFirstValidNote(db: Session = Depends(get_db)):
    note = db.query(Note).first()
    return note
