import React from "react";
import s from "./Dialog.module.css"
import icon from "./images/mes.svg"
import { NavLink } from "react-router-dom";

const Dialog = (props)=>{
  return(
    <div className= {s.dialog}>
        <NavLink  className ={s.dialogImg} to = {"/dialogs/"+ props.id}> <img className ={s.dialogImg} src={props.avatar? `${process.env.REACT_APP_API_STATIC_URL}/${props.avatar}`:"https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"} alt="" /></NavLink>
        <NavLink activeClassName={s.active} className ={s.dialogItem} to = {"/dialogs/"+ props.id}> {props.name}</NavLink>
        <NavLink activeClassName={s.active} className ={s.icon} to = {"/dialogs/"+ props.id}> <img className= {s.icon} src={icon} alt="" /></NavLink>
        
    </div>
  )
}
export default Dialog; 