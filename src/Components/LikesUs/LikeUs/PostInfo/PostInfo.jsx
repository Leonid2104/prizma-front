import React from "react";
import s from '../LikeUs.module.css'
import back from './images/contI.jpg'

const PostInfo = (props) => {
  return(
    <div className={s.postInfo}>
      <p className={s.textPost}>{props.txt}</p>
      <img className={s.postImage} src={props.postImage ? `${process.env.REACT_APP_API_STATIC_URL}/posts/${props.postImage}` : back} alt="" />
    </div>
  )
}
export default PostInfo