import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GQL, uploadFile } from "../constants/index.js";

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

let adFindOnlyTitle = createAsyncThunk(
  "promise/adFindOnlyTitle",
  async function({search, limit = 10}) {
    let result = await GQL(`query userAdFindById($query: String) {
      AdFind(query: $query) {
          _id title
        }
      }`, {
      query: JSON.stringify([{$or:[{title: `/${search}/`}, {description: `/${search}/`}]},
                              {"sort": [{"_id": -1}],
                              "limit": [limit]}])});

    return result;
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

let changeAvatar = createAsyncThunk(
  "promise/changeAvatar",
  async function({file, id}, {dispatch}) {
    let res = await uploadFile(file);

    let result = await GQL(`mutation newAvatar($user: UserInput) {
        UserUpsert(user: $user) {
          _id, avatar {
            _id
          }
        }
      }`, {
        user: {_id: id, avatar: {_id: res._id}}
      });

    dispatch(aboutUserById({_id: id}));

    return result;
  }
);

let newComment = createAsyncThunk(
  "promise/newComment",
  async function({text, adId, answerToId}, {dispatch}) {
    let result = await GQL(`mutation newComment($text: String, $adId: ID, $answerToId: ID) {
        CommentUpsert(comment: {text: $text, ad: {_id: $adId}, answerTo: {_id: $answerToId}}) {
          _id
        }
      }`, {
        text: text,
        adId: adId,
        answerToId: answerToId
      });

    dispatch(adFindById({_id: adId}));
  }
)

let aboutUserById = createAsyncThunk(
  "promise/aboutUserById",
  async function({_id}) {
    let result = await GQL(`query aboutUser($query:String) {
        UserFindOne(query: $query) {
          _id createdAt login nick phones addresses
          avatar {
            _id url
          }
          incomings {
            _id createdAt text
            image {
              _id url
            }
            to {
              _id login
            }
            owner {
              _id login
              avatar {
                _id url
              }
            }
          }
        }
      }`, {
        query: JSON.stringify([{"___owner": _id}])
      });

    return result;
  }
)

let uploadFiles = createAsyncThunk(
  "promise/uploadFiles",
  async function({files}) {
    let result = await Promise.all(files.map(file => uploadFile(file)));

    return result;
  }
);

let saveAdState = createAsyncThunk(
  "promise/saveAdState",
  async function({state}) {
    let result = await GQL(`mutation newAd($ad: AdInput) {
        AdUpsert(ad: $ad) {
          _id
        }
      }`, {
        ad: {...state, images: state.images.map(imag => ({_id: imag._id}))}
      })

    return result;
  }
);

let promiseSlice = createSlice({
    name: "promise",
    initialState: {
        adArr: [],
        skip: 0,
        adFindPending: false,
        adFindById: {images: [], tags: [], comments: []},
        userFindById:  {},
        changeAvatar: {},
        uploadFiles: [],
        saveAdState: {},
        adFindTitleOnlyArr: []
    },
    reducers: {
        clearAd(state) {
            state.adArr = [];
            state.skip = 0;
        },
        clearAdFindTitleOnly(state) {
          state.adFindTitleOnlyArr = [];
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
        },
        [aboutUserById.fulfilled]: (state, action) => {
          state.userFindById = action.payload;
        },
        [changeAvatar.fulfilled]: (state, action) => {
          state.changeAvatar = action.payload;
        },
        [uploadFiles.fulfilled]: (state, action) => {
          state.uploadFiles = action.payload;
        },
        [saveAdState.fulfilled]: (state, action) => {
          state.saveAdState = action.payload;
        },
        [adFindOnlyTitle.fulfilled]: (state, action) => {
          state.adFindTitleOnlyArr = action.payload;
        }
    }
});

let promiseReducer = promiseSlice.reducer;

let { clearAd, clearAdFindTitleOnly } = promiseSlice.actions;

export { promiseReducer, 
         adFind, 
         clearAd, 
         adFindById, 
         newComment, 
         aboutUserById, 
         changeAvatar, 
         uploadFiles, 
         saveAdState,
         adFindOnlyTitle,
         clearAdFindTitleOnly };