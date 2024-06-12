import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from '../ActionTypes';

export const getCategory = () => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:8000/api/v1/categories/list-categories');
        const data = await response.json();
        console.log(data);
        dispatch({ type: GET_CATEGORY, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const addCategory = (category) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:8000/api/v1/categories/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        const data = response.json();
        dispatch({ type: ADD_CATEGORY, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/categories/delete-category/${id}`, {
            method: 'DELETE'
        })
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateCategory = (data) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/categories/update-category/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        dispatch({ type: UPDATE_CATEGORY, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};