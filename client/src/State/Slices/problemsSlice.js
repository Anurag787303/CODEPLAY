import { createSlice } from '@reduxjs/toolkit';

const problemsSlice = createSlice({
    name: 'problems',
    initialState: {
        problems: [],
    },
    reducers: {
        addProblem: (state, action) => {
            state.problems.push(action.payload);
        },
    },
});

export const { addProblem } = problemsSlice.actions;
export default problemsSlice.reducer;