import { database } from '@/app/firebaseConfig';
import { ref, remove } from 'firebase/database';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const NoteLink = ({ note_id, note_title }: { note_id: string, note_title: string }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const removeNote = (id: string) => {
    remove(ref(database, `notes/${id}`))
  }
  return (
    <div
      className='w-full flex justify-center gap-1 items-center p-3 hover:cursor-pointer'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/notes?note_id=${note_id}`)}
    >
      <div className='flex-[0_0_24px]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>

      </div>
      <div
        className='flex-auto text-left'>
        {note_title}
      </div>
      <button
        className={hovered ? 'btn btn-circle btn-ghost btn-xs btn-secondary flex-initial grow-0 visible' : 'btn btn-circle btn-ghost btn-xs btn-secondary flex-initial grow-0 invisible'}
        onClick={() => removeNote(note_id)}
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
  );
}

export default NoteLink