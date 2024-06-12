import { baseURL } from "../../utils/baseURL";
import axios from 'axios';
import { GET_SHOP } from "../ActionTypes";

export const shopProductes = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruits")
            .then((response) => {
                setTimeout(() => {
                    dispatch({ type: GET_SHOP, payload: response.data })
                }, 1000)
            })
    } catch (error) {
        console.log(error.message);
    }
}