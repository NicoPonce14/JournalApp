import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";
import { types } from "../types/types";


export const startNewNote = () => {
    return async(dispatch,getState) => {
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        
        dispatch(activeNote(docRef.id,newNote));
        dispatch(addNewNote(uid,newNote));
    }
}

export const activeNote = (id,note) =>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})

//permite cargar la nueva nota al hacer click en el boton de new entry
export const addNewNote = (id,note)=> ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNote(notes));

    }
}

export const setNote = (notes) => ({
    type:types.notesLoad,
    payload: notes
})


//actualiza la nota
export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        
        //actualiza el panel del sidebar con la nota actualizada
        dispatch(refreshNote(note.id,noteToFirestore));

        //dispara un mensaje de exito de grabado
        Swal.fire('Saved',note.title,'success');
    }
}

//refresca el sidebar con la nota que fue actualizada
export const refreshNote = (id, note)=> ({
    type:types.notesUpdate,
    payload: {
        id,
        note :{
            id,
            ...note
        }
    }
})

//metodo que sube una imagen a la nota de un usuario
export const startUploading = (file) => {
    return async(dispatch,getState)=>{
        const {active} = getState().notes;

        Swal.fire({
            title: 'Uploading..',
            text: 'Please Wait!',
            allowOutsideClick: false,
            onBeforeOpen: ()=>{
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        dispatch(startSaveNote(active));

        Swal.close();

    }
}

//metodo para eliminar una nota de un usuario
export const startDeleting = (id) => {
    return async(dispatch,getState)=>{
        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) =>({
    type:types.notesDelete,
    payload:id
})

export const noteLogout = () => ({
    type:types.notesLogoutCleaning,
})