import cognitoService from 'app/auth/services/cognitoService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import history from '@history';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const submitLoginWithCognito = ({ username, password }) => {
    return (dispatch) => {
        cognitoService.signIn(username, password)
            .then((user) => {
                if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
                    dispatch(UserActions.setUserDataCognito(user));
                    history.push({ pathname: '/confirm-login' })
                }
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    dispatch(UserActions.setUserDataFromAdminCognito(user));
                    history.push({ pathname: '/complete-new-password' })
                } else {
                    dispatch(UserActions.setUserDataCognito(user));
                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            })
            .catch((error) => {
                dispatch(Actions.showMessage({ message: error.message }));
                if (error.code === 'UserNotConfirmedException') {
                    cognitoService.resendCode(username)
                        .then(() => {
                            history.push({ pathname: `/confirm-register/${username}` })
                        })
                        .catch((error) => {
                            return dispatch({
                                type: LOGIN_ERROR,
                                payload: error
                            });
                        })
                }
                if (error.code === 'PasswordResetRequiredException') {
                    cognitoService.forgotPassword(username)
                        .then(() => {
                            history.push({ pathname: `/forgot-password-submit/${username}` })
                        })
                        .catch((error) => {
                            dispatch(Actions.showMessage({ message: error.message, variant: 'error' }));
                            return dispatch({
                                type: LOGIN_ERROR,
                                payload: error
                            });
                        })
                }
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            })
    }
}

export const submitConfirmLoginWithCognito = ({ code }) => {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        cognitoService.confirmSignIn(user, code, null)
            .then((loggedUser) => {
                dispatch(UserActions.setUserData(loggedUser));
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch((error) => {
                dispatch(Actions.showMessage({ message: error.message }));
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            })
    }
}
