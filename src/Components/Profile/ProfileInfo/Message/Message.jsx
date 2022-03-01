import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addChat } from "../../../../redux/dialogsPage-Reducer";
import s from "../ProfileInfo.module.css";

const Message = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const goToChat = () => { 
    dispatch(addChat(props.id))
    navigate(`../../dialogs/${props.id}`)
  }
  return(
    <div className="">
      <div onClick={goToChat} className= {props.vis ? s.btnMes : s.btnNone}>MESSAGE</div>
    </div>
  )
}
export default Message