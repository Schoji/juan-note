"use client";
import { database } from '@/app/firebaseConfig';
import { useNoteStore } from '@/app/core/global/useNoteStore';
import { ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/core/auth/AuthContext';

const NoteTitle = () => {
  const { user } = useAuth();

  const { setNoteTitle } = useNoteStore();

  const noteId = useNoteStore((state) =>
    user ? state.selectedNotes[user.uid] : "Not loaded"
  );
  const title = useNoteStore((state) =>
    user ? state.getNoteTitle(user.uid) : null
  );

  const [inputValue, setInputValue] = useState<string>(title != null ? title : "Unknown");
  useEffect(() => {
    setInputValue(title != null ? title : "Unknown");
  }, [noteId, title]);

  const changeTitle = () => {
    if (!user || !noteId) return;
    if (inputValue.length < 3) return;
    update(ref(database, `users/${user.uid}/notes/${noteId}/`), {
      "title": inputValue
    });
    setNoteTitle(user.uid, inputValue);
  };
  if (title) {
    return (
      <div className='flex gap-1'>
        <input
          key={noteId}
          className='!outline-none'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          minLength={3}
          maxLength={21}
        />
        <button
          className={`btn transition-opacity duration-200 ${inputValue !== title ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          onClick={changeTitle}
          disabled={inputValue === title}
        >
          Save
        </button>
      </div>
    );
  }
  else {
    return (
      <div className='flex gap-1'>
        <div className='skeleton h-5 w-56'></div>
      </div>
    );
  }
};

export default NoteTitle;