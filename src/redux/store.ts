import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cartSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer,FLUSH , REHYDRATE, PAUSE, PERSIST , PURGE , REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

function createPersistStorage() : WebStorage {
    const isServer = typeof window === 'undefined' //check ว่าเป็นฝั่ง server
    if(isServer){
        return{
            getItem(key){
                return Promise.resolve(null)
            },
            setItem(){
                return Promise.resolve()
            },
            removeItem(){
                return Promise.resolve()
            }
        }
    }
    return createWebStorage('local')
}

const storage = createPersistStorage()

const persistConfig = {
    key: 'rootPersist',
    storage
}

const rootReducer = combineReducers({cartSlice : cartSlice.reducer})
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    
        reducer: reduxPersistedReducer,
        middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE , PAUSE,PERSIST ,PURGE, REGISTER]
            },
        })
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector