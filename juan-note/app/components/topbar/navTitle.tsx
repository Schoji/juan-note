"use client";
import { database } from '@/app/firebaseConfig';
import { useNoteStore } from '@/app/global/useNoteStore';
import { ref, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';

const NavTitle = () => {
  const { title, setNoteTitle } = useNoteStore();
  const { noteId, setNoteId } = useNoteStore();
  const [inputValue, setInputValue] = useState<string>(title != null ? title : "Unknown");
  useEffect(() => {
    setInputValue(title != null ? title : "Unknown");
  },[noteId])

  const changeTitle = () => {
    if (inputValue.length < 3) return
    update(ref(database, `notes/${noteId}/`), {
      "title" : inputValue
  });
  }
  return (
    <div className='flex gap-1'>
      <input
        key={noteId}
        className='!outline-none w-48'
        onChange={(e) => setInputValue(e.target.value)}
        
        value={inputValue}
        minLength={3}
        maxLength={20}
      />     
        <button className={inputValue != title ? "btn visible" : "btn invisible"} onClick={() => changeTitle()}>Save</button>    
    </div>
  )
}

export default NavTitle