import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { userReducer } from "./userReducer";
import { confettiReducer } from "./react-confetti-redux";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URI

export const Store = configureStore({
    reducer: {
        user: userReducer,
        confetti: confettiReducer
    },
    devTools: false
})