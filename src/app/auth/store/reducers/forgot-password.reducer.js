import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const forgotPassword = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.FORGOT_PASSWORD_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.FORGOT_PASSWORD_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default forgotPassword;