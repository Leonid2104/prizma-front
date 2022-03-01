import { profileAPI } from "../api/api";

const SET_POSTS = 'SET_POSTS'
const SET_FETCHING = 'SET_FETCHING'

let inicialState = {
  posts:[],
  isFetching:0
}
const newsReducer = (state = inicialState, action)=> {
    
    switch(action.type){
      case SET_POSTS:
        let isFetch = state.isFetching
        return{...state,posts:action.posts}
      case SET_FETCHING:
        let isFetching = state.isFetching
        if(action.bool){
          isFetching += 1        
        }else{
          isFetching -= 1
        }
        return{...state,isFetching: isFetching}
      default:
        return state;
    }
  }

export const setNews = (posts) => ({type:SET_POSTS, posts})
export const setFetching = (bool) => ({type:SET_FETCHING,bool})


export const getNews = () =>{

  return (dispatch) =>{
    dispatch(setFetching(true))
    profileAPI.getNews().then(response => {
      dispatch(setNews(response.data))
      dispatch(setFetching(false))
    })
  }
}
export default newsReducer
  