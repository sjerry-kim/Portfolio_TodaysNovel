import {createSlice} from '@reduxjs/toolkit'

const name = "cart";
const initialState = [];

export const cart = createSlice({
  name,
  initialState,
  reducers :{
    addItem: (state, action) => {
      state.push(action.payload);
      console.log(state)
    },
    deleteItem : (state, action) => {
      return state.filter((item) => (
        item.itemId !== action.payload
      ))
    },
    incrementItem : (state, action) => {
      let num = state.find((item)=>item.itemId === action.payload.itemId)
      num.itemTotalCount ++;
    },
    decrementItem : (state, action) => {
      let num = state.find((item)=>item.itemId === action.payload.itemId)
      if(num.itemTotalCount>1){
        num.itemTotalCount --;
      }
    },
    checkItem : (state, action) => {
      const checkedProduct = state.find((item)=>(
      item.itemId === action.payload.itemId
      ))
      checkedProduct.isChecked = !checkedProduct.isChecked;
      if(!checkedProduct.isChecked){
        checkedProduct.itemTotalCount = 0;
        console.log(checkedProduct.isChecked)
      }else{
        checkedProduct.itemTotalCount = 1;
        console.log(checkedProduct.isChecked)
      }
    },
    checkAllItem : (state, action) => {
      const isChecked = action.payload;
      state.forEach(item => {
        item.isChecked = isChecked;
      })
      if(isChecked === false){
        state.forEach(item=>{
          item.itemTotalCount = 0;
        })
      }else{
        state.forEach(item=>{
          item.itemTotalCount = 1;
        })
      }
    },
    deleteCheckedItem : (state) =>{
      return state.filter(item => !item.isChecked)
    },
    EmptyCart : (state) => {
      return (state = []);
    },
    ChangeCartId : (state, action) =>{
      state.forEach((p)=>{p.id = action.payload})
    }
  }
})

export const {addItem, deleteItem, incrementItem, decrementItem, checkItem, checkAllItem, deleteCheckedItem, EmptyCart, ChangeCartId} = cart.actions;

export default cart.reducer;