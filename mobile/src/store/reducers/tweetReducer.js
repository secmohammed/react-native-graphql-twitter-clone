import { GET_TWEETS } from '../actions/types.js'
const initialState = {
    tweets: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TWEETS:
            return {
                ...state,
                tweets: action.payload,
            }
        default:
            return state;
    }
}