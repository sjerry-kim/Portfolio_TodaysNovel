import { createSlice } from "@reduxjs/toolkit";

const name = "mainReview";
const initialState = [
  {
    itemId: 2,
    reviewId: 0,
    userId: "아무개",
    userName: "아무개",
    rate: 4,
    text: "재밌어요",
    date: "2023-04-12",
    rate: 3,
  },
  {
    itemId: 2,
    reviewId: 1,
    userId: "testUser",
    userName: "testUser",
    rate: 4,
    text: "감동적이에요.",
    date: "2023-04-13",
    rate: 5,
  },
  {
    itemId: 2,
    reviewId: 2,
    userId: "카카",
    userName: "카카",
    rate: 4,
    text: "내용이 어려워요",
    date: "2023-04-14",
    rate: 3,
  },
  {
    itemId: 2,
    reviewId: 3,
    userId: "카카발싸개",
    userName: "카카발싸개",
    rate: 4,
    text: "그저그래요",
    date: "2023-04-14",
    rate: 3,
  },
  {
    itemId: 2,
    reviewId: 4,
    userId: "꼬순내",
    userName: "꼬순내",
    rate: 5,
    text: "너무 잘 봤어요",
    date: "2023-04-15",
    rate: 5,
  },
  {
    itemId: 2,
    reviewId: 5,
    userId: "갱얼쥐",
    userName: "갱얼쥐",
    rate: 5,
    text: "매우 감동적입니다!",
    date: "2023-04-16",
    rate: 2,
  },
];

export const mainReview = createSlice({
  name,
  initialState,
  reducers: {
    addReview: (state, action) => {
      const review = action.payload;
      state.push(review);
      console.log(review);
    },
    deleteReview: (state, action) => {
      return state.filter((r) => r.reviewId !== action.payload.reviewId);
    },
    modifyReview: (state, action) => {
      const review = action.payload;
      const sameUser = state.filter((r) => r.userId == review.userId);
      console.log(sameUser.reviewId);
      console.log(typeof sameUser);
      const sameReview = sameUser.find((r) => r.reviewId == review.reviewId);
      sameReview.text = review.text;
    },
  },
});

export const { addReview, deleteReview, modifyReview } = mainReview.actions;

export default mainReview.reducer;
