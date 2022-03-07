import React from "react";
import s from "./Pages.module.css"

const Pages = (props) => {
 
  return(
    <div className="">
      {props.currentPage != 1 ?<span  onClick = {()=>{props.onPageChanged(props.currentPage-1);}}className = {s.pages}>{'<'}</span>: null}
      <span  onClick = {()=>{props.onPageChanged(1);}}className = {s.pages}> 1..</span>
      {props.currentPage != 1 ?<span  onClick = {()=>{props.onPageChanged(props.currentPage-1);}}className = {s.pages}>{`${props.currentPage-1}  `}</span>: <span>.</span>}
      <span  onClick = {()=>{props.onPageChanged(props.currentPage);}}className = {s.selectedPage}>{`${props.currentPage}  `}</span>
      {props.currentPage != props.PagesCount ? <span  onClick = {()=>{props.onPageChanged(props.currentPage+1);}}className = {s.pages}>{props.currentPage+1}</span> : <span>.</span> }
      <span  onClick = {()=>{props.onPageChanged(props.PagesCount);}}className = {s.pages}>..{props.PagesCount}</span>
      {props.currentPage != props.PagesCount ? <span  onClick = {()=>{props.onPageChanged(props.currentPage+1);}}className = {s.pages}> {">"} </span> : null }
    </div>
  )
}
export default Pages;