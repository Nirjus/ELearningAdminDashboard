import { createReducer } from "@reduxjs/toolkit"
const initialState = {
    isOpen: false,
};
export const confettiReducer = createReducer(initialState, (builder) => {
    builder.addCase("CONFETTI_OPEN", (state) => {
        state.isOpen = true;
    })
    builder.addCase("CONFETTI_CLOSE", (state) => {
        state.isOpen = false;
    })
})