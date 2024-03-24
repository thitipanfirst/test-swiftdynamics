import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import ItemSlice from './itemSlice/itemSlice'

export const store = configureStore({
    reducer: {
        itemSlice: ItemSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
