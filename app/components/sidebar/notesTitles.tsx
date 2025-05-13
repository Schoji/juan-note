"use client";
import Link from 'next/link';
import React, { useEffect } from 'react'
import {  database } from '@/app/firebaseConfig';
import { ref, onValue, push, remove} from "firebase/database";

interface Note {
  id: string
  title: string
}

const dbArray = (obj: Record<string, any>) => {
  let array = []
  for (const element in obj) {
    let ob = obj[element]
    ob["id"] = element
    array.push(ob)
  }
  return array
}

const NotesTitles =() => {
  const [data, setData] = React.useState<Array<Note>>([{ id: "lololo", title: "Data is loading" }]);
  const noteRef = ref(database, 'notes');
  useEffect(() => {
    onValue(noteRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        setData(dbArray(data));
      }
    })
  },[])

  const addNewNote = () => {
    push(ref(database, 'notes'), {
      "title": "new note",
    });
    console.log("Note added")
  }

  const removeNote = (id: string) => {
    remove(ref(database, `notes/${id}`))
  }


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
            <button
            className='btn btn-circle btn-ghost btn-xs btn-secondary'
            onClick={() => removeNote(note.id)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-gray-400 hover:text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
          

        </div>
      ))}
      <div className='flex items-center w-full hover:bg-base-200'>
        <button
          onClick={() => addNewNote()}
          className='flex-grow btn btn-ghost btn-square rounded-none font-normal text-center '>
          Add note
        </button>
      </div>
    </>
  );
}

export default NotesTitles