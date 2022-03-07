import React from "react";
import Profile from "./Profile";

import { useState } from "react";
import s from "./Profile.module.css";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { getUserProfile } from "../../redux/profilePage-Reducer";
import {updateStatus, getStatus, getPosts } from "../../redux/profilePage-Reducer";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import Preloader from "../common/Preloader/Preloader";
import {CSSTransition} from 'react-transition-group'
import { useNavigate, useParams } from "react-router-dom";
import { getUsersThunk } from "../../redux/users-reduser";
const ProfileContainer = (props) =>{
  const profile = useSelector(state => state.profilePage.profile)
  
  const params = useParams()
  

  const [profileState, setProfileState] = useState(profile[params.userId])
  
  const status = useSelector(state => state.profilePage.status,(l,r) =>{
    if(l != r){
      return false
    }else{
      return true
    }
  })
  const load = useSelector(state => state.profilePage.isLoading,(l,r) =>{
    
    if((l == 0 && r !=0) || (l != 0 && r == 0)){
      
      return false
    }else{
      return true
    }
  })

  
  const dispatch = useDispatch()
  useEffect(()=>{ 
    
      dispatch(getUserProfile(params.userId))
      dispatch(getStatus(params.userId))
      dispatch(getPosts(params.userId))
      setProfileState(profile)
        
      
  },[params.userId,profile.id])
  
    return(
    <div className="">
      <div className = {load === 0 ? s.preloaderNonVis : s.preloaderVis }>
        <Preloader />
      </div>
      <div className = {load === 0 ?  s.profileVis : s.profileNonVis }>
        <Profile {...props} profile = {profileState} status = {status} view ={load!=0 ? true : false} />
      </div>
    </div> 
  )
}








export default WithAuthRedirect(ProfileContainer);
  
