import { createSlice } from '@reduxjs/toolkit'

export const feedSlice = createSlice({
  name: 'feed',
  initialState:null,
  reducers: {
    addFeed:(state,action)=>{
        return action.payload;
    },
    removeFeed:(state,action)=>{
        if (!state || !state.data) return state;
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload)
      };
    },
    clearFeed:(state,action)=>{
      return null;
    }
  },
})

export const { addFeed,removeFeed ,clearFeed} = feedSlice.actions

export default feedSlice.reducer