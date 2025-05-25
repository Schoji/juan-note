"use client";
import React, { useEffect } from 'react';
import Line from './line';
import { database } from '@/app/firebaseConfig';
import { ref, onValue, push, remove } from "firebase/database";
import { useNoteStore } from '@/app/core/global/useNoteStore';
import { useAuth } from '@/app/core/auth/AuthContext';
import { fetchFirstNote } from './logic/getFirstNote';

interface Line {
    id: string;
    lineNo: number;
    content: string;
}

interface Note {
    id: string;
    title: string;
    lines: Array<Line>;
}


const Notes = () => {
    const { user } = useAuth();
    const [lineIds, setLineIds] = React.useState<Array<string> | null>(null);
    const [noNotes, setNoNotes] = React.useState<boolean>(false);

    const { selectedNotes, setNoteTitle } = useNoteStore();
    const idNote = user ? selectedNotes[user.uid] : null;

    useEffect(() => {
        if (!user) return;

        const load = async () => {
            if (!idNote) {
                console.log("XD")
                const found = await fetchFirstNote(user, null);
                if (!found) {
                    setNoNotes(true);
                    setNoteTitle(user.uid, "");
                }
            }
        };

        load();
    }, [user]);

    useEffect(() => {
        if (!user || !idNote) return;

        const noteRef = ref(database, `users/${user.uid}/notes/${idNote}`);
        const unsubscribe = onValue(noteRef, (snapshot) => {
            const note: Note = snapshot.val();
            if (note?.lines) {
                setLineIds(Object.keys(note.lines));
                setNoNotes(false);
            } else {
                setLineIds([]);
            }
        });

        return () => unsubscribe();
    }, [user, idNote]);

    const addNewLine = () => {
        if (!user) return;
        push(ref(database, `users/${user.uid}/notes/${idNote}/lines/`), {
            "content": ""
        });
        console.log("Added new line");
    };

    const removeLine = (idLine: string) => {
        if (!user) return;
        remove(ref(database, `users/${user.uid}/notes/${idNote}/lines/${idLine}`));
    };

    const showMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        e.preventDefault();
        console.log("menu");

    };

    if (noNotes) {
        return <tr><td>You have no notes</td></tr>;
    }

    if (!user || idNote === null || lineIds === null) {
        return <tr><td className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-xl"></span></td></tr>;
    }

    else {
        return (
            <>
                <tr className='menu absolute'><td></td></tr>
                {lineIds.map((id, index) =>
                    <tr key={id} className='p-0' onContextMenu={(e) => showMenu(e)}>
                        <td className='text-center w-2 caret-amber-600 text-neutral-400'>
                            <p>{index + 1}</p>
                        </td>
                        <td className='p-0'>
                            <Line user={user!} id={id} noteId={idNote} />
                        </td>
                        <td scope='col' className='w-32'>
                            <button
                                onClick={() => removeLine(id)}
                                className='btn btn-ghost btn-secondary'>Delete</button>
                        </td>
                    </tr>
                )}
                <tr className='p-0'>
                    <td colSpan={3}>
                        <button
                            onClick={() => addNewLine()}
                            className='w-full h-full outline-none text-3xl text-left flex-grow btn btn-ghost btn-square rounded-none font-normal'>+</button>
                    </td>
                </tr>
            </>
        );
    }
};

export default Notes;