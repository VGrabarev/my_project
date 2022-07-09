import { configureStore } from "@reduxjs/toolkit";
import { siteSettingsReducer } from "./reducers.js";

let store = configureStore({
    reducer: {
        siteSettings: siteSettingsReducer
    }
})

store.subscribe(() => console.log(store.getState()));

export default store;