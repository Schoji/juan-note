import { push, ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
class Database {
    notesRef = ref(database, 'notes')

    // static getAllPosts = async() => {
    //     const querySnapshot = await get(child(notesRef, 'notes'));
    // }
}