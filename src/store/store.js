import { configureStore } from "@reduxjs/toolkit";
import berandaReducer from "./reducer/BerandaReducer";
import detailReducer from "./reducer/detailReducer";
import themeReducer from "./reducer/themeReducer";


export const store = configureStore({
    reducer: {
        beranda: berandaReducer,
        detail: detailReducer,
        theme: themeReducer,
    }
})

export default store;