import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from '../ActionTypes';

const initialState = {
    isLoading: false,
    category: [],
    error: null
};

export const categoryReducer = (state = initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload.data,
                isLoading: false
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: state.category.concat(action.payload.data)
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                category: state.category.filter((category) => category._id !== action.payload)
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                category: state.category.map((category) => {
                    if (category._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return category;
                    }
                }),
            };
        default:
            return state;
    }
}
