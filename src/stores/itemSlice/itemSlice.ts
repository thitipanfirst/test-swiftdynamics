import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface DrawerState {
    username: string;
}

const initialState: DrawerState = {
    username: '',
};

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
    },
});

export const { setUsername } = itemSlice.actions

export default itemSlice.reducer

