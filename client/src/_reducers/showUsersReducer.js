import { SET_COURSE } from '../_actions/type';
import isEmpty from '../validation/is-empty';

const initialState = {
    users: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_COURSE:
            return {
                ...state,
                users: action.payload
            }
        default: 
            return state;
    }
}