import cognitoService from 'app/services/cognitoService';
import * as Actions from 'app/store/actions';
import history from '@history';

export const NEW_PASSWORD_ERROR = 'NEW_PASSWORD_ERROR';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';

export const completeNewPassword = ({newPassword, email, phone_number}) =>
{
    return async (dispatch, getState) => {
        const user = getState().auth.user.cognito;
        cognitoService.completeNewPassword(user, newPassword, email, phone_number)
            .then(() => {
                dispatch({
                    type: NEW_PASSWORD_SUCCESS
                });
                dispatch(Actions.showMessage({message: `Password changed successfully`, variant: 'success'}));
                history.push({ pathname: `/login` })
            })
            .catch((error) => {
                dispatch(Actions.showMessage({message: error.message, variant: 'error'}));
                return dispatch({
                    type   : NEW_PASSWORD_ERROR,
                    payload: error
                });
            })
    }
}
