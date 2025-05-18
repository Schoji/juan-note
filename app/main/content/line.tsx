'use client'
import { database } from '@/app/firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import LineEditor from './components/LineEditor';
import { useSyncStore } from '@/app/core/global/useSyncStore';

const Line = ({ id, noteId }: { id: string, noteId: string }) => {

    const [text, setText] = useState<string>("Nothing");
    const lineRef = ref(database, `notes/${noteId}/lines/${id}`);
    const { setSyncStatus } = useSyncStore();
    // const textAreaRef = useRef<HTMLTextAreaElement>(null);


    const charsToSync: number = 10;
    const syncTimer: number = 2000;
    const editTimer: number = 1000;
    //Synchronizacja powinna wyglądać tak ->
    //Po 10 znakach
    //Po 5 sekundach od wciśnięcia przycisku

    const charsUntilSync = React.useRef(0);
    const isTimerRunning = React.useRef(false);
    const timer = React.useRef<NodeJS.Timeout | null>(null);
    const latestText = React.useRef(text);
    const isEditing = React.useRef(false)
    const editingTimer = React.useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        latestText.current = text;

    }, [text])

    const updateLine = () => {
        set(ref(database, `notes/${noteId}/lines/${id}`), {
            "content": latestText.current
        });
    }

    const changeTextFromHTML = (html: string) => {
        setText(html)




        isEditing.current = true;
        setSyncStatus("Not synced")
        // console.log("Editing timer rusza")
        editingTimer.current = setTimeout(() => {
            // console.log("Editing timer się skończył")
            isEditing.current = false;
        }, editTimer)

        // Aktualizuj linijke co 10 znak
        if (charsUntilSync.current >= charsToSync - 1) {
            console.log("Sync time!")
            charsUntilSync.current = 0;
            console.log("Uploading to db.")
            updateLine();

        }

        if (timer.current) {
            clearTimeout(timer.current);
        }
        
        isTimerRunning.current = true;
        timer.current = setTimeout(() => {
            console.log("Sync time!");
            updateLine();
            isTimerRunning.current = false;
            charsUntilSync.current = 0;
            setSyncStatus("Synced");
        }, syncTimer);

        charsUntilSync.current++;

    }

    useEffect(() => {
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
        <LineEditor content={text} onUpdate={(html) => changeTextFromHTML(html)} />
    )
}

export default Line