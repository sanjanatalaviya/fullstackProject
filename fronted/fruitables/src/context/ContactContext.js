import { createContext, useReducer } from "react";
import { ADD_CONTACT, DELETE_CONTACT, GET_CONTACT, UPDATE_CONTACT } from "./ActionTypes";
import axios from "axios";
import { contactReducer } from "./reducer/contact.reducer";
import { baseURL } from "../utils/baseURL";

const initialState = {
    isLoading: false,
    contact: [],
    error: null
}

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContacts = async (data) => {
        const response = await axios.post(baseURL + "contact", data);
        dispatch({ type: ADD_CONTACT, payload: response.data })
    }

    const getContacts = async (data) => {
        const response = await axios.get(baseURL + "contact");
        dispatch({ type: GET_CONTACT, payload: response.data })
    }

    const deleteContacts = async (id) => {
        const response = await axios.delete(baseURL + "contact", id)
        dispatch({ type: DELETE_CONTACT, payload: response.data })
    }

    const updateContacts = async (data, id) => {
        const response = await axios.put(baseURL + "contact", data, id)
        dispatch({ type: UPDATE_CONTACT, payload: response.data })
    }

    return (
        <ContactContext.Provider
            value={{ ...state, addContacts, getContacts, deleteContacts, updateContacts }}>
            {children}
        </ContactContext.Provider >
    )

}