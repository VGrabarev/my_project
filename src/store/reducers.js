import { createSlice } from "@reduxjs/toolkit";

let siteSettings = createSlice({
    name: "siteSettings",
    initialState: {
        language: "ukr",
        theme: "light"
    },
    reducers: {
        languageToggle(state, action) {
            state.language = action.payload;
        },
        themeToggle(state, action) {
            action.payload ? state.theme = "dark" : state.theme = "light";
        }
    }
});

let siteSettingsReducer = siteSettings.reducer;

export let {languageToggle, themeToggle} = siteSettings.actions;
export {siteSettingsReducer};