import { createSlice } from "@reduxjs/toolkit";

let siteSettingsSlice = createSlice({
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

let siteSettingsReducer = siteSettingsSlice.reducer;

let {languageToggle, themeToggle} = siteSettingsSlice.actions;

export { siteSettingsReducer, languageToggle, themeToggle };