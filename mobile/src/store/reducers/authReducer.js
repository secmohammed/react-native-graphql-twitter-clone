import { SET_LOGGED_IN_USER, UNSET_LOGGED_IN_USER } from '../actions/types.js'
const initialState = {
    isAuthenticated: null,
    user: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            }
        case UNSET_LOGGED_IN_USER: 
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            }
        default:
            return state;
    }
}