import {createSlice} from '@reduxjs/toolkit'

const name = "recentBox";
const initialState = [];

export const recentBox = createSlice({
  name,
  initialState,
  reducers :{
    addRecentItem: (state, action) => {
      state.push(action.payload);
    },
    deleteRecentItem: (state, action) => {
    return state.filter((i)=>i.title != action.payload.title);
    }
  }
})

export const {addRecentItem, deleteRecentItem} = recentBox.actions;

export default recentBox.reducer;