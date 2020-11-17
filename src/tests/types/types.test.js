import { types } from '../../types/types';


describe('Pruebas en Types', () => {
    test('los types deben ser igual al objeto creado', () => {
        const typ = types;

        expect(typ).toEqual({
            //types para login
                login: '[Auth] Login',
                logout: '[Auth] Logout',
            
            //types para uiReducer
                uiSetError: '[UI] Set Error',
                uiRemoveError: '[UI] Remove Error',
            
            //types para loading
                uiStartLoading: '[UI] Start loading',
                uiFinishLoading: '[UI] Finish loading',
            
            //types para nuevas notas
                notesAddNew: '[Notes] new note',
                notesActive: '[Notes] set active notes',
                notesLoad: '[Notes] Load Notes',
                notesUpdate: '[Notes] Update note',
                notesFileUrl: '[Notes] Update image',
                notesDelete: '[Notes] Delete Note', 
                notesLogoutCleaning: '[Notes] Logout Cleaning'   
            
            
            });
    })
    
})
