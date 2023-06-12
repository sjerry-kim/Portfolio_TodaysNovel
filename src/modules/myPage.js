import {createSlice} from '@reduxjs/toolkit'

const name = "myPage";
const initialState = [];

export const myPage = createSlice({
  name,
  initialState,
  reducers :{
    addItem: (state, action) => {
      state.push(action.payload);
      console.log(state)
    }
  }
})

export const {addItem} = myPage.actions;

export default myPage.reducer;