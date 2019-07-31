import axios from 'axios';
import OwnInApisConfig from 'app/ownin-configs/apiConfig';
import {showMessage} from 'app/store/actions/ownin';

export const QUALIFY_SUCCESS = '[QUALIFY PAGE APP] QUALIFY SUCCESS';
export const QUALIFY_ERROR   = '[QUALIFY PAGE APP] QUALIFY SUCCESS';

export function registerQualify(data)
{
    const request = axios.post(`${OwnInApisConfig.hubspot.url}/contacts/v1/contact/?hapikey=${OwnInApisConfig.hubspot.key}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*" }
    });

    return (dispatch) =>
        request.then((response) => {
            console.log(response)
            dispatch(showMessage({message: 'User qualification sent!'}));
            return dispatch({
                type   : QUALIFY_SUCCESS,
                payload: response.data
            })
        })
        .catch((error) => {
            // dispatch(showMessage({message: error}));
            console.log(error)
            return dispatch({
                type   : QUALIFY_ERROR,
                payload: error
            })
        });
}
