import React from 'react';
import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { LoginScreen } from '../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin,startLoginEmailPassword } from '../../actions/auth';

jest.mock('../../actions/auth',()=>({
    startGoogleLogin:jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{},
    ui:{
        loading:false,
        msgError:null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen/>
            </MemoryRouter>
        </Provider>
)
describe('Pruebas en <LoginScreen/>', () => {
    
    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    })
    
    test('debe de mostrarse Correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar la accion de startgooglelogin', () => {
        wrapper.find('.google-btn').prop('onClick')();

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('debe de disparar la accion startLogin con los respectivos argumentos', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLoginEmailPassword).toHaveBeenLastCalledWith('','');
    })
    
    
    
})
