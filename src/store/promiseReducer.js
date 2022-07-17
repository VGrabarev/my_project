import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GQL } from "../constants/index.js";

let adFind = createAsyncThunk(
    "promise/adFind",
    async function({_id, search = "", limit = 8}, {getState}) {
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
);

let adFindById = createAsyncThunk(
    "promise/adFindById",
    async function({_id}) {
        let result = await GQL(`query adFindById($query: String) {
            AdFindOne(query: $query) {
              _id createdAt title description address price tags
              owner {
                _id login createdAt
                avatar {
                  _id url
                }
              }
              images {
                _id url
              }
              comments {
                _id text createdAt
                owner {
                  _id login
                  avatar {
                    _id url
                  }
                }
              }
            }
          }`, {
              query: JSON.stringify([{"_id": _id}])
            });

      return result;
    }
);

let promiseSlice = createSlice({
    name: "promise",
    initialState: {
        adArr: [],
        skip: 0,
        adFindPending: false,
        adFindById: {images: [], tags: [], comments: []}
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
        },
        [adFindById.fulfilled]: (state, action) => {
            state.adFindById = action.payload;
        }
    }
});

let promiseReducer = promiseSlice.reducer;

let { clearAd } = promiseSlice.actions;

export { promiseReducer, adFind, clearAd, adFindById };