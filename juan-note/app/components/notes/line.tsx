'use client'
import { database } from '@/app/firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'

const Line = ({ id, content, noteId }: { id: string, content: string, noteId: string }) => {

    const [text, setText] = useState<string>(content);

    const noteRef = ref(database, `notes/${noteId}/lines/${id}`);
    useEffect(() => {
            set(ref(database, `notes/${noteId}/lines/${id}`), {
                "content": text
            });

    }, [text]);

    useEffect(() => {
        const unsubscribe = onValue(noteRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                if (data.content != text) {
                    setText(data.content)
                }
            }
        });
        return () => unsubscribe();
    })


    return (
        <input
            type='text'
            className='w-full h-full outline-none p-4 text-2xl'
            value={text}
            onChange={(e) => setText(e.target.value)}
            max={200}
        />
    )
}

export default Line