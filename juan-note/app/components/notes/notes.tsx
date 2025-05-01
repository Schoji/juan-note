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

const Notes = async ({ id = 0 }: { id?: number }) => {
    const response = await fetch(`http://127.0.0.1:8000/notes/${id}`, { cache: 'no-cache' })
    const data = await response.json()


    return (
        <table className='table table-auto'>
            <tbody>
                {data.lines.map((line: Lines) =>
                    <tr key={line.line} className='p-0'>
                        <td className='text-center w-2 caret-amber-600'>
                            <p>{line.line}</p>
                        </td>
                        <td className='p-0'>
                            <input type='text' className='w-full h-full outline-none p-4 text-2xl' defaultValue={line.content} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Notes