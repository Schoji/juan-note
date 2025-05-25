interface Notes {
    id: string
    title: string
    lines: Array<Lines> | null
    position: number
}

interface Lines {
    id: number
    line: number
    content: string
}