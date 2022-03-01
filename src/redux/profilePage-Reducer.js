import API,{profileAPI } from "../api/api"
import imgToFile from '../imgToFile/imgToFile'

const ADD_POST = "ADD-POST";
const DEL_POST = "DEL-POST";
const SET_FOLLOWED = "SET_FOLLOWED";
const ADD_LOADING = "ADD_LOADING";
const DEL_LOADING = "DEL_LOADING";
const ADD_POST_IMAGE ="ADD_POST_IMAGE";
const ADD_POST_TEXT = "ADD_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_POST = "SET_POST";
const SET_NEW_LIKE = "SET_NEW_LIKE";
const SET_CAND_AVATAR ="SET_CAND_AVATAR";
const SET_AVATAR = "SET_AVATAR"
let inicialState = {
  inputText: '',
  myAvatar: null,
  candidateAvatarFile:null,
  candidateAvatar:null,
  candidatePostImage:null,
  isLoading:0,
  posts: [
    {id : 1, txt : "Hi, how are you?", likes : 15,oneUserId:1,liked: false,linkToPhoto:null},
    {id : 2, txt : "It's my first post", likes : 115, oneUserId:1,liked: false,linkToPhoto:null},
    {id : 3, txt : "It's my second post", likes : 12, oneUserId:1,liked: false,linkToPhoto:null},
    {id : 4, txt : "Ha", likes : 10, oneUserId:1,liked: false}
  ],
  profile: {
    userId:null,
  },
  status: ''
}
const profilePageR = (state = inicialState, action)=> {
  if (action.type === ADD_POST){
    return{
      ...state, 
      candidatePostImage:null,
      inputText:'',
    }
  }else if (action.type === ADD_LOADING){
    let count = state.isLoading + 1
    return{
      ...state,
      isLoading:count
    }}else if (action.type === DEL_POST){
      let i = 0;
      let pId
      state.posts.map(postEl => {
        if(postEl.id === action.id){
          pId = i
        }
        i+=1
      })
      let arr_1 = state.posts.slice(0,pId)
      let arr_2 = state.posts.slice(pId+1, state.posts.length)
      return{
      ...state,
      posts: arr_1.concat(arr_2)
    }
   }else if (action.type === DEL_LOADING){
    let count = state.isLoading - 1
    return{
      ...state,
      isLoading:count
    }}else if (action.type === SET_POST){
    return{
      ...state,
      posts: action.posts
    }}else if (action.type === SET_FOLLOWED){
    const followed = !state.profile.followed
    return{
      ...state, profile: {...state.profile,followed:followed}
    }}else if (action.type === ADD_POST_IMAGE){
    return{
      ...state,
      candidatePostImage:action.file
    }}else if (action.type === ADD_POST_TEXT){
    return{
      ...state,
      inputText: action.text
    }}else if (action.type === SET_CAND_AVATAR){
    return{
      ...state,
      candidateAvatar: URL.createObjectURL(action.file), candidateAvatarFile:(action.file)
    }}else if (action.type === SET_AVATAR){
      if(!action.ava){
        return{
        ...state,
        myAvatar: state.candidateAvatar
      }}else{return{
        ...state,
        myAvatar: action.ava}
    }}else if (action.type === SET_USER_PROFILE){
    return{
      ...state, profile : action.profile
    }
  }else if (action.type === SET_STATUS){
    return{
      ...state, status : action.status
    }
  }else{
    return state;
  }
  
}
export const addPostActionCreater = () =>({type: ADD_POST})
export const delPostActionCreater = (id) =>({type: DEL_POST, id})
export const addLoading = () =>({type: ADD_LOADING})
export const delLoading = () =>({type: DEL_LOADING})
export const addPostText = (text) =>({type: ADD_POST_TEXT, text})
export const addPostImage = (file) =>({type: ADD_POST_IMAGE, file})
export const setPostActionCreater = (posts) =>({type: SET_POST, posts})
export const setNewLike = (pId) => ({type:SET_NEW_LIKE,pId})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const setFollowed = () => ({type: SET_FOLLOWED})
export const setCandAvatar = (file) => ({type: SET_CAND_AVATAR, file})
export const setUserProfile = (profile) => ({type:SET_USER_PROFILE, profile});
export const setAvatar = (ava = null) => ({type: SET_AVATAR, ava})
export const getUserProfile = (userId) => (dispatch) => {
  dispatch(addLoading())
  API.getProfile(userId).then(response =>{ 
    dispatch(setUserProfile(response.data))
    dispatch(delLoading())
  }).catch(err => {
    debugger
  })
}
export const getStatus = (userId) => (dispatch) => {
  dispatch(addLoading())
  profileAPI.getStatus(userId).then(response => {
    dispatch(setStatus(response.data.status))
    dispatch(delLoading())
  }).catch(err => {
    debugger
  }) 
}

export const getPosts = (userId) => (dispatch) => {
  dispatch(addLoading())
  profileAPI.getPosts(userId).then(response => {
    dispatch(setPostActionCreater(response.data))
    dispatch(delLoading())
  }).catch(err => {
    debugger
  })
}
export const getMyAvatar = (id) =>{
  return(dispatch) =>{
  dispatch(addLoading())
  profileAPI.getAvatar(id).then(response => {
    if(response.data != null){
      debugger
      let ava = `${process.env.REACT_APP_API_STATIC_URL}/avatars/${response.data}`
      dispatch(setAvatar(ava))  
    }
    dispatch(delLoading())
  }).catch(err => {
    
    dispatch(delLoading())
  })
}
}
export const updateAvatar = (file) => {
  return(dispatch) => {
    dispatch(addLoading())
    profileAPI.uploadAvatar(file).then(response =>{
      
      dispatch(delLoading())
    }).catch(err =>{
      dispatch(delLoading())
    })
  }
}

export const delPost = (id) => {
  return(dispatch) => {
    profileAPI.deletePost(id).then(response =>{
      dispatch(delPostActionCreater(id))
    })
  }
}
export const thunk_addPost = (file,text) => (dispatch) =>{
  if (text != '' && text){
  dispatch(addLoading())
  profileAPI.addPosts(text).then(response => {
    
    if(file){
      profileAPI.uploadPostImage(file,response.data.id).then(response => {
        debugger
        dispatch(addPostActionCreater())
        dispatch(delLoading())
      })
    }else{
      
     dispatch(addPostActionCreater())
     dispatch(delLoading())
    }
  }).catch(err =>{
    console.log(err)
    dispatch(delLoading())
  })}
  
  
}
export const updateStatus = (status) => (dispatch) => {
  dispatch(addLoading())
  profileAPI.updateStatus(status).then(response => {
    dispatch(setStatus(status))
    dispatch(delLoading())

  }).catch(err =>{
    console.log(err)
    dispatch(delLoading())
  })
}


export default profilePageR;