import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes"


export const increment = () => (dispatch) => {
    dispatch({ type: INCREMENT_COUNTER })
}

export const decrement = () => (dispatch) => {
    dispatch({ type: DECREMENT_COUNTER })
}