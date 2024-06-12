import { ADD_CONTACT, DELETE_CONTACT, GET_CONTACT } from "../ActionTypes";

export const contactReducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_CONTACT:
            return {
                isLoading: false,
                contact: state.contact.concat(action.payload),
                error: null
            }
        case GET_CONTACT:
            return {
                isLoading: false,
                contact: action.payload,
                error: null
            }
        case DELETE_CONTACT:
            return {
                isLoading: false,
                contact: state.contact.filter(contact => contact.id !== action.payload),
                // contact: state.contact.filter((v) => v.contact.id !== action.payload),
                // facilities: state.facilities.filter((v) => v.id !== action.payload)
                error: null
            }
        default:
            return state;
    }
}