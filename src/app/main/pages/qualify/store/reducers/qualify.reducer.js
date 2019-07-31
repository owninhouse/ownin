import * as Actions from '../actions';

const initialState = {
    success: false,
    error  : {}
};

const qualifyReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.QUALIFY_SUCCESS:
            return {
                ...action.payload,
                success : true
            }
        case Actions.QUALIFY_ERROR:
            return {
                error   : action.payload,
                success : false
            }
        default:
            return state;
    }
};

export default qualifyReducer;
