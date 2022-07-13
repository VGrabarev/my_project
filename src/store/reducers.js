import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GQL, jwtDecode } from "../constants/index.js";

let userFullLogin = createAsyncThunk(
    "authentication/userFullLogin",
    async function({login, password}, {dispatch}) {
        let token = await GQL(`query userLogin($login: String!, $password: String!) {
            login(login: $login, password: $password)
            }`, {
                "login": login,
                "password": password
            });

        dispatch(userLogin(token));
    }
);

let userFullRegister = createAsyncThunk(
    "authentication/userFullRegister",
    async function({login, password}, {dispatch, getState, rejectWithValue}) {
        try {
            let result = await GQL(`mutation newUser($login: String!, $password: String!) {
                createUser(login: $login, password: $password) {
                    _id login
                }
                }`,
                {
                "login": login,
                "password": password
                });
            

            if(result) {
                dispatch(userFullLogin({login, password}));
            } else {
                throw new Error("RegisterError");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

let authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        payload: {},
        registerFailed: false,
    },
    reducers: {
        userLogin(state, action) {
            localStorage.authToken = action.payload;
            state.payload = jwtDecode(action.payload);
            state.registerFailed = false;
        },
        aboutMe(state) {
            if(localStorage?.authToken) {
                state.payload = jwtDecode(localStorage?.authToken);
            }
        }
    },
    extraReducers: {
        [userFullRegister.rejected]: (state) => {
            state.registerFailed = true;
        }
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

let {languageToggle, themeToggle} = siteSettingsSlice.actions;
let {userLogin, aboutMe} = authenticationSlice.actions;

export {siteSettingsReducer, 
        authenticationReducer, 
        languageToggle, 
        themeToggle,
        userFullLogin,
        userFullRegister,
        aboutMe};