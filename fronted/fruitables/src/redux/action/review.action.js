import { ADD_REVIEW, DELETE_REVIEW, ERROR_REVIEW, GET_REVIEW, UPDATE_REVIEW } from "../ActionTypes";
import axios from 'axios';
import { baseURL } from "../../utils/baseURL";

export const errorReview = (error) => async (dispatch) => {
    dispatch({ type: ERROR_REVIEW, payload: error })
}

export const getreview = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "review")
            .then((response) => {
                dispatch({ type: GET_REVIEW, payload: response.data })
            })
            .catch((error) => {
                dispatch(errorReview(error.message))
            })
    } catch (error) {
        dispatch(errorReview(error.message))
    }
}

export const addreview = (data) => async (dispatch) => {
    try {
        await axios.post(baseURL + "review", data)
            .then((response) => {
                dispatch({ type: ADD_REVIEW, payload: response.data })
            })
            .catch((error) => {
                dispatch(errorReview(error.message))
            })
    } catch (error) {
        dispatch(errorReview(error.message))
    }
}

export const deleteReview = (id) => async (dispatch) => {
    try {
        await axios.delete(baseURL + "review/" + id)
            .then(dispatch({ type: DELETE_REVIEW, payload: id }))
            .catch((error) => {
                dispatch(errorReview(error.message))
            })
    } catch (error) {
        dispatch(errorReview(error.message));
    }
}

export const editReview = (data) => async (dispatch) => {
    try {
        await axios.put(baseURL + "review" + data.id, data)
            .then(dispatch({ type: UPDATE_REVIEW, payload: data }))
            .catch((error) => {
                dispatch(errorReview(error.message))
            })
    } catch (error) {
        dispatch(errorReview(error.message))
    }
}