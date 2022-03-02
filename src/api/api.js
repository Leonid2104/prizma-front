import axios from "axios"
import { getCock, setToken } from "../redux/auth-reducer"
const instance = axios.create({
  baseURL : process.env.REACT_APP_API_URL,
  withCredentials:true,
  trueresponseType: "json",
  credentials: "include",
})



const API = {
sendMessages(id,text){
  return instance.post(`messages/${id}`,{
    text:text
  })
},
getMessages(id){
  return instance.get(`/messages/${id}`)
},
getUsers(){
  
  return instance.get("/users")

},
getLikes(){
  return instance.get('/likes')
},
like(postId){
  return instance.post(`/likes/${postId}`)
},
delLike(postId){
  return instance.delete(`/likes/${postId}`)
},
followAPI(id){
  return instance.post(`/follow/${id}`)
},
unfollowAPI(id){
  
  return instance.delete(`/follow/${id}`)
},
getProfile(id){

  
  return instance.get(`/users/${id}`)
},
/*getCock(){
  return instanse.get('auth/me')   
}*/
}
export const dialogsAPI = {
  getChats(){
    return instance.get('/dialogs')
  },
  addChats(id){
    return instance.post(`/dialogs/${id}`)
  }

}
export const loginAPI  ={
addUserName(name){
  return instance.put('/user/name',{
    userName: name,
  })
},
loginUser(email = '',password = ''){
  return instance.post('/user/login',{
    email: email,
    password:password,
  })
},
getCoock(){
  return instance.get('/user/auth')
},
registration(email,password,userName){
  return instance.post('user/registration',{
    email: email,
    password:password,
    userName:userName,
  })
}
}
export const profileAPI = {
deletePost(id){
  return instance.delete(`/posts/${id}`)
},
uploadPostImage(file,id){
  const formData = new FormData()
  formData.append('file',file)
  return instance.post(`/posts/UploadImg/${id}`,formData)
},
uploadAvatar(file){
  const formData = new FormData()
  formData.append('file',file)
  return instance.post(`/avatar/upload`,formData)
},
getAvatar(id){
  return instance.get(`/avatar/download/${id}`)
},
getPosts(id){
  return instance.get(`/posts/${id}`)
},
addPosts(text){

  return instance.post(`/posts`,{text:text})
  
},
getNews(){
  return instance.get('/posts/news/news')
},
getProfile(id){
 
  return 0
},
getStatus(id){
  return instance.get(`/users/${id}`)
},
updateStatus(status){
  return instance.put(`/user/status`,{text:status})
}
}
export default API;