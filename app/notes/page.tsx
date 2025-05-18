import React, { Suspense } from 'react'
import Topbar from '../main/topbar/topbar'
import Sidebar from '../main/sidebar/sidebar'
import Notes from '../main/content/notes'
import { AuthGuard } from '../core/auth/AuthGuard'
import LoadingPage from '../loading/page'
import Toolbar from '../main/toolbar/page'

const Note = async ({ searchParams }: {
    searchParams: Promise<{
        note_id: string
    }>
}) => {
    const { note_id } = await searchParams;
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
                                <Notes idNote={note_id} />
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