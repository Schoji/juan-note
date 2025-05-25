// This function creates notes.
import { useNoteStore } from "@/app/core/global/useNoteStore";
import { database } from "@/app/firebaseConfig";
import { User } from "firebase/auth";
import { get, push, ref } from "firebase/database";

export const createNote = async (user: User) => {
    const { setSelectedNote, setNoteTitle } = useNoteStore.getState();

    if (!user) throw new Error("User is not valid.");

    // Get the number of total notes and increment it by one.
    const amountSnapshot = await get(ref(database, `users/${user!.uid}/notes/`));
    let amount = 0;
    if (amountSnapshot.val())
        //Get the total amount of notes.
        amount = Object.keys((amountSnapshot).val()).length;
    else
        //If there are no notes, set the amount to 0.
        amount = 0;

    const createdNote = push(ref(database, `users/${user!.uid}/notes/`), {
        "title": `New note ${amount + 1}`,
        "owner": user!.uid,
        "position": amount
    });

    console.log("Note added successfully. ID:", createdNote.key);
    // Go to the new note
    setSelectedNote(user.uid, createdNote.key);
    setNoteTitle(user.uid, `New note ${amount + 1}`)
};