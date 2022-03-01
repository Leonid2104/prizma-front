import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getUserData } from "../../../../redux/auth-reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from '../../Login/LoginForm/Login.module.css'
import vertLine from '../../../../images/lineVertLogin.svg'
import lineHorizon from '../../../../images/lineHorizonLogin.svg'
import { NavLink } from "react-router-dom";


const RegForm = (props) => {
  const state = useSelector(state => state.auth.isTrue)
  const id = useSelector(state => state.auth.userId)
  const isAuth = useSelector(state => state.auth.isAuth)
  const users = useSelector(state => state.usersPage.users)
  let uId
  users.map(u => {
    if(u.id === id){
      uId = u.uId
    }
  })


  let [err,removeErr] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    
    if (isAuth){
      navigate(`../users`,{replace:true})
    }
  },[isAuth])
  useEffect(() => {
  removeErr(err => {
    let pr = !err.pr
    return{
      pr:pr
    }
  }) 
  }, [state]);
  return(
    <form onSubmit = {props.handleSubmit}>
      <div className={s.navigate}>
        <NavLink className={s.navigateRef}  to = {'../login'}>Log in</NavLink>
        <img src={vertLine} alt="" className={s.vertLine} />
        <NavLink className={s.selected} to = {'../registration'}>register</NavLink>
      </div>
      <div className="">
        <img src={lineHorizon} className={s.lineHorizon} alt="" />
      </div>
      {!err.pr && <div style={{backgroundColor :'red', width: '150px', height: '20px', color: 'white'}}>Неверные данные</div>}
       <div className="">
          <p className={s.text}>User Name</p>
          <Field className = {s.input}  name = {"userName"} component = {"input"}/>
        </div>
       <div className="">
          <p className={s.text}>Email</p>
          <Field className = {s.input}  name = {"login"} component = {"input"}/>
        </div>
        <div className="">
          <p className={s.text}>Password</p>
          <Field className = {s.input} type={"password"} name = {"password"} component = {"input"}/>
        </div>
        <button  className={s.logBtn}>REGISTRATION</button>
      </form>
  )
}

const RegistrationForm = reduxForm({form: "login"})(RegForm)
export default RegistrationForm;