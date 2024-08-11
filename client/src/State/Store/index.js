import { configureStore } from '@reduxjs/toolkit';

import problemsReducer from '../Slices/problemsSlice';
import userReducer from '../Slices/userSlice';

const store = configureStore({
    reducer: {
        problems: problemsReducer,
        user: userReducer,
    }
});

export default store;