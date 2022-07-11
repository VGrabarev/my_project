import { configureStore } from "@reduxjs/toolkit";
import { siteSettingsReducer, authenticationReducer } from "./reducers.js";

let store = configureStore({
    reducer: {
        auth: authenticationReducer,
        siteSettings: siteSettingsReducer
    }
})

store.subscribe(() => console.log(store.getState()));

export default store;