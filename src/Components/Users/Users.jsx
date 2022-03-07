import React from "react";
import User from "./User/User";
import s from "./Users.module.css"
import { BrowserRouter } from "react-router-dom";
import { Route } from 'react-router';
import Pages from "./Pages";
const UsersMemo = (props) => {
  let PagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for(let i = 1; i <= PagesCount; i++){
    pages.push(i);
  }
  let usersCur = props.users.slice((props.currentPage-1) * props.pageSize, (props.currentPage-1) * props.pageSize + props.pageSize)

  return( 
        <div className = {s.bodyUsers}>
          <h1 className= {s.zagUsers} >Users</h1>
          <Pages PagesCount = {PagesCount} onPageChanged = {props.onPageChanged} pages = {pages} currentPage = {props.currentPage}/>
          <div>
            {usersCur.map(u => ( <User key = {`user_${u.id}`} unfollowing = {props.unfollowing} followingInProgress = {props.followingInProgress} following = {props.following} item = {u} userFol = {props.userFol}/>))} 
          </div>
        </div>
  )
   
}
const Users = React.memo(UsersMemo);
export default Users
