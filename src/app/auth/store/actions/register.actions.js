import cognitoService from 'app/services/cognitoService';
import * as Actions from 'app/store/actions';
import history from '@history';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const submitRegisterCognito = ({ username, password, email, phone_number }) =>
{
    return async (dispatch) => cognitoService.signUp(username, password, email, phone_number)
        .then(() => {
            history.push({ pathname: `/confirm-register/${username}` })
        })
        .catch((error) => {
            dispatch(Actions.showMessage({message: error.message}));
            return dispatch({
                type   : REGISTER_ERROR,
                payload: error
            });
        })
}

export const submitConfirmRegisterWithCognito = ({username, code}) =>
{
    return async (dispatch) => {
        cognitoService.confirmSignUp(username, code)
            .then(() => {
                dispatch({
                    type: REGISTER_SUCCESS
                });
                dispatch(Actions.showMessage({message: 'User registered successfully. Please sign in!', variant: 'success'}));
                history.push({ pathname: `/login` })
            })
            .catch((error) => {
                dispatch(Actions.showMessage({message: error.message}));
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: error
                });
            })
    }
}