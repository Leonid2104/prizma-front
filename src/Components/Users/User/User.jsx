import React, { useEffect } from "react";
import s from "./User.module.css"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import line from "../images/line.svg"
import Preloader from "../../common/Preloader/Preloader";
const User = (props) => {
  let name = props.item.userName
  if(name.length > 12){
    name = name.slice(0,12) + '\n' + name.slice(12,name.length)
  }
  const isAuth = useSelector(state => state.auth.isAuth)
  const [isPrel,setPrel] = useState(props.item.isFetching)
  useEffect(() => {
    setPrel(props.item.isFetching)
  },[props.item.isFetching])
  if(isPrel){
    return(
      <Preloader/>
    )
  }
  return(
    <div className="">
      <div className = {s.containerUs} >
          
        <NavLink to={`/profile/${props.item.id}`}><img src={props.item.avatar ? `${process.env.REACT_APP_API_STATIC_URL}/${props.item.avatar}`:"https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"} alt="" className={s.imgUs} /></NavLink>
        <p className={s.nameUs}>{name}</p>
      
        {props.item.followed ? 
        <button disabled = {props.followingInProgress || !isAuth} className = {s.btnUsF} onClick = {()=>{props.unfollowing(props.item.id);
          }} >unfollow</button>: 
        <button disabled = {props.followingInProgress || !isAuth}  className = {s.btnUsUnf} onClick = {()=>{props.following(props.item.id)}}>follow</button>}
        
      </div>
      <img src={line} alt="" className={s.line} />
    </div>
  )
}

export default User;