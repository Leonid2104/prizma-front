import  {loginAPI, profileAPI} from "../api/api";
const SET_USER_DATA = 'SET_USER_DATA'
const SET_TRUE = 'SET_TRUE'
const SET_AUTH = 'SET_AUTH'
let inicialState = {   
  userId: null,
  email : null,
  login: null,
  token: '',
  isAuth : null,
  isTrue : true
  
}
const authReducer = (state = inicialState, action)=> {
    
    switch(action.type){
      case SET_USER_DATA:
        return{
          ...state,
          email: action.data.email,
          userId: action.data.userId,
          isAuth : true
          }
      case SET_AUTH:
        return{
          ...state,
          isAuth : action.value
          }
      case SET_TRUE:
        return{
          ...state,
          isTrue: action.value
        }
      default:
        return state;
    }
  }
  
  
export const setUserData = (userId,email) => ({type: SET_USER_DATA, data: {userId,email}})
export const setTrue = (value) => ({type: SET_TRUE, value})
export const setIsAuth = (value) => ({type: SET_AUTH, value})
export const getUserData =  (email,password) => {
  
  return (dispatch)=>{
    loginAPI.loginUser(email,password).then(response=>{
      debugger
    
      dispatch(getCock())
      dispatch(setTrue(true))
    }).catch(err =>{
      dispatch(setTrue(false))
   
      
    }

    )}
  
}
export const registrationProfile = (email,password,name) =>{
  return (dispatch) => {
    loginAPI.registration(email,password,name).then(response => {
      dispatch(getCock())
      dispatch(setTrue(true))
    }).catch(err => {
    })
  }
}
export const addName = (text) => {
  return(dispatch) => {
    loginAPI.addUserName(text).then(response => {
      debugger
    }).catch(err => {
      debugger
    })
  }
}

export const getCock = () =>{
  return (dispatch) => {
    loginAPI.getCoock().then(response=>{
      debugger
        if(response.data != false){

          dispatch(setUserData(response.data.id,response.data.email))
        }else{
      
          dispatch(setIsAuth(false))
        }
      } )

  }
}
export default authReducer;