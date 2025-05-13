"use client";
import React from 'react'

var clicked = false;
const Playground = () => {
    type Item = {
        x: number;
        y: number;
        id: number;
        selected: boolean;
    };

    const [items, setItems] = React.useState<Item[]>([]);
    const [selectionRect, setSelectionRect] = React.useState<DOMRect | null>(null)
    const [startPoint, setStartPoint] = React.useState<{ x: number, y: number } | null>(null);

    const inputClick = (e: React.MouseEvent<HTMLTextAreaElement>, element: HTMLTextAreaElement) => {
        e.stopPropagation();
        if (e.target != element) {
            e.stopPropagation();
            return;
        }
    }

    const IncreaseSize = (element: React.FormEvent<HTMLTextAreaElement>) => {
        element.target.setAttribute('size', element.target.value.length)
        if (element.target.scrollWidth > 10) {
            element.target.style.width = element.target.scrollWidth + "px"

        }
        if (element.target.scrollHeight > 40) {
            element.target.style.height = element.target.scrollHeight + "px"
        }
    }

    const keyDown = (event) => {
        //TODO fix
        if (event.key === 'Delete') {
            console.log("XD")
        }
    }

    const fun = (e: React.MouseEvent) => {
        if (clicked == true) {
            setItems(prev => [
                ...prev,
                {
                    id: prev.length,
                    x: e.clientX,
                    y: e.clientY,
                    selected: false,
                }
            ]);
        }


    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        clicked = true;
        if (e.button !== 0) return

        const containerRect = e.currentTarget.getBoundingClientRect()

        setStartPoint({
            x: e.clientX - containerRect.x,
            y: e.clientY - containerRect.y,
        });
        setSelectionRect(
            new DOMRect(
                e.clientX - containerRect.x,
                e.clientY - containerRect.y,
                0,
                0,
            ),
        )
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        clicked = false;
        if (!startPoint) return;

        const containerRect =
            e.currentTarget.getBoundingClientRect()

        const x = e.clientX - containerRect.x
        const y = e.clientY - containerRect.y

        const nextSelectionRect = new DOMRect(
            Math.min(x, startPoint.x),
            Math.min(y, startPoint.y),
            Math.abs(x - startPoint.x),
            Math.abs(y - startPoint.y),
        );

        setSelectionRect(nextSelectionRect)
    }

    return (
        <div
            onClick={(e) => fun(e)}
            className={`w-dvw h-dvh ${selectionRect ? "select-none" : ""}`}
            onPointerDown={e => onPointerDown(e)}
            onPointerMove={e => onPointerMove(e)}
            onPointerUp={() => {
                setSelectionRect(null);
                setStartPoint(null);

                if (!selectionRect) return;

                setItems(items.map(item => {
                    const isInside =
                        item.x >= selectionRect.x &&
                        item.x <= selectionRect.x + selectionRect.width &&
                        item.y >= selectionRect.y &&
                        item.y <= selectionRect.y + selectionRect.height;

                    return {
                        ...item,
                        selected: isInside
                    };
                }));
            }}
            onKeyDown={(event) => keyDown(event)}
        >
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute ${item.selected ? "outline-2 outline-blue-500 rounded-md" : ""}`}
                    style={{ top: item.y, left: item.x }}
                >
                    <textarea
                        className='input overflow-hidden resize-none min-h-5 w-4 p-2 focus:outline-2 focus:outline-blue-500 '
                        autoFocus
                        onBlur={(e) => {
                            if (e.target.value.length === 0) {
                                setItems(items.filter((_, i) => i !== index));
                            }
                        }}
                        onInput={(e) => IncreaseSize(e)}
                        onClick={(e) => inputClick(e, e.currentTarget)}
                    />
                </div>
            ))}
            {
                selectionRect && (
                    <div
                        className="absolute border-black border-2 bg-black/30"
                        style={{
                            top: selectionRect.y,
                            left: selectionRect.x,
                            width: selectionRect.width,
                            height: selectionRect.height,
                        }}
                    />
                )
            }
        </div>
    )
}

export default Playground