import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./authenticationReducer.js";
import { siteSettingsReducer } from "./siteSettingsReducer.js";
import { promiseReducer } from "./promiseReducer.js";

let store = configureStore({
    reducer: {
        auth: authenticationReducer,
        siteSettings: siteSettingsReducer,
        promise: promiseReducer
    }
})

store.subscribe(() => console.log(store.getState()));

console.log(store.getState());

export default store;