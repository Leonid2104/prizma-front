import React, { useState } from "react";
import s from "./Post.module.css";
import ava from "../../Images/MyAvatar.png"
import back from "../../Images/contI.jpg"
import Like from "./Like/Like";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { delPost, delPostActionCreater } from "../../../../redux/profilePage-Reducer";
import Alert from "./Alert/Alert";
const PostMemo = (props) =>{
  const dispatch = useDispatch()

  const dPost =() =>{
    dispatch(delPost(props.postID))
  }

  const [likeCounts, setLikeCounts] = useState(props.likeCounts)
  const [isAlert, setAlert] = useState(false)

  const changeAlert = () => {
    if (isAlert){
      setAlert(false)
    }
    else{
      debugger
      setAlert(true)
    }
  }

  const changeLike = (bool) => {
    if(bool){
      setLikeCounts((prev) => prev + 1 )
    }else{
      setLikeCounts((prev) => prev - 1 )
    }
  }

  useEffect(() => {
    setLikeCounts(props.likeCounts)
  },[props.likeCounts])
  return(
    <div className = {s.item}>
      <div className={s.itemZag}>
        <img className= {s.avatar} src = {props.avatar? props.avatar:"https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"}></img>
        <p>{props.message}</p>
        {props.isMe && <button className={s.delPost} onClick = {changeAlert}>x</button>}
      </div>
      <img src={props.postImage ? `${process.env.REACT_APP_API_STATIC_URL}/posts/${props.postImage}` : back } className ={s.imgBack} alt="" />
      <div>
        <div className="">
          <span className= {s.likeContainer}>
            <Like setLikeCounts = {changeLike}  localPostId = {props.localPostId} postId = {props.postID} liked = {props.liked}/>
            {likeCounts} likes
          </span>
        </div>
      </div>
      {isAlert === true && <Alert delPost = {dPost} changeAlert = {changeAlert} />}
    </div>
  )
}
const Post = React.memo(PostMemo)
export default Post;