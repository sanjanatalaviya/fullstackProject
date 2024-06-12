import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./reducer"
import { thunk } from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const configStore = () => {

    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['facilities', 'review', 'productes', 'coupon']
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)

    return { store, persistor }
}