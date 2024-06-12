import { createContext } from "react"

const initialState = {
    isLoading: false,
    shopcon: [],
    error: null
}

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shopReducer, initialState);

    //axios is used at here, by default making any names function.
    const shopCon = (val) => {
        console.log(val);

        const action = { type: "GET_SHOPCON", payload: val }

        dispatch(action);
    }

    return (
        <ShopContext.Provider value={{ ...state, shopCon }}>
            {children}
        </ShopContext.Provider>
    )
}