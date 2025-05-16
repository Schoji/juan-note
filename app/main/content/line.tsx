'use client'
import { database } from '@/app/firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react'

const Line = ({ id, noteId }: { id: string, noteId: string }) => {

    const [text, setText] = useState<string>();
    const lineRef = ref(database, `notes/${noteId}/lines/${id}`);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    

    const charsToSync: number = 10;
    const syncTimer: number = 2000;
    const editTimer: number = 1000;
    //Synchronizacja powinna wyglądać tak ->
    //Po 10 znakach
    //Po 5 sekundach od wciśnięcia przycisku

    var charsUntilSync = React.useRef(0);
    var isTimerRunning = React.useRef(false);
    var timer = React.useRef<NodeJS.Timeout | null>(null);
    var latestText = React.useRef(text);
    var isEditing = React.useRef(false)
    var editingTimer = React.useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        latestText.current = text;
        updateHeight();

    }, [text]) 

    const updateLine = () => {
        set(ref(database, `notes/${noteId}/lines/${id}`), {
            "content": latestText.current
        });
    }

    const updateHeight = () => {
        if (textAreaRef) {
            textAreaRef.current!.style.height = "0px";
            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px"
        }
    }

    const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.target.value)
            updateHeight();
            

            
    
            isEditing.current = true;
            // console.log("Editing timer rusza")
            editingTimer.current = setTimeout(() => {
                // console.log("Editing timer się skończył")
                isEditing.current = false;
            }, editTimer)
            
            // Aktualizuj linijke co 10 znak
            if (charsUntilSync.current >= charsToSync - 1) {
                console.log("Sync time!")
                charsUntilSync.current = 0;
                updateLine();
    
            }
    
            if (!isTimerRunning.current) {
                isTimerRunning.current = true;
                timer.current = setTimeout(() => {
                    console.log("Sync time!")
                    updateLine();
                    isTimerRunning.current = false;
                    charsUntilSync.current = 0;
                }, syncTimer)
            }
    
            charsUntilSync.current++;
            
        }

    useEffect(() => {
        updateHeight();
        const unsubscribe = onValue(lineRef, (snapshot) => {
            const data = snapshot.val();
            if (data != null) {              
                if (data.content != text && !isEditing.current) {
                    console.log("Data downloaded from db.")
                    setText(data.content)
                }
            }
        });
        return () => {
            unsubscribe();
            if (timer.current) clearTimeout(timer.current);
        };
    }, [])

    return (
        <textarea
            ref={textAreaRef}
            className='w-full outline-none p-2 text-xl overflow-hidden resize-none border-l-2 border-gray-700'
            value={text}
            onChange={(e) => changeText(e)}
        />
    )
}

export default Line