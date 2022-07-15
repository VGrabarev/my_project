import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GQL } from "../constants/index.js";

let adFind = createAsyncThunk(
    "promise/adFind",
    async function({_id, search = "", limit = 5}, {getState}) {
        let result = await GQL(`query userAdFindById($query: String) {
            AdFind(query: $query) {
                _id title price createdAt images {
                _id url
                }
            }
            }`, {
            query: JSON.stringify([{"___owner": _id,
                                    $or:[{title: `/${search}/`}, {description: `/${search}/`}]},
                                    {"sort": [{"_id": -1}],
                                    "skip": [getState().promise.skip],
                                    "limit": [limit]}])});
        
        return {result, limit};
    }
)

let promiseSlice = createSlice({
    name: "promise",
    initialState: {
        adArr: [],
        skip: 0,
        adFindPending: false
    },
    reducers: {
        clearAd(state) {
            state.adArr = [];
            state.skip = 0;
        }
    },
    extraReducers: {
        [adFind.fulfilled]: (state, action) => {
            state.adArr.push(...action.payload.result);
            state.skip = state.skip + action.payload.limit;
            state.adFindPending = false;
        },
        [adFind.pending]: (state) => {
            state.adFindPending = true;
        }
    }
});

let promiseReducer = promiseSlice.reducer;

let { clearAd } = promiseSlice.actions;

export { promiseReducer, adFind, clearAd };