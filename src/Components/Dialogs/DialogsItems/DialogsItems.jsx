import React,{useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../../../redux/users-reduser.js";
import Dialog from "./Dialog/Dialog.jsx";

import s from "./DialogsItems.module.css"
const DialogsItems = (props) => {
  const dispatch = useDispatch()


  const dialogs = useSelector(state => state.dialogsPage.chats)
  
  

  let dialogsElements =  dialogs.map(dialog => <Dialog id = {dialog.userInfo.id} avatar = {dialog.userInfo.avatar} name = {dialog.userInfo.userName? dialog.userInfo.userName : dialog.userInfo.email}/> )
  return(
    <div>

      {dialogsElements}

    </div>
  )
}
export default DialogsItems;