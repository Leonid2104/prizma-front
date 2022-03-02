import React from "react";
import { addName, registrationProfile } from "../../../redux/auth-reducer";
import { useDispatch } from "react-redux";
import { getUsersThunk } from "../../../redux/users-reduser";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import s from '../Login/LoginForm/Login.module.css'

const Registration = (props) => {
  const dispatch = useDispatch()
  let onSubmit = (formData) =>{
    if(formData.login && formData.password){
    dispatch(registrationProfile(formData.login,formData.password,formData.userName))
    
    dispatch(getUsersThunk())
  }
  }
  return(
    <div className={s.navbarContainer}>
      <RegistrationForm onSubmit = {onSubmit}/>
    </div>
  )
}
export default Registration