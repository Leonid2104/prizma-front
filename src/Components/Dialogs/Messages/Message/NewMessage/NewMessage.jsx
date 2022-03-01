import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMes, addNewMes, addTextMes } from "../../../../../redux/dialogsPage-Reducer";
import s from "../../Messages.module.css"
const NewMessage = (props) => {
  const dialogsPage = useSelector(state => state.dialogsPage)
  const abId = useParams().id
  const myId = useSelector(state => state.auth.userId)
  const dispatch = useDispatch()
  const ws = new WebSocket(`ws://45.141.79.208:8000/${abId}`)

  const [focus, setFocus] = useState(false)
  let rootEl =useRef(null)
  useEffect(() => {
    const onClick = e => {
      if(!rootEl.current){
        if(focus){
          setFocus(false) 
        }
        return
      }
      if(!rootEl.current.contains(e.target)){
        if(focus){
          setFocus(false) 
        }
      }}
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
  },[])
  useEffect(() =>{

    ws.addEventListener('message',(mes) =>{
      const message = JSON.parse(mes.data)
      console.log(message)
      dispatch(addMes(abId,message.text))
    })
  },[])

  
  let getMessageElement = React.createRef();
  let onAddMes =  ()=> {
    let text = getMessageElement.current.value;
    if(focus){
      setFocus(false)
    }
    if(text != ''){
      dispatch(addNewMes(abId,text,myId))
      ws.send(JSON.stringify({text:text,method:'ADD_MES',userId: myId}))
    }
  }

  let  onAddTextMes = () =>{
    let text = getMessageElement.current.value;
    dispatch(addTextMes(text))
   
  }
  return(
    <div ref = {rootEl} className = {focus ? s.absoluteCont : s.newMesCont}>
      <input onDoubleClick={() => setFocus(true)} type = "text" onChange = {onAddTextMes} className = {s.inputMes} value = {dialogsPage.mesInputText} ref = {getMessageElement}></input>
      <button onClick = {onAddMes}  className = {s.newMesBtn} > Add new message</button>
    </div>
  )
}
export default NewMessage