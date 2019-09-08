import {simpleConstants} from '../_constants';

const initState = {number}

export const simpleReducer = (state=initState, action) => {
    switch(action.type) {
        case simpleConstants.INCREMENT:
            return {...state}
        case simpleConstants.DECREMENT:
            return {...state}
        default:
            return state;
    }
}
