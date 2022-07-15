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
    async function({login, password}, {dispatch, rejectWithValue}) {
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
        payload: localStorage?.authToken ? jwtDecode(localStorage?.authToken) : {},
        registerFailed: false,
    },
    reducers: {
        userLogin(state, action) {
            localStorage.authToken = action.payload;
            state.payload = jwtDecode(action.payload);
            state.registerFailed = false;
        },
        userLogout(state) {
            localStorage.removeItem("authToken");
            state.payload = {};
        }
    },
    extraReducers: {
        [userFullRegister.rejected]: (state) => {
            state.registerFailed = true;
        }
    }
});

let authenticationReducer = authenticationSlice.reducer;

let { userLogin, aboutMe, userLogout } = authenticationSlice.actions;

export { authenticationReducer, aboutMe, userLogout, userFullLogin, userFullRegister };