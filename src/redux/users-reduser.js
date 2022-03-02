import  API  from "../api/api";
const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_NEW_LIKE = "SET_NEW_LIKE";
const SET_DEL_LIKE = "SET_DEL_LIKE";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_COUNT = "SET_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_HASH_ID = "SET_HASH_ID";
const SET_AVATAR_US = "SET_AVATAR_US"

let hashUserId = new Map()
let inicialState = {   
  users: [],
  hashUserId,
  pageSize : 7,
  totalUsersCount: 20 ,
  currentPage : 1,
  isFetching: false,
  followingInProgress : false
}
const usersReduser = (state = inicialState, action)=> {
    
    switch(action.type){
      case FOLLOW:
        return{
          ...state,
          users: state.users.map(u => {
            if(u.id === action.userId){
              
              return{...u,followed:true}
            }
            return u;
            
          })
        }
        
      case UNFOLLOW:

        return{
          ...state,
          users: state.users.map(u => {
            if(u.id === action.userId){
              return{...u,followed:false}
            }
            return u;
            
          })
        }
        
      case SET_USERS:
        
        return{
          
          ...state, users: action.users,totalUsersCount:action.users.length
        }
      case SET_AVATAR_US:
        
        let id = action.id
        let usersChange = state.users.slice()
        usersChange[id].avatar = action.avatar

        return{
          
          ...state, users: usersChange
        }
      case SET_HASH_ID:
        if (!state.hashUserId.get(action.globalId)){
        return{
          ...state, hashUserId: hashUserId.set(action.globalId,action.localId)
        }}
        return{
          ...state
        }
      case SET_CURRENT_PAGE:
        return{
          ...state,currentPage : action.currentPage
        }
      case SET_COUNT:
        return{
          ...state,totalUsersCount : action.count
          
        }
      case TOGGLE_IS_FETCHING:
        return{
          ...state,isFetching : action.isFetching
        }
      case TOGGLE_IS_FOLLOWING_PROGRESS:
        let uId = state.hashUserId.get(action.id)
        let us = state.users.slice()
        us[uId].isFetching = action.isFetching
        return {
          ...state,
          users: us

        }
      default:
        return state;
    }
    
  
  
}
export const follow = (userId)=> ({type: FOLLOW, userId})
export const unfollow = (userId)=> ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type:SET_USERS, users})
export const setHashId = (localId,globalId) => ({type:SET_HASH_ID, localId,globalId})
export const setCurrentPage = (currentPage) => ({type:SET_CURRENT_PAGE, currentPage})
export const setNewLike = (pId,uId) => ({type:SET_NEW_LIKE, pId,uId})
export const setDelLike = (pId,uId) => ({type:SET_DEL_LIKE, pId,uId})
export const setTotalUsersCount = (totalUsersCount) => ({type:SET_COUNT, count: totalUsersCount})
export const setIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
export const toggleIsFollowingProgress = (isFetching,id) => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching,id})
export const setUserAvatar =(avatar,id) => ({type: SET_AVATAR_US,id:id, avatar:avatar})
export const getUsersThunk = (currentPage,PageSize) => {
 
  return (dispatch) => {
    
    dispatch(setIsFetching(true));
    API.getUsers().then(response=>{
        dispatch(setIsFetching(false));
       
        let i = 0
        let users = response.data
        users.map(u => {
          dispatch(setHashId(i,u.id))
          u.isFetching = false
          u.uId = i
          i++
        }) 
        dispatch(setUsers(users));
        dispatch(setTotalUsersCount(response.data.length));
    
      } )
  }
}
export const setUserAvatarTh = (avatar,id)=>{

  return(dispatch) =>{
    
    dispatch(setUserAvatar(avatar,id))
  }
}
export const unfollowing = (id) => {
  return (dispatch) => {
    API.unfollowAPI(id).then(response=>{
          dispatch(toggleIsFollowingProgress(true,id))
         
          if (response.data === 'Good'){
            dispatch(unfollow(id))}
            dispatch(toggleIsFollowingProgress(false,id))
        })
  }
}
export const following = (id) => {
  return (dispatch) => {
  dispatch(toggleIsFollowingProgress(true,id))
        API.followAPI(id).then(response=>{
          if (response.data === 'Good'){
            dispatch(follow(id))}
            dispatch(toggleIsFollowingProgress(false,id))
        })
      }}
export const like  = (localPostId,postId) => (dispatch) => {
  API.like(postId).then(response => {
  
  }).catch(err =>{
    
  })
}
export const delLike  = (localPostId,postId) => (dispatch) => {
  API.delLike(postId).then(response => {
    
    
  }).catch(err =>{
    
  })
}
export default usersReduser;