import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect"
import { setNews } from "../../redux/news-reducer"
import { getNews } from "../../redux/news-reducer"
import { getUsersThunk } from "../../redux/users-reduser"
import UserNews from "./UserNews/UserNews"
import Post from "../Profile/MyPosts/Post/Post"
import { useParams } from "react-router-dom"
import Preloader from "../common/Preloader/Preloader"
import s from './UserNews/News.module.css'
const NewsMemo = (props) => {
  const params = useParams()
  const dispatch = useDispatch()
  const fetchUser = useSelector(state => state.usersPage.isFetching)
  const fetch = useSelector(state => state.news.isFetching,(prevIt,it) =>{
    if(prevIt != it){
      return false
    }
  }) 

  const posts = useSelector(state => state.news.posts,(prevIt,it) =>{
    if(prevIt == it){
      return true
    }else{
      return false
    }
  }) 
  const users = useSelector(state => state.usersPage.users,(prevIt,it) =>{
    if(!prevIt.length){
      return true
    }else{
      return false
    }
  })
  const hashUserId = useSelector(state => state.usersPage.hashUserId,(prevIt,it) =>{
    if(prevIt != it){
      return false
    }
  })

  console.log('rer')
  useEffect(()=>{
    if(users.length == 0){
      dispatch(getUsersThunk())
    }
    dispatch(getNews())
  },[])
  
  
  
  return(
  <div >
    <div className = {fetch === 0 && !fetchUser ? s.preloaderNonVis : s.preloaderVis }>
        <Preloader />
    </div>
    <div  className = {fetch === 0 ?  s.newsVis : s.newsNonVis }>
      <h1 className = {s.zagNews}>News</h1> 
      {(posts && posts.length != 0 && fetch === 0 ?  s.newsVis : s.newsNonVis) && posts.map(postElement => {
        let currId = hashUserId.get(postElement.userId)
        if(users.length != 0){
        return(
          <div className="">
            <UserNews user = {users[currId]} userId = {postElement.userId}/>
            <Post avatar = {users[currId].avatar ? `${process.env.REACT_APP_API_STATIC_URL}/${users[currId].avatar}` : null} postImage = {postElement.linkToPhoto} localPostId = {postElement.oneUserId} postID = {postElement.id} liked = {postElement.liked} message = {postElement.txt} likeCounts = {postElement.likes}/>
            </div>)
        }})}
    </div>
  </div>)
}
const News = React.memo(NewsMemo)
export default WithAuthRedirect(News);