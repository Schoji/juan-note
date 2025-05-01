from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from main import Note, Line

DATABASE_URL = "sqlite:///./backend.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


Notes = [
    {
        "id": 1,
        "owner": "Ala",
        "title": "Notatka o Pythonie"
    },
    {
        "id": 2,
        "owner": "Janek",
        "title": "Notatka nr 2"
    },
    {
        "id": 3,
        "owner": "Basia",
        "title": "Notatka o SQL"
    }
]
Lines = []

for note in Notes:
    for i in range(10):
        Lines.append({
            "content": f"Treść linijki nr {i + 1} dla notatki {note['id']}",
            "lineNo": i + 1,
            "idNote": note["id"]
        })


with SessionLocal() as db:
    for dane in Notes:
        # Tworzymy notatkę
        note = Note(owner=dane["owner"], title=dane["title"])
        db.add(note)
        db.commit()        # commitujemy, żeby note.id było dostępne
        db.refresh(note)

        # Tworzymy 10 linijek do tej notatki
        for i in range(10):
            line = Line(
                content=f"Treść linijki nr {i + 1} dla notatki {note.id}",
                lineNo=i + 1,
                idNote=note.id
            )
            db.add(line)

    db.commit()
