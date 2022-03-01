import React from "react";
import s from "./Header.module.css"
import logo from "./Images/logo.svg"
import home from "./Images/homeLog.svg"
import line from "./Images/line.svg"
import cloud from "./Images/cloud.svg"
import edit from "./Images/edit.svg"
import heart from "./Images/heart.svg"

import chats from "./Images/chats.svg"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getMyAvatar } from "../../redux/profilePage-Reducer";
const Header = (props) => {
  const dispatch = useDispatch()
  const globId = useSelector(state => state.auth.userId)
  const myAva = useSelector(state => state.profilePage.myAvatar)
  useEffect(() => {
    dispatch(getMyAvatar(globId))
  },[])
{ /* const id = useSelector(state => state.usersPage.hashUserId)
const myId = id.get(props.id)*/}
  return (
      <header className = {s.header}>
        <div className= {s.headerFlex}>
          <div className={s.logo}>PRIZMA</div>
          <div className={s.loginBlock}>
            <NavLink to = {'/news'}><img src={home} className={s.link} alt="" /></NavLink>
            <NavLink to = {'/'}><img src={cloud} className={s.link} alt="" /></NavLink>
            <NavLink to = {`/edit`}><img src={edit} className={s.link} alt="" /></NavLink>
            <NavLink to = {'/likes'}><img src={heart} className={s.link} alt="" /></NavLink>
            <NavLink to = {'/dialogs'}><img src={chats} className={s.link} alt="" /></NavLink>
            <NavLink to = {`/profile/${globId}`}><img src={myAva ? myAva :'https://avatars.mds.yandex.net/i?id=d3cb29c602fae2c730cedae5cbf21465-4569008-images-thumbs&n=13'} className={s.myAva}  alt="" /></NavLink>
          </div>
        </div>
        <img src = {line} className={s.lineHead} alt="" />
      </header>
  );
}
export default Header;