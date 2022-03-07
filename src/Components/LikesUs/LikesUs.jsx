import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes } from "../../redux/likes-reducer";
import LikeUs from "./LikeUs/LikeUs";
import s from './LikeUs/LikeUs.module.css'

const LikesUs = (props) => {
  const dispatch = useDispatch()

  const likesArr = useSelector(state => state.likesPage.likes)

  useEffect(() => {
    dispatch(getLikes())
  },[])
  
  return(
    <div className=''>
      <h1 className={s.zag}>Activity</h1>
      {(likesArr && likesArr.length) && likesArr.map(item => {
        return(
          <LikeUs key = {`like_${item.id}`} item = {item}/>
        )
      })}
    </div>
  )
}
export default LikesUs