import React from 'react'
import Topbar from '../components/topbar/topbar'
import Sidebar from '../components/sidebar/sidebar'
import Notes from '../components/notes/notes'

const Note = async ({searchParams} : {
    searchParams: {
        note_id: number
    }
}) => {
    const params = await searchParams;
    const noteId = params.note_id;
    return (
        <div>
            <Topbar id={noteId}/>
            <div className="flex">
                <Sidebar />
                <div className="flex-4/5 h-auto">
                    <Notes id={noteId} />
                </div>
            </div>
        </div>

    )
}

export default Note