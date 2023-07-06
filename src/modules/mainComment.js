import { createSlice } from "@reduxjs/toolkit";

const name = "mainComment";
const initialState = [
  {
    productId: 2,
    commentId: 0,
    commentText: "재밌어요!",
    userName: "testUser",
    userId: "testUSer",
  },
];

export const mainComment = createSlice({
  name,
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
    },
    deleteComment: (state, action) => {
      return state.filter((c) => c.commentId !== action.payload.commentId);
    },
  },
});

export const { addComment, deleteComment } = mainComment.actions;

export default mainComment.reducer;
