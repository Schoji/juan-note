'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteNoteButton = ({id} : {id: number}) => {
  const router = useRouter();

    const deleteNote = async (id: number) => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/notes/${id}`, { method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }})
        if (response.ok) {
            router.refresh();
        }
        
        } catch (error) {
            alert(error)
        }
      }
      
    return (
        <button
            className='btn btn-circle btn-ghost btn-xs btn-secondary'
            onClick={() => deleteNote(id)}
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
    )
}

export default DeleteNoteButton