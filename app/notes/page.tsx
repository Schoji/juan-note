import React, { Suspense } from 'react'
import Topbar from '../main/topbar/topbar'
import Sidebar from '../main/sidebar/sidebar'
import { AuthGuard } from '../core/auth/AuthGuard'
import LoadingPage from '../loading/page'
import Toolbar from '../main/toolbar/page'
import Notes from '../main/content/notes';
import NoteTitle from '../main/content/components/NoteTitle';

const Note = () => {
    return (
        <div>
            <Topbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-4/5 h-auto">
                    <Suspense fallback={LoadingPage()}>
                    <Toolbar/>
                        <table className='table table-auto scroll-auto' key={"table"}>
                            <tbody>
                                <tr><td colSpan={3} className='text-2xl font-bold'><NoteTitle /></td></tr>
                                <Notes/>
                            </tbody>
                        </table>
                        <AuthGuard />
                    </Suspense>
                </div>
            </div>
        </div>

    )
}

export default Note