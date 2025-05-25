import { useNoteStore } from "@/app/core/global/useNoteStore";
import { database } from "@/app/firebaseConfig";
import { User } from "firebase/auth";
import { get, ref } from "firebase/database";

export const fetchFirstNote = async (user: User, idNote: string | null) => {
    const {setSelectedNote, setNoteTitle} = useNoteStore.getState();
    if (!idNote) {
        const firstNoteRef = await get(ref(database, `users/${user!.uid}/notes/`));
        if (firstNoteRef.exists()) {
            const notes = firstNoteRef.val();
            const noteKeys = Object.keys(notes);
            const lastNoteId = noteKeys[0];
            const lastNoteTitle = notes[lastNoteId].title;
            setSelectedNote(user!.uid, lastNoteId);
            setNoteTitle(user!.uid, lastNoteTitle);
            return true
        }
        else {
            console.log("No other note was found.")
            return false
        }
    }
    else {
        return false
    }
};