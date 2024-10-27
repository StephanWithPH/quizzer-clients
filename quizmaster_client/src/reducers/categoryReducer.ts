import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (_, action) => {
            return [...action.payload];
        }
    }
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
