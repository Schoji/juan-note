interface Notes {
    id: number
    title: string
    lines: Array<Lines>
}

interface Lines {
    id: number
    line: number
    content: string
}