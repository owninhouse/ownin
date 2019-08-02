// import axios from 'axios';

export const SUBSCRIBE_SUCCESS = '[FOOTER] SUBSCRIBE SUCCESS';
export const SUBSCRIBE_ERROR = '[FOOTER] SUBSCRIBE ERROR';
export const CONTACT_SUCCESS = '[FOOTER] CONTACT SUCCESS';
export const CONTACT_ERROR = '[FOOTER] CONTACT ERROR';

// export function contact() {
//     const request = axios.get('/api/quick-panel/data');
//     return (dispatch) =>
//         request.then((response) =>
//             dispatch({
//                 type: CONTACT,
//                 payload: response.data
//             })
//         );
// }

export const contact = (data) => {
    return (dispatch) => {
        dispatch({
            type: CONTACT_SUCCESS
        })
    }
}


export function subscribe() {
    return (dispatch) => {
        dispatch({
            type: SUBSCRIBE_SUCCESS
        })
    }
}
