import { database } from '@/app/firebaseConfig';
import { ref, remove } from 'firebase/database';
import Link from 'next/link'
import React, { useState } from 'react'

const NoteLink = ({ note_id, note_title }: { note_id: string, note_title: string }) => {
    const [hovered, setHovered] = useState(false);

    const removeNote = (id: string) => {
        remove(ref(database, `notes/${id}`))
      }

    return (
        <div
        className='w-full flex justify-center'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            <Link 
                href={{
                pathname: '/notes',
                query: {
                    note_id: note_id
                },
            }}>
                {note_title}
            </Link>
            {hovered ? 
            <button
            className='btn btn-circle btn-ghost btn-xs btn-secondary'
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
          : null }
        </div>
    );
}

export default NoteLink