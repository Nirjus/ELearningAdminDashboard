import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    course: undefined,
    loading: false
}

export const courseReducer = createReducer(initialState, (builder) => {
    builder.addCase("COURSE_CREATION", (state, action) => {
        state.loading = false
    })
})