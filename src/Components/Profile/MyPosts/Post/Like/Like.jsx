import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delLike, like } from "../../../../../redux/users-reduser";
import likeSvg from '../images/like.svg'
import likeActiveSvg from '../images/likeActive.svg'
import s from "../Post.module.css"
const Like = (props) => {
  const dispatch = useDispatch()
  const [liked,setLiked] = useState(props.liked)
  useEffect(() =>{
    setLiked(props.liked)
  },[props.liked])
  let click = () => {
    if(!liked){
      dispatch(like(props.localPostId,props.postId))
      props.setLikeCounts(true)
    }else{
      dispatch(delLike(props.localPostId,props.postId))
      props.setLikeCounts(false)
    }
    setLiked(!liked)
    
  }
  return(
    <div onClick={click} className = {s.likeImg}>
      {!liked ?<img className={s.likeSvg} src={likeSvg} alt="" />: <img className={s.likeSvg} src={likeActiveSvg} alt="" />}
    </div>
  )
}

export default Like