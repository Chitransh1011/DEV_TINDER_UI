import { createSlice } from '@reduxjs/toolkit'

export const requestSlice = createSlice({
  name: 'requests',
  initialState:null,
  reducers: {
    addRequest:(state,action)=>{
        return action.payload;
    },
   
  },
})

export const { addRequest } = requestSlice.actions

export default requestSlice.reducer