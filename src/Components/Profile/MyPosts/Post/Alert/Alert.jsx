import React from "react";
import s from "../Post.module.css"

const Alert = (props) => {
  const YesClick = () => {
    props.changeAlert()
    props.delPost()
  }
  const NoClick = () => {
    props.changeAlert()
  }
  return(
    <div className={s.bodyAlert}>
      <div className= {s.alertContainer}>
        <h1 className={s.rectification}>Do you want to delete your post??</h1>
        <div className={s.btnGroup}>
          
            <button onClick={YesClick} className= {s.btnTrue}>Yes</button>
            <button onClick={NoClick} className= {s.btnFalse}>No</button>
          
      </div>
      </div>
    </div>
  )
}

export default Alert