import { ADD_PRODUCTES, DELETE_PRODUCTES, ERROR_PRODUCTES, GET_PRODUCTES, LOADING_PRODUCTES, UPDATE_PRODUCTES } from "../ActionTypes";

const producteState = {
    isLoading: false,
    productes: [],
    error: null
}

export const ProductesReducer = (state = producteState, action) => {
    console.log(action);
    switch (action.type) {
        case LOADING_PRODUCTES:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR_PRODUCTES:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_PRODUCTES:
            return {
                isLoading: false,
                productes: action.payload.data,
                error: null
            }
        case ADD_PRODUCTES:
            return {
                isLoading: false,
                productes: [...state.productes, action.payload],
                // productes: state.productes.concat(action.payload.data),
                error: null
            }
        case DELETE_PRODUCTES:
            return {
                isLoading: false,
                productes: state.productes.filter((v) => v._id !== action.payload),
                error: null
            }
        case UPDATE_PRODUCTES:
            return {
                isLoading: false,
                error: null,
                products: state.productes.map(product =>
                    product._id === action.payload._id ? action.payload : product
                )
                // productes: state.productes.map((v) => {
                //     if (v._id === action.payload._id) {
                //         return action.payload
                //     } else {
                //         return v
                //     }
                // })
            }
        default:
            return state;
    }

}