import React from "react";
import { useSelector } from "react-redux";
import s from "./Message.module.css";

const Message = (props)=> {
  const myId = useSelector(state => state.auth.userId) 

  return(
    <div id="Message" className={s.messageCont}>
      <p className ={myId == props.idUs ? s.myMes: s.message}> {props.message}</p>
    </div>
    )
}
export default Message;