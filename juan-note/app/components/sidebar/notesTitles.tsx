import Link from 'next/link';
import React from 'react'
import DeleteNoteButton from './deleteNoteButton';

interface Note {
  id: number,
  title: string
}

const NotesTitles = async () => {
  const response = await fetch('http://127.0.0.1:8000/notes/labels/', {cache: 'no-store'})
  const data = await response.json();

  return (
    <>
      {data.map((note: Note, index: React.Key | null | undefined) => (
        <div key={index} className='flex items-center w-full hover:bg-base-200'>
          <Link href={{
            pathname: '/notes',
            query: {
              note_id: note.id
            },
          }}
            className='flex-grow btn btn-ghost btn-square rounded-none font-normal text-center '>{note.title}
            </Link>
            <DeleteNoteButton id={note.id}/>
          

        </div>
      ))}
    </>
  );
}

export default NotesTitles