import { baseURL } from "../../utils/baseURL";
import axios from 'axios';
import { ADD_PRODUCTES, DELETE_PRODUCTES, ERROR_PRODUCTES, GET_PRODUCTES, LOADING_PRODUCTES, UPDATE_PRODUCTES } from "../ActionTypes";

const handleLoading = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTES })
}

export const errorProductes = (error) => async (dispatch) => {
    dispatch({ type: ERROR_PRODUCTES, payload: error })
}

export const getProductes = () => async (dispatch) => {
    try {
        // dispatch(handleLoading());
        const response = await fetch('http://localhost:8000/api/v1/productes/list-productes');
        const data = await response.json();
        console.log(data);
        // await axios.get(baseURL + "productes")
        //     .then((response) => {
        //         // setTimeout(() => {
        dispatch({ type: GET_PRODUCTES, payload: data })
        //         // }, 1000)
        //     })
        // .catch((error) => {
        //     dispatch(errorProductes(error.message))
        // })
    } catch (error) {
        dispatch(errorProductes(error.message));
    }
}

export const addProductes = (product) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/productes/add-productes", product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        dispatch({ type: ADD_PRODUCTES, payload: response.data.data });
        // await axios.post(baseURL + "productes", data)
        //     .then((response) => dispatch({ type: ADD_PRODUCTES, payload: response.data }))
        //     .catch((error) => {
        //         dispatch(errorProductes(error.message))
        //     })
    } catch (error) {
        dispatch(errorProductes(error.message));
    }
}

export const deleteProductes = (id) => async (dispatch) => {
    try {
        await fetch(`http://localhost:8000/api/v1/productes/delete-productes/${id}`, {
            method: 'DELETE'
        });
        dispatch({ type: DELETE_PRODUCTES, payload: id })
        // await axios.delete(baseURL + "productes/" + id)
        //     .then(dispatch({ type: DELETE_PRODUCTES, payload: id }))
        //     .catch((error) => {
        //         dispatch(errorProductes(error.message))
        //     })
    } catch (error) {
        dispatch(errorProductes(error.message));
    }
}

export const editProductes = (product) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/v1/products/update-products/${product._id}`, product, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        dispatch({ type: UPDATE_PRODUCTES, payload: response.data.data });
    } catch (error) {
        dispatch(errorProductes(error.message))
    }
}
// const response = await fetch(`localhost:8000/api/v1/productes/update-productes/${product._id}`, product, {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     },
//     body: JSON.stringify(product)
// });
// const finaldata = await response.json();
// dispatch({ type: UPDATE_PRODUCTES, payload: response.data.data })
// await axios.put(baseURL + "productes/" + data.id, data)
//     .then(dispatch({ type: UPDATE_PRODUCTES, payload: data }))
//     .catch((error) => {
//         dispatch(errorProductes(error.message))
//     })
// } catch (error) {
//     dispatch(errorProductes(error.message));
// }
// }