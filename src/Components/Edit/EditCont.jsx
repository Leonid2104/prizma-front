import React from "react";
import s from './Edit.module.css'
import EditAva from "./NewAva/EditAva";
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect'
import NewPost from "./NewPost/NewPost";
const EditCont = (props) => {

  return(
    <div className={s.bodyEdit}>
      <EditAva/>
      <NewPost/>
    </div>
  )
}

export default WithAuthRedirect(EditCont)