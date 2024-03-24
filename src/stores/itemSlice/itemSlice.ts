import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from "dayjs";
interface DrawerState {
    nameTitle: string;
    name: string;
    lastName: string;
    birthDay: Dayjs | null;
    nationality: string;
    idCard: string[];
    gender: string;
    countryCode: string;
    tel: string;
    passport: string;
    expectedSalary: string;
    editData: boolean
    indexData: number | null
}

const initialState: DrawerState = {
    nameTitle: '',
    name: '',
    lastName: '',
    birthDay: null,
    nationality: '',
    idCard: ['', '', '', '', ''],
    gender: '',
    countryCode: '',
    tel: '',
    passport: '',
    expectedSalary: '',
    editData: false,
    indexData: null
};

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers: {
        CLEAR_FORM: (state) => {
            state.nameTitle = ''
            state.name = ''
            state.lastName = ''
            state.birthDay = null;
            state.nationality = ''
            state.idCard = ['', '', '', '', '']
            state.gender = ''
            state.countryCode = ''
            state.tel = ''
            state.passport = ''
            state.expectedSalary = ''
            state.indexData = null
        },
        SET_nameTitle: (state, action: PayloadAction<string>) => {
            state.nameTitle = action.payload
        },
        SET_name: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        SET_lastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload
        },
        SET_birthDay: (state, action: PayloadAction<Dayjs | null>) => {
            state.birthDay = action.payload
        },
        SET_nationality: (state, action: PayloadAction<string>) => {
            state.nationality = action.payload
        },
        SET_idCard: (state, action: PayloadAction<string[]>) => {
            state.idCard = action.payload
        },
        SET_gender: (state, action: PayloadAction<string>) => {
            state.gender = action.payload
        },
        SET_countryCode: (state, action: PayloadAction<string>) => {
            state.countryCode = action.payload
        },
        SET_tel: (state, action: PayloadAction<string>) => {
            state.tel = action.payload
        },
        SET_passport: (state, action: PayloadAction<string>) => {
            state.passport = action.payload
        },
        SET_expectedSalary: (state, action: PayloadAction<string>) => {
            state.expectedSalary = action.payload
        },
        SET_editData: (state, action: PayloadAction<boolean>) => {
            state.editData = action.payload
        },
        SET_indexData: (state, action: PayloadAction<number | null>) => {
            state.indexData = action.payload
        },
    },
});

export const { CLEAR_FORM, SET_indexData, SET_editData, SET_birthDay, SET_countryCode, SET_expectedSalary, SET_gender, SET_idCard, SET_lastName, SET_name, SET_nameTitle, SET_nationality, SET_passport, SET_tel } = itemSlice.actions

export default itemSlice.reducer

