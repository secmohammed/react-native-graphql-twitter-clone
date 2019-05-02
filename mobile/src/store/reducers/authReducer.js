import { SET_LOGGED_IN_USER, UNSET_LOGGED_IN_USER } from "../actions/types.js";
const initialState = {
	isAuthenticated: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_LOGGED_IN_USER:
			return {
				...state,
				isAuthenticated: true
			};
		case UNSET_LOGGED_IN_USER:
			return {
				...state,
				isAuthenticated: false
			};
		default:
			return state;
	}
}
