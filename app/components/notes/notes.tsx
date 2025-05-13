"use client";
import React, { useEffect } from 'react'
import Line from './line'
import { database } from '@/app/firebaseConfig';
import { ref, onValue, push, remove } from "firebase/database";
import { useNoteStore } from '@/app/global/useNoteStore';
import { useRouter } from 'next/navigation';

interface Line {
    id: string
    lineNo: number
    content: string
}

interface Note {
    id: string
    title: string
    lines: Array<Line>
}

const dbArray = (obj: Record<string, any>) => {
    let array = []
    for (const element in obj) {
        let ob = obj[element]
        ob["id"] = element
        array.push(ob)
    }
    return array
}


const Notes = ({ idNote = "error"}: { idNote?: string }) => {
    const router = useRouter()

    const { noteId, setNoteId } = useNoteStore();
    const { title, setNoteTitle } = useNoteStore();

    const [data, setData] = React.useState<Note>({ id: "lololo", title: "Data is loading", lines: [{ "id": "xd", "lineNo": 1, "content": "XDD" }] });
    const [lines, setLines] = React.useState<Array<Line>>([{ "id": "xd", "lineNo": 1, "content": "XDD" }])
    const noteRef = ref(database, `notes/${idNote}`);

    useEffect(() => {
        if (idNote == "error") {
            onValue(ref(database, `notes/`), (snapshot) => {
                const data = snapshot.val();
                if (data != null) {
                    const firstNote = Object.keys(data)[0]
                    router.replace(`/notes?note_id=${firstNote}`)
                }
                else {
                    //TODO: 
                    console.log("No note detected, shit")
                }
                
              });
        }

        const unsubscribe = onValue(noteRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {
                setNoteId(idNote);
                setNoteTitle(data.title);
                setData(data);
                setLines(dbArray(data.lines))

            }
        });
        return () => unsubscribe();
    }, [idNote])

    const addNewLine = () => {
        push(ref(database, `notes/${idNote}/lines/`), {
            "lineNo": 1,
            "content": ""
        });
        console.log("Added new line");
    }

    const removeLine = (idLine: string) => {
        remove(ref(database, `notes/${idNote}/lines/${idLine}`))
    }

    return (
        <table className='table table-auto'>
            <tbody>
                {lines && lines.length > 0 ? lines.map((line: Line, index) =>
                    <tr key={line.id} className='p-0'>
                        <td className='text-center w-2 caret-amber-600'>
                            <p>{index + 1}</p>
                        </td>
                        <td className='p-0'>
                            <Line id={line.id} noteId={idNote} content={line.content} />
                        </td>
                        <td scope='col' className='w-32'>
                            <button
                                onClick={() => removeLine(line.id)}
                                className='btn'>Delete</button>
                        </td>
                    </tr>
                ) : null}
                <tr className='p-0'>
                    <td colSpan={3}>
                        <button
                            onClick={() => addNewLine()}
                            className='w-full h-full outline-none text-3xl text-left flex-grow btn btn-ghost btn-square rounded-none font-normal'>+</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Notes