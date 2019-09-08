import {simpleConstants} from '../_constants';

const initState = {number: 0}

export const simpleReducer = (state=initState, action) => {
    switch(action.type) {
        case simpleConstants.INCREMENT:
            return {...state, number: state.number + 1}
        case simpleConstants.DECREMENT:
            return {...state, number: state.number - 1}
        default:
            return state;
    }
}