import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../redux/auth-reducer";
import { useEffect } from "react";
import { getUsersThunk } from "../../../redux/users-reduser";
import LoginReduxForm from "./LoginForm/LoginForm";
import s from './LoginForm/Login.module.css'

const Login = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getUsersThunk())
  },[])

  const onSubmit = (formData) => {
  dispatch(getUserData(formData.login,formData.password))
}
  return(
    <div className={s.navbarContainer}>
      <LoginReduxForm onSubmit = {onSubmit}/>
    </div>
  )
}
export default Login;