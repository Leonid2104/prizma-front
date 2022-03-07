import React from "react";
import s from "./Messages.module.css"
import Message from "./Message/Message.jsx";
import { useDispatch } from "react-redux";
import { addMes, addNewMes, getMessages } from "../../../redux/dialogsPage-Reducer";
import { addTextMes } from "../../../redux/dialogsPage-Reducer";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderMes from "./HeaderMes/HeaderMes";
import NewMessage from "./Message/NewMessage/NewMessage";


const Messages = (props) => {
  const abId = useParams().id
  const dispatch = useDispatch()
  
  const myId = useSelector(state => state.auth.userId)
  const messages = useSelector(state => state.dialogsPage.messages)
  
  let elem = null
  
    
  let messageElements = messages
  .map(messageItem => <Message key = {`message_${messageItem.abId}_${messageItem.textMessage}_${messageItem.id && messageItem.id}`} message = {messageItem.textMessage} idUs = {messageItem.speakerId} images = {props.images}/>)
  
  useEffect(() => {
    elem = document.querySelector('#mesContainer')
    if(elem){
      let h = elem.scrollHeight 
      elem.scrollTop = h
    }
   
  },[messages,elem,messageElements])
  
  useEffect(() => {
    dispatch(getMessages(myId,abId))
  },[])

  return(
    <div className = {s.content}>
      <HeaderMes/>
      <div className={s.mesCont} id ='mesContainer'>
        {messageElements}
      </div>
      <NewMessage  />
    </div>
  )
}

export default Messages;