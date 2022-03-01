import React from "react";
import { useSelector } from "react-redux";
import s from "../Messages.module.css"
import { NavLink } from "react-router-dom";
const HeaderMes = (props) => {
  const abonent = useSelector(state => state.dialogsPage.abonentInfo)
  return(
    <div className = {s.headChat}>
      <NavLink className = {s.linkToProfile} to = {`../../profile/${abonent.id}`}>
        <img className={s.abAva} src={abonent.avatar ? `${process.env.REACT_APP_API_STATIC_URL}/${abonent.avatar}` : "https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13"} alt="" />
        <p className={s.userName}>{abonent.email}</p>
      </NavLink>
    </div>
  )
}
export default HeaderMes