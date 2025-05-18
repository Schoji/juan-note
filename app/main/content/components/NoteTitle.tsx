"use client";
import { database } from '@/app/firebaseConfig';
import { useNoteStore } from '@/app/core/global/useNoteStore';
import { ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';

const NoteTitle = () => {
  const { title } = useNoteStore();
  const { noteId } = useNoteStore();
  const [inputValue, setInputValue] = useState<string>(title != null ? title : "Unknown");
  useEffect(() => {
    setInputValue(title != null ? title : "Unknown");
  }, [noteId, title])

  const changeTitle = () => {
    if (inputValue.length < 3) return
    update(ref(database, `notes/${noteId}/`), {
      "title": inputValue
    });
  }
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
        <button className={inputValue == title ? "btn invisible" : "btn visible"} onClick={() => changeTitle()}>Save</button>
      </div>
    )
  }
  else {
    return (
      <div className='flex gap-1'>
        <div className='skeleton h-5 w-56'></div>
      </div>
    )
  }
}

export default NoteTitle