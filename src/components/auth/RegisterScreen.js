import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator';
import { setRemoveError, setError  } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector  } from 'react-redux';
import { RegisterUser } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm( {
        name: 'Nicolas',
        email: 'nponcech@gmail.com',
        password:'123456',
        password2:'123456'
    } );

    const {name,email,password,password2} = formValues;

    const handleRegister= (e) => {
        e.preventDefault(e);
        if(isFormValid()){
            dispatch(RegisterUser(email,password,name));
        }
    }

    const isFormValid = () => {
        if(name.trim().length===0){
            dispatch(setError('nombre esta vacio'));
            return false;
        } else if (!validator.isEmail(email)){
            dispatch(setError('formato de email incorrecto'));
            return false;
        } else if (password !==password2 || password.length<5){
            dispatch(setError('error en password'));
            return false;
        }

        dispatch(setRemoveError());
        return true;
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>

            
            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                    />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                    />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                    />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                {
                msgError &&
                (
                    <div className="auth__alert-error">
                    {msgError}
                    </div>
                )
                
            }

                <Link className="link" to="/auth/login">
                    Already registered ?
                </Link>
            </form>
        </div>
    )
}
