import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en reducer authReducer', () => {
    
    test('Pruebas en action login', () => {
        
        const initState = {};

        const action = {
            type:types.login,
            payload: {
                uid: 'abc',
                displayName: 'Nicolas'
            }
        };

        const state = authReducer(initState,action);

        expect(state).toEqual({
            uid: 'abc',
            name: 'Nicolas'
        })


    });

    test('Pruebas en action logout', () => {
        
        const initState = {
            uid: 'abc',
            displayName: 'Nicolas'
        };

        const action = {
            type:types.logout
        };

        const state = authReducer(initState,action);

        expect(state).toEqual({});


    });
    
    test('Pruebas cuando la action no existe', () => {
        
        const initState = {
            uid: 'abc',
            displayName: 'Nicolas'
        };

        const action = {
            type:types.logouts
        };

        const state = authReducer(initState,action);

        expect(state).toEqual(initState);


    });
})
