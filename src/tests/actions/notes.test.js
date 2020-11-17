import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload:jest.fn(()=>{
        return 'https://hola-mundo.com/foto.jpg'
    })
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes:{
        active:{
            id:'588eVAPvTRNR3dxF2beQ',
            title:'Hola',
            body:'Mundo'
        }
    }
}
let store = mockStore(initState);

describe('Pruebas con las acciones de note', () => {
    
    beforeEach(()=>{
        store = mockStore(initState);
    })
    
    test('debe crear una nueva nota ', async() => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    });

    test('starLoadingnotes debe cargar las notas', async() => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type:types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id:expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    });
    
    test('startSAvenote debe actualizar la nota ', async() => {
        const note = {
            title: 'titulo',
            id: '588eVAPvTRNR3dxF2beQ',
            body: 'cuerpo'
        }
        
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdate);

        //espera que el titulo q esta en la DB sea igual al de la nota
        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe(note.title);

    });

    test('startUploading debe de actualizar el url del entry', async() => {
        
        const file = new File([],'foto.jpg');
        await store.dispatch(startUploading(file));

        const docRef = await db.doc('/TESTING/journal/notes/588eVAPvTRNR3dxF2beQ').get();

        expect(docRef.data().url).toBe('https://hola-mundo.com/foto.jpg');



    })
    
    
    
})
