import { GET_SHOPCON } from "../ActionTypes";

export const shopReducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case GET_SHOPCON:
            return {
                shopcon: action.payload
            }
        case ADD_SHOPCON:
            return {
                isLoading: false,
                shopcon: state.shopcon.concat(action.payload),
                error: null
            }
        default:
            return state;
    }
}