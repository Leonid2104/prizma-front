import React from "react";
import { useDispatch,useSelector } from "react-redux";
import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import ava from "../Images/MyAvatar.png"
import edit from "../Images/edit.svg"
import { reset } from "redux-form";
import contIm from "../Images/contI.jpg"
import { Field, reduxForm } from "redux-form";
import { thunk_addPost } from "../../../redux/profilePage-Reducer";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const MyPosts = (props) => {
  const id = useParams().userId

  const dispatch = useDispatch()

  const postsElements = useSelector(state => state.profilePage.posts)
  const myAva = useSelector(state => state.profilePage.myAvatar)
  const myId = useSelector(state => state.auth.userId)

  const [isMe, setIsMe] = useState(false)
  const [rerender, setRerender] = useState(false)
  const [myAvatar, setAvatar] = useState(myAva)
  
  const avatar = props.profile.avatar
  let i = -1

  useEffect(() => {
    if (myId == id){
      setIsMe(true)
    }else{
      setIsMe(false)
    }
  },[id])

  useEffect(() => {
    if(isMe){
      setAvatar(myAva)
    }
  },[myAva])

  return(
    <div>
      <div className = {s.content}>
        {postsElements && postsElements.map(postElement => { 
            return(
            <Post key = {`post_${postElement.id}`} avatar ={isMe ? myAvatar : avatar ?`${process.env.REACT_APP_API_STATIC_URL}/${avatar}`:null} postImage = {postElement.linkToPhoto} localPostId = {postElement.oneUserId} postID = {postElement.id} liked = {postElement.liked} message = {postElement.txt} isMe = {isMe} likeCounts = {postElement.likes}/>
            )
          })}
      </div>
    </div>
  );
}

export default MyPosts;