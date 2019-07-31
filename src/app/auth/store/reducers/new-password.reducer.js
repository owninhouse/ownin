import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const newPassword = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.NEW_PASSWORD_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.NEW_PASSWORD_ERROR:
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

export default newPassword;