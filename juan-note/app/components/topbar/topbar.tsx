import React from 'react'

interface Lines {
    line: number,
    content: string
}

interface Notes {
    id: number,
    title: string,
    lines: Array<Lines>
}

const Topbar = async ({id = 0} : { id?: number }) => {
    const response = await fetch(`http://127.0.0.1:8000/notes/${id}`, { cache: 'no-cache' })
    const data: Notes = await response.json()
    return (
        <div className='navbar border-b-1 border-neutral-800'>
            <div className='navbar-start'>
                <p>Navbar start</p>
            </div>
            <div className='navbar-center'>
                <p>{data.title}</p>
            </div>
            <div className='navbar-end'>
                <p>Navbar end</p>
            </div>
        </div>
    )
}

export default Topbar