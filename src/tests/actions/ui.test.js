const { setError, setRemoveError, finishLoading, startLoading } = require("../../actions/ui");
const { types } = require("../../types/types");

describe('Pruebas en action ui', () => {
    test('Todas las acciones deben de funcionar', () => {
        const action = setError('ayuda');

        expect (action).toEqual({
            type:types.uiSetError,
            payload: 'ayuda'
        });

        const removeError = setRemoveError();
        const startLoad = startLoading();
        const finLoad = finishLoading();

        expect(removeError).toEqual({
            type:types.uiRemoveError
        });

        expect(startLoad).toEqual({
            type:types.uiStartLoading
        });

        expect(finLoad).toEqual({
            type:types.uiFinishLoading
        });
    });
    
})
