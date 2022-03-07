import React, { useState } from "react";
import headProf from "../Images/head.png";
import s from "./ProfileInfo.module.css";
import myAva from "../Images/MyAvatar.png";
import line from "../Images/Line.svg"
import Preloader from "../../common/Preloader/Preloader";
import Status from "./Status/Status";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { following, unfollowing } from "../../../redux/users-reduser";
import { getMyAvatar, setFollowed } from "../../../redux/profilePage-Reducer";
import Message from "./Message/Message";
const ProfileInfo = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gToUs = () => {
    navigate('../../')
  }
  const id = useParams().userId

  const myId = useSelector(state => state.auth.userId)
  const avatarRedux = useSelector(state => state.profilePage.myAvatar) 
  const fol = useSelector(state => state.profilePage.profile)
  
  const [isMe, setIsMe] = useState(false)
  const [followed, setFol] = useState(fol.followed)
  const [myAvatar,setMyAvatar] = useState(avatarRedux)
  const [visEl,setVis] = useState(false)

  useEffect(() => {
    setMyAvatar(avatarRedux)
  },[avatarRedux])
  useEffect(() => {
    if(isMe){
      setVis(false)
    }
  },[isMe])
  useEffect(() => {
    if(id == myId){
      setIsMe(true)
    }else(
      setIsMe(false)
    )
  },[id,myId])
  
  useEffect(()=>{
    setFol(fol.followed)
  },[fol.followed])
 
  const follow = () =>{
    if(!followed){
      dispatch(following(fol.id))
    }else{
      dispatch(unfollowing(fol.id))
    }
    dispatch(setFollowed())
  }

  if (!props.profile){
    return <Preloader/>
  }

  return(
    <div className = {s.profInf} >
      <div className={s.ProfZag}>
        <div className={s.leftCont}>
          <div  onMouseLeave={!isMe ? () => setVis(false) : null} onMouseEnter={!isMe ? () => setVis(true): null} className={s.avaCont}>
            {isMe ? <img className = {s.ava} src={myAvatar  ? myAvatar : "https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"}  /> : <img  className = {visEl? s.avaNon :s.ava} on src={props.profile.avatar  ? `${process.env.REACT_APP_API_STATIC_URL}${props.profile.avatar}` : "https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"}  />}
            <Message  id = {props.profile.id} vis ={visEl} className = {s.btnNone}/>
          </div>
          {!isMe ? (!followed ? <button  onClick={()=>follow()} className={s.followed}>Following</button>:<button onClick={()=>follow()} className={s.unFollowed}>Unfollowing</button>): (<button  onClick={()=>gToUs()} className={s.followed}>Let's make friends</button>)}
        </div>
        <div className={s.ProfZ}>
          <div className={s.zagAva}>{props.profile.userName ? props.profile.userName:props.profile.email}</div>
          <Status />
          {!isMe && <p className={s.followered}>{`User ${props.profile.follower ? `followed`: `unfollowed`} you`}</p>}
          <img src={line} className ={s.line} alt="" />
        </div>
      </div>
    </div>
  );
}
export default ProfileInfo;