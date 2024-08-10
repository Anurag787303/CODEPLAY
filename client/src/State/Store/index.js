import { configureStore } from '@reduxjs/toolkit';

import problemsReducer from '../Slices/problemsSlice';

const store = configureStore({
    reducer: {
        problems: problemsReducer,
    },
});

export default store;