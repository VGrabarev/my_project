import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GQL } from "../constants/index.js";

let authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        payload: {}
    },
    reducers: {

    },
    extraReducers: {

    }
});

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
let authenticationReducer = authenticationSlice.reducer;

export let {languageToggle, themeToggle} = siteSettingsSlice.actions;
export {siteSettingsReducer, authenticationReducer};