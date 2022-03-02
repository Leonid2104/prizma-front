import API from "../api/api"

const SET_LIKES = "SET_LIKES"
const SET_FETCH = "SET_FETCH"
const FOLLOWING = "FOLLOWING"
let inicialState = {
  likes: null,
  fetch: false,
}

const likesPage = (state = inicialState, action) =>{
  switch(action.type){
    case SET_LIKES:
      return{
        ...state,likes: action.data,fetch: false
      }
    case SET_FETCH:
      return{
        ...state,fetch: true
      }
    case FOLLOWING:
      
      let i = 0
      let fol
      for(let it of state.likes){
        if (it.userInf.id === action.id){
          fol = !it.followed
          break
        }
        i++
      }
      const likes = state.likes.slice()
      likes[i].followed = fol
      return{
        ...state,likes:likes
      }
    default:
      return {...state}
  }
}

export const setLikes = (data) => ({type:SET_LIKES, data})
export const setFetch = () => ({type:SET_FETCH})
export const setFollowingLikes = (id) => ({type:FOLLOWING,id})



export const getLikes = () =>{
  setFetch()
  return (dispatch) => {
    API.getLikes().then(response => {
      dispatch(setLikes(response.data))
    }).catch(err => {
      
    })
  }
}
export default likesPage;