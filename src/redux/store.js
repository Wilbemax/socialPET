import { configureStore } from "@reduxjs/toolkit";
import { postReducers } from "./slices/posts.js";
import { authReducer } from "./slices/auth.js";

const store = configureStore({
  reducer: {
    posts: postReducers,
    auth: authReducer,
  },
});

export default store;
