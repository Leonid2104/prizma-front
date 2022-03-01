import React from "react";
import s from "./FriendsProfile.module.css"
import fr  from "../Images/friends.svg"
const FriendsProfile = (props) => {

  return(
    <div className = {s.friends}>
      <div className={s.myFriends}>My friends:</div>
      <img src={fr} alt="" className={s.friend} />
      <img src={fr} alt="" className={s.friend} />
      <img src={fr} alt="" className={s.friend} />
      <img src={fr} alt="" className={s.friend} />
      <img src={fr} alt="" className={s.friend} />
    </div>
  )
}
export default FriendsProfile;