import { ADD_FACILITIES, DELETE_FACILITIES, GET_FACILITIES, LOADING_FACILITIES, UPDATE_FACILITIES } from "../ActionTypes";

const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_FACILITIES })
}

export const getFacilities = () => (dispatch) => {
    dispatch({ type: GET_FACILITIES })
}

export const AddFacility = (data) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: ADD_FACILITIES, payload: data });
    }, 1000);
}

export const deleteFacility = (id) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: DELETE_FACILITIES, payload: id });
    }, 100);
}

export const updateFacility = (data) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: UPDATE_FACILITIES, payload: data })
    }, 100);
}