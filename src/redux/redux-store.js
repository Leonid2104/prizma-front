import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import dialogsPageR from "./dialogsPage-Reducer";
import profilePageR from "./profilePage-Reducer";
import usersReduser from "./users-reduser";
import likesPage from "./likes-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import newsReducer from "./news-reducer";
let reducers = combineReducers({
  dialogsPage : dialogsPageR,
  profilePage : profilePageR,
  usersPage : usersReduser,
  auth: authReducer,
  form : formReducer,
  news: newsReducer,
  likesPage:likesPage,
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;