import React, { useEffect, useState } from "react";
import FriendsProfile from "./FriendsProfile/FriendsProfile";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx";
import { useParams } from "react-router-dom";

const ProfileMemo = (props) => {
  const params = useParams().userId
  const [profile,setProfile] = useState(false)
  useEffect(() => {
    if(props.profile){
      setProfile(true)}
  },[props.profile])
  const [vis,setVis] = useState(props.view)
  
  return(
    <div className="">
      {profile && <div className=''>
          <ProfileInfo className ={s.profileZag} status ={props.status} updateStatus = {props.updateStatus} profile = {props.profile} userId = {params}/>
          <MyPosts profile = {props.profile} id = {props.profile.id}/>
        </div>
      }
    </div>
  );
}
const Profile = React.memo(ProfileMemo)
export default Profile;