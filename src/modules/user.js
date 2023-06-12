import {createSlice} from '@reduxjs/toolkit'

const name = "user";
const initialState = {
  userList : [
    {
      login: false,
      id: "jinhye01",
      pw: "a1!0000",
      name : "김진혜",
      tel : "010-0000-0000",
      email: "vipisu_976@naver.com",
      post : "48710",
      restAdress: "부산광역시 동구 중앙대로 357",
      additionalAdress: "101동 5505호",
      cart: [],
      wishList:[],
      qnaComment: [],
      orderedProducts : [],
    },
  ]
}
;

export const user = createSlice({
  name,
  initialState,
  reducers: {
    signUp : (state, action)=>{
      const newUser = action.payload;
      const newUserList = state.userList.concat(newUser);
      state.userList = newUserList;
      console.log(state.userList);
    },
    signIn : (state, action)=>{
      const currentUser = action.payload;
      const stateCurrentUser= state.userList.find((user)=>(user.id==currentUser.id && user.pw==currentUser.pw));
      stateCurrentUser.login = true;
    },
    signOut : (state, action)=>{
      const currentUser = action.payload;
      const stateCurrentUser= state.userList.find((user)=>(user.id==currentUser.id && user.pw==currentUser.pw));
      stateCurrentUser.login = false;
    },
    changeCart : (state, action) => {
      const parseCartState = action.payload;
      console.log(parseCartState)
      console.log(parseCartState[0].id);
      if(parseCartState[0]){
        const sameUser = state.userList.find((user)=>(user.id == parseCartState[0].id));
        console.log(sameUser);
        console.log(parseCartState[0].id);
        sameUser.cart = parseCartState;
      }
    },
    changeUserInfo : (state, action) => {
      const currentUser = action.payload;
      const stateCurrentUser= state.userList.find((user)=>(user.id==currentUser.id && user.pw==currentUser.pw));
      stateCurrentUser.name = currentUser.name;
      stateCurrentUser.id = currentUser.id;
      stateCurrentUser.pw = currentUser.pw;
      stateCurrentUser.tel = currentUser.tel;
      stateCurrentUser.email = currentUser.email;
      stateCurrentUser.post = currentUser.post;
      stateCurrentUser.restAdress = currentUser.restAdress;
      stateCurrentUser.additionalAdress = currentUser.additionalAdress;
    },
    buyCheckedProduct : (state, action) => {
      const purchaseArray = action.payload;
      console.log(purchaseArray);
      const sameUser = state.userList.find((user)=>(user.id == purchaseArray[0].id));
      console.log(sameUser);
      sameUser.orderedProducts = purchaseArray;
    },
    limitReview : (state, action) => {
      const reviewInfo = action.payload;
      console.log(reviewInfo);
      const sameUser = state.userList.find((user)=>(
        user.id == reviewInfo.currentUser
      ))
      console.log(sameUser)
      const sameReview = sameUser.orderedProducts.find((r)=>(
        r.myPageId == reviewInfo.myPageId
      ))
      console.log(sameReview.isReviewed)
      sameReview.isReviewed = true;
      console.log(sameReview.isReviewed)
    },
  }
})

export const {signUp, signIn, signOut, changeCart, changeUserInfo, buyCheckedProduct, limitReview} = user.actions;

export default user.reducer;