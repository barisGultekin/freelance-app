import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

import freelancerReducer from "../features/freelancerListSlice";
import freelancerDetailReducer from "../features/freelancerDetailSlice";
import themeReducer from "../features/themeSlice";

enableMapSet();

const store = configureStore({
  reducer: {
    freelancers: freelancerReducer,
    freelancerDetails: freelancerDetailReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;