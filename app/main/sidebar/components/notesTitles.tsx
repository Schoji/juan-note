"use client";
import { useAuth } from '@/app/core/auth/AuthContext';
import { database } from '@/app/firebaseConfig';
import LoadingPage from '@/app/loading/page';
import { onValue, ref } from "firebase/database";
import React, { useEffect } from 'react';
import { createNote } from '../logic/createNote';
import NoteLink from './noteLink';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbArray = (obj: Record<string, any>) => {
  if (obj == null) return;
  const array = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    const newObj = {
      ...obj[key],
      id: key,
    };
    array.push(newObj);
  }
  return array;
};

const NotesTitles = () => {
  const [notes, setNotes] = React.useState<Array<Notes> | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const userRef = ref(database, `users/${user.uid}/notes/`);
    const fetchNotes = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setNotes(dbArray(data) || []);
    });

    return () => fetchNotes();
  }, [user]);

  if (notes == null) {
    return <LoadingPage />;
  }
  else if (notes.length == 0) {
    return <div className='flex items-center w-full hover:bg-base-200'>
      <button
        onClick={() => createNote(user!)}
        className='flex-grow btn btn-ghost btn-square rounded-none font-normal text-center '>
        Add note
      </button>
    </div>;
  }
  else {
    return (
      <>
        {notes.map((note: Notes, index: React.Key | null | undefined) => (
          <div key={index} className='flex items-center w-full hover:bg-base-200 justify-center'>
            <NoteLink note_id={note.id} note_title={note.title} />
          </div>
        ))}
        <div className='flex items-center w-full hover:bg-base-200'>
          <button
            onClick={() => createNote(user!)}
            className='flex-grow btn btn-ghost btn-square rounded-none font-normal text-center '>
            Add note
          </button>
        </div>
      </>
    );
  }
};

export default NotesTitles;