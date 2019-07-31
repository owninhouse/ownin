import axios from "axios";
import OwnInApisConfig from "app/ownin-configs/apiConfig";
import { showMessage } from "app/store/actions/ownin";

export const QUALIFY_SUCCESS = "[QUALIFY PAGE APP] QUALIFY SUCCESS";
export const QUALIFY_ERROR = "[QUALIFY PAGE APP] QUALIFY SUCCESS";

export function registerQualify(data) {
	const request = axios.post(`${OwnInApisConfig.hubspot.url}/hubspot`, data);

	return dispatch =>
		request
			.then(response => {
				console.log(response);
				dispatch(showMessage({ message: "User qualification sent!" }));
				return dispatch({
					type: QUALIFY_SUCCESS,
					payload: response.data.data["profile-token"],
				});
			})
			.catch(error => {
				// dispatch(showMessage({message: error}));
				console.log(error);
				return dispatch({
					type: QUALIFY_ERROR,
					payload: error,
				});
			});
}
