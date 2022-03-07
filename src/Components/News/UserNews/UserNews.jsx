import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import s from './News.module.css'

const UserNewsMemo = (props) =>{
  const navigate = useNavigate()
  const user = useMemo(() => props.user,[props.user])
  
  const goToProfile = () => {
    navigate(`../profile/${props.user.id}`) 
  }
  
  return(
    <div onClick ={goToProfile} className={s.userNameCont}>
      {user ? (user.userName ? user.userName: user.email ): <Preloader/>}
    </div>
  )
}
const UserNews = React.memo(UserNewsMemo) 
export default UserNews