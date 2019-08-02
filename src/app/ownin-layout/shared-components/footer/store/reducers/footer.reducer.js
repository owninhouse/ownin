import * as Actions from '../actions';

const initialState = {
    contact: {
        success: false,
        error: {}
    },
    subscribe: {
        success: null,
        error: {}
    },
};

const footer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SUBSCRIBE_SUCCESS:
            {
                return {
                    ...action.payload,
                    subscribe: {
                        success: true
                    }
                };
            }
        case Actions.SUBSCRIBE_ERROR:
            {
                return {
                    subscribe: {
                        success: false,
                        error: action.payload
                    }
                };
            }
        case Actions.CONTACT_SUCCESS:
            {
                return {
                    ...action.payload,
                    contact: {
                        success: true
                    }
                };
            }
        case Actions.CONTACT_ERROR:
            {
                return {
                    contact: {
                        success: false,
                        error: action.payload
                    }
                };
            }
        default:
            {
                return state;
            }
    }
};

export default footer;
