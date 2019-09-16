import axios from 'axios';
import { GET_ERRORS, SET_COURSE } from './type';
import store from '../store/index'

export const registerCourse = (course, history) => dispatch => {
    axios.post('api/users/course/create', course)
            .then(res =>  history.push('/course') )
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const GetTeacher = () => dispatch => {
    axios.get('api/users/teacher')
            .then(res => {
                
                let users = {salam:'mahya'};
                
                    store.dispatch(setCourse(users));
                
            
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCourse = users => {
    return {
        type: SET_COURSE,
        payload: {users}
    }
}