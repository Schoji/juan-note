import { useNoteStore } from "@/app/core/global/useNoteStore";
import { database } from "@/app/firebaseConfig";
import { User } from "firebase/auth";
import { ref, remove, get } from "firebase/database";

export const removeNote = async(user: User, id: string) => {
    const { getSelectedNote, setSelectedNote, setNoteTitle } = useNoteStore.getState();
    if (!user) return;

    //Remove the note in /user
    remove(ref(database, `users/${user!.uid}/notes/${id}`))

    //Check if a deleted note is a note that you are currently in. If so, change the note to the previous one
    const CurrentNoteId = getSelectedNote(user!.uid);
    if (CurrentNoteId == id) {
        // This means that we are about to delete a note that we are currently on.
        // So change the note to the previous one
        const previousNoteRef = await get(ref(database, `users/${user!.uid}/notes/`));
        if (previousNoteRef.exists()) {
            const notes = previousNoteRef.val();
            const noteKeys = Object.keys(notes);
            const lastNoteId = noteKeys[noteKeys.length - 1];
            const lastNoteTitle = notes[lastNoteId].title
            setSelectedNote(user!.uid, lastNoteId);
            setNoteTitle(user!.uid,lastNoteTitle);
        }
        else {
            // This means that the note we are about to delete is the last one. So set everything to null.
            setSelectedNote(user!.uid, "");
            setNoteTitle(user!.uid,"");
        }

    }
  }