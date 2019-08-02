import cognitoService from 'app/auth/services/cognitoService';
import * as Actions from 'app/store/actions';
import history from '@history';

export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

export const forgotPassword = ({ username }) => {
    return async (dispatch) => {
        cognitoService.forgotPassword(username)
            .then(() => {
                history.push({ pathname: `/forgot-password-submit/${username}` })
            })
            .catch((error) => {
                dispatch(Actions.showMessage({ message: error.message, variant: 'error' }));
                return dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                    payload: error
                });
            })
    }
}

export const forgotPasswordSubmit = ({ username, code, new_password }) => {
    return async (dispatch) => {
        cognitoService.forgotPasswordSubmit(username, code, new_password)
            .then(() => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
                dispatch(Actions.showMessage({ message: `Password changed successfully`, variant: 'success' }));
                history.push({ pathname: `/login` })
            })
            .catch((error) => {
                dispatch(Actions.showMessage({ message: error.message, variant: 'error' }));
                return dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                    payload: error
                });
            })
    }
}
