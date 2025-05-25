"use client";
import React, { useEffect } from 'react';
import Line from '../../main/content/line';
import { database } from '@/app/firebaseConfig';
import { ref, onValue, push, remove } from "firebase/database";
import { useNoteStore } from '@/app/core/global/useNoteStore';
import { useRouter } from 'next/navigation';

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


const Notes = ({ idNote = "error" }: { idNote?: string; }) => {
    const router = useRouter();
    const { setNoteTitle } = useNoteStore();

    const [lineIds, setLineIds] = React.useState<Array<string>>([]);


    useEffect(() => {
        const noteRef = ref(database, `notes/${idNote}`);

        // // If there the id does not exist, load the first note there is
        // // on the database.
        // if (idNote == "error") {
        //     onValue(ref(database, `notes/`), (snapshot) => {
        //         const data = snapshot.val();
        //         if (data != null) {
        //             const firstNote = Object.keys(data)[0];
        //             router.replace(`/notes?note_id=${firstNote}`);
        //         }
        //         else {
        //             //TODO: 
        //             console.log("No note detected, shit");
        //         }

        //     });
        // }

        const unsubscribe = onValue(noteRef, (snapshot) => {
            const note: Note = snapshot.val();
            if (note != null) {
                console.log(note);
                setNoteId(idNote);
                setNoteTitle(note.title);
                if (note.lines != null) {
                    setLineIds(Object.keys(note.lines));
                }
                else {
                    setLineIds([]);
                }

            }
        });
        return () => unsubscribe();
    }, [idNote]);

    const addNewLine = () => {
        push(ref(database, `notes/${idNote}/lines/`), {
            "content": ""
        });
        console.log("Added new line");
    };

    const removeLine = (idLine: string) => {
        remove(ref(database, `notes/${idNote}/lines/${idLine}`));
    };

    const showMenu = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        e.preventDefault();
        console.log("menu")

    }

    return (
        <>
            <tr className='menu absolute'><td>XD</td></tr>           
            {lineIds && lineIds.length > 0 ? lineIds.map((id, index) =>
                <tr key={id} className='p-0' onContextMenu={(e) => showMenu(e)}>
                    <td className='text-center w-2 caret-amber-600 text-neutral-400'>
                        <p>{index + 1}</p>
                    </td>
                    <td className='p-0'>
                        <Line id={id} noteId={idNote} />
                    </td>
                    <td scope='col' className='w-32'>
                        <button
                            onClick={() => removeLine(id)}
                            className='btn btn-ghost btn-secondary'>Delete</button>
                    </td>
                </tr>
            ) : lineIds && lineIds.length == 0 ?
                null :
                <tr><td className='h-screen flex justify-center items-center'><span className="loading loading-dots loading-xl"></span></td></tr>}
            <tr className='p-0'>
                <td colSpan={3}>
                    <button
                        onClick={() => addNewLine()}
                        className='w-full h-full outline-none text-3xl text-left flex-grow btn btn-ghost btn-square rounded-none font-normal'>+</button>
                </td>
            </tr>
        </>
    );
};

export default Notes;