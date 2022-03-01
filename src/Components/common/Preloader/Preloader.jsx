import React from "react";
import s from "./Preloader.module.css"
const Preloader = (props) => {
  return(
    <div className="">
      <img className = {s.loadImg} src="https://s3-us-west-1.amazonaws.com/dolbydeveloper/examples/present/assets/images/loading.gif" alt="" />
    </div>
  )
}
export default Preloader;