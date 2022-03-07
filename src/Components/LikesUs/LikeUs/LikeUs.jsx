import React from "react";
import { useDispatch, useSelector } from "react-redux";
import line from '../images/line.svg'
import { NavLink } from "react-router-dom";
import s from './LikeUs.module.css'
import PostInfo from "./PostInfo/PostInfo";

import { setFollowingLikes } from "../../../redux/likes-reducer";
import { following, unfollowing } from "../../../redux/users-reduser";

const LikeUs = (props) => {
  let name = props.item.userInf.userName

  if(props.item.userInf.userName.length > 12){
    name = name.slice(0,12) + '\n' + name.slice(12,s.length)
  }

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.auth.isAuth)

  const unfollow = (id) => {
    dispatch(unfollowing(id))
    dispatch(setFollowingLikes(id))
  }

  const follow = (id) => {
    dispatch(following(id))
    dispatch(setFollowingLikes(id))
  }
  return(
    <div className={s.container}>
      <div className = {s.containerUs} > 
        <NavLink to = {`/profile/${props.item.userInf.id}`}><img src={props.item.userInf.avatar ? `${process.env.REACT_APP_API_STATIC_URL}/${props.item.userInf.avatar}`:"https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"} alt="" className={s.imgUs} /></NavLink>
        <p className={s.nameUs}>{name}<br/> liked your post</p>
        <PostInfo postImage = {props.item.postInfo.linkToPhoto} txt = {props.item.postInfo.txt}/>
        {props.item.followed ? 
        <button disabled = {props.followingInProgress || !isAuth} className = {s.btnUsF} onClick = {()=>{unfollow(props.item.userInf.id);
          }} >unfollow</button>: 
        <button disabled = {props.followingInProgress || !isAuth}  className = {s.btnUsUnf} onClick = {()=>{follow(props.item.userInf.id)}}>follow</button>}
      </div>
      <img src={line} alt="" className={s.line} />
    </div>
  )
}

export default LikeUs