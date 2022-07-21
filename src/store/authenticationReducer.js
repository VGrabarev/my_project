import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GQL, jwtDecode } from "../constants/index.js";

let userFullLogin = createAsyncThunk(
    "authentication/userFullLogin",
    async function({login, password}, {dispatch, rejectWithValue}) {
        try {
            let token = await GQL(`query userLogin($login: String!, $password: String!) {
                login(login: $login, password: $password)
                }`, {
                    "login": login,
                    "password": password
                });
    
            if(token) {
                dispatch(userLogin(token));
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
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
        };
    }
);

let changePassword = createAsyncThunk(
    "authentication/changePassword",
    async function({login, password, newPassword}, {dispatch, rejectWithValue}) {
      try {
        let result = await GQL(`mutation userChangePassword($login: String!, $password: String!, $newPassword: String!) {
          changePassword(login: $login, password: $password, newPassword: $newPassword) {
            _id login
          }
        }`, {
            "login": login,
            "password": password,
            "newPassword": newPassword
        });
  
        if(result) {
          dispatch(userFullLogin({login: login, password: newPassword}))
        } else {
          throw new Error("Change Password Error")
        };
      } catch (error) {
        return rejectWithValue(error.message);
      };
    }
  );

let authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        payload: localStorage?.authToken ? jwtDecode(localStorage?.authToken) : {},
        registerFailed: false,
        loginFailed: false
    },
    reducers: {
        userLogin(state, action) {
            localStorage.authToken = action.payload;
            state.payload = jwtDecode(action.payload);
            state.registerFailed = false;
            state.loginFailed = false;
        },
        userLogout(state) {
            localStorage.removeItem("authToken");
            state.payload = {};
        }
    },
    extraReducers: {
        [userFullLogin.rejected]: (state) => {
            state.loginFailed = true;
        },
        [userFullRegister.rejected]: (state) => {
            state.registerFailed = true;
        }
    }
});

let authenticationReducer = authenticationSlice.reducer;

let { userLogin, aboutMe, userLogout } = authenticationSlice.actions;

export { authenticationReducer, aboutMe, userLogout, userFullLogin, userFullRegister, changePassword };