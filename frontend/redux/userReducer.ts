import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
    token: "",
    loading: false
}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase("LOAD_USER", (state, action: any) => {
        state.loading = false,
            state.user = action.payload.user,
            state.token = action.payload.token
    })
})