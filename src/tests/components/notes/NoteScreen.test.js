import React from 'react';
import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes',()=>({
    activeNote:jest.fn(),
})) 

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid:'1',
        name: 'nicolas'
    },
    ui:{
        loading:false,
        msgError:null
    },
    notes: {
        active: {
            id:1234,
            title:'hola',
            body:'casa',
            date:0
        },
        notes:[]
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen/>
    </Provider>
)


describe('Pruebas en notescreen', () => {
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de disparar el activenote', () => {
        wrapper.find('input[name="title"]').simulate('change',{
            target: {
                name:'title',
                value:'hola again'
            }
        })

        expect(activeNote).toHaveBeenLastCalledWith(
            1234, {
            body:'casa',
            title: 'hola again',
            id:1234,
            date:0
        })
    })
    
    
})
