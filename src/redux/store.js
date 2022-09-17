import { configureStore } from "@reduxjs/toolkit";
import textSliceReducer from "./textSlice";

export const store = configureStore({
    reducer: {
        text: textSliceReducer
    }
})