import { GET_SHOP } from "../ActionTypes";

const producteState = {
    isLoading: false,
    shop: [],
    error: null
}

export const ShopReducer = (state = producteState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_SHOP:
            return {
                isLoading: false,
                shop: action.payload,
                error: null
            }
        default:
            return state;
    }
}