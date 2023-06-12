import cart from './modules/cart';
import mainComment from './modules/mainComment';
import mainState from './modules/mainState'
import user from './modules/user';
import myPage from './modules/myPage';
import mainReview from './modules/mainReview';
import recentBox from './modules/recentBox';
// redux
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
// redux persist
import storageSession from 'redux-persist/lib/storage/session'
import {persistReducer} from 'redux-persist'

const reducers = combineReducers({
    cart: cart,
    mainState: mainState,
    mainComment: mainComment,
    user: user,
    myPage: myPage,
    mainReview: mainReview,
    recentBox: recentBox
})

const persistConfig = {
  key : "root",
  storage : storageSession,
  list : ["cart", "mainState", "pinkComment", "user", "myPage", "mainReview", "recentBox"], 
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer : persistedReducer
})

export default store;