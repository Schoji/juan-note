"use client";
import Link from 'next/link';
import React, { useEffect } from 'react'
import { database } from '@/app/firebaseConfig';
import { ref, onValue, push, remove } from "firebase/database";
import NoteLink from './noteLink';

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

const NotesTitles = () => {
  const [data, setData] = React.useState<Array<Note>>([{ id: "lololo", title: "Data is loading" }]);
  const noteRef = ref(database, 'notes');
  useEffect(() => {
    onValue(noteRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        setData(dbArray(data));
      }
    })
  }, [])

  const addNewNote = () => {
    push(ref(database, 'notes'), {
      "title": "new note",
    });
    console.log("Note added")
  }


  return (
    <>
      {data.map((note: Note, index: React.Key | null | undefined) => (
        <div key={index} className='flex items-center w-full hover:bg-base-200 p-2 justify-center'>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg> */}
          <NoteLink note_id={note.id} note_title={note.title}/>
          


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