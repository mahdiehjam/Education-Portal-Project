import { simpleConstants } from "../_constants";

export const simpleActions = {
    increment,
    decrement
}

function increment () {
    return {type: simpleConstants.INCREMENT};
} 

function decrement () {
    return {type: simpleConstants.DECREMENT};
} 