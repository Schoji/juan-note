'use client'
import { database } from '@/app/firebaseConfig';
import { onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSyncStore } from '@/app/core/global/useSyncStore';
import LineEditor from './components/LineEditor';
import { User } from 'firebase/auth';

const Line = ({user, id, noteId }: {user: User, id: string, noteId: string }) => {

    const [text, setText] = useState<string>("Nothing");
    
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
        if (!user) return;
        const lineRef = ref(database, `users/${user.uid}/notes/${noteId}/lines/${id}`);
        set(lineRef, {
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
        if (!user || !noteId || !id) return;
        const lineRef = ref(database, `users/${user.uid}/notes/${noteId}/lines/${id}`);
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