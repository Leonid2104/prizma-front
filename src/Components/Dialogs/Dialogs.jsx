import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect"
import { getChats } from "../../redux/dialogsPage-Reducer"
import s from "./Dialogs.module.css"
import DialogsItems from "./DialogsItems/DialogsItems.jsx"
import Messages from "./Messages/Messages"
const Dialogs = (props) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getChats())
  },[])
  
  return(
    <div className={s.dialogsWrapper}>
      <h1 className= {s.chatsZag}>Chats</h1>
      <DialogsItems/>
    </div>
  )
}
export default WithAuthRedirect(Dialogs) ;