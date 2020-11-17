import React from 'react';
import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../types/types';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';

import {firebase} from '../../firebase/firebase-config';
import { AppRouter } from '../../routers/AppRouter';




jest.mock('../../actions/auth',()=>({
    login:jest.fn(),
})) 

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes:[]
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();





describe('Pruebas en approuter', () => {
    test('debe de llamar el login si estoy autenticado', async() => {
        
        let user;
        await act(async()=>{

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456');
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter/>
                    </MemoryRouter>
                </Provider>
            )
            
        });

        expect(login).toHaveBeenCalledWith('TBHbLoc3gPOUR984xARll1ptbZk1', null);
    })
    
})
