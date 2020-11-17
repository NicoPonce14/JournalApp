import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas en actions de auth', () => {
   
    beforeEach(()=>{
        store = mockStore(initState);
    })

    test('Login y Logout deben de crear la accion respectiva', () => {
        const actlogin = login('1234','nico');
        
        const actlogout = logout();

        expect(actlogin).toEqual({
            type:types.login,
            payload:{
                uid:'1234',
                displayName:'nico'
            }
        })
        expect(actlogout).toEqual({
            type:types.logout
        });
    });

    test('debe de realizar el startLogout', async() => {
        await store.dispatch(startLogout());

        const actions = store.getActions();


        expect(actions[0]).toEqual({
            type:types.logout
        }); 

        expect(actions[1]).toEqual({
            type:types.notesLogoutCleaning
        });
    });

    test('debe de iniciar el startLoginEmailAndPassword', async() => {
        await store.dispatch(startLoginEmailPassword('test@testing.com','123456'));
        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type:types.login,
            payload:{
                uid:'TBHbLoc3gPOUR984xARll1ptbZk1',
                displayName: null
            }
        });
        
    })
    
    
    
})
