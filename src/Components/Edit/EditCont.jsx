import React from "react";
import s from './Edit.module.css'
import EditAva from "./NewAva/EditAva";
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import NewPost from "./NewPost/NewPost";
const EditCont = (props) => {
  const editAva = (formData) =>{
   
  }
  return(
    <div className={s.bodyEdit}>
      <EditAva handleSubmit = {editAva}/>
      <NewPost/>
    </div>
  )
}

export default WithAuthRedirect(EditCont)