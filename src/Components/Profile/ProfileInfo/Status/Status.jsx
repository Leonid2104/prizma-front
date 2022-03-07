import React from "react";
import s from "./Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setStatus, updateStatus } from "../../../../redux/profilePage-Reducer";
import { useParams } from "react-router-dom";
const  Status = (props) => {
  const dispatch = useDispatch()

  const state  = useSelector(state => state)

  
  let initialState = {
    isWriting : false,
    status: state.profilePage.status
  }
  let [stateLoc, setState ] = useState(initialState);
  let [isMyProfile,setIsMy] =useState(false)

  const params = useParams()

  

  const writeStatus = () =>{
    setState({
      ...stateLoc,
      isWriting : true
      });
  }
  const noWriteStatus = () => {
    setState({
      ...stateLoc,
      isWriting : false
      });
      dispatch(updateStatus(stateLoc.status))
  }
  const onStatusChange = (e) => {
    setState(
      {...stateLoc, status : e.currentTarget.value}
      )
  }

  useEffect(()=>{
    if(state.auth.userId == params.userId){
      setIsMy(true)
    }
    else{
      setIsMy(false)
    }
    dispatch(setStatus(state.profilePage.profile.status))
  },[params.userId])

  useEffect((prevProps) => {
    setState(
        {...stateLoc,status: state.profilePage.status}
      )
  }, [state.profilePage.status]);

    if (!isMyProfile){
      return(
        <div className = {s.statusCont}>
              <div className="">
                {stateLoc.status ? <span className = {s.status}>{stateLoc.status}</span>: <span  className = {s.status}>Статус не указан</span>}
              </div>
        </div>
      )
    }
  
    return (
      <div className = {s.statusCont}>
      {!stateLoc.isWriting &&
          <div className="">
            {stateLoc.status ? <span  onDoubleClick = {writeStatus.bind(this)} className = {s.status}>{stateLoc.status}</span>: <span  onDoubleClick = {writeStatus.bind(this)} className = {s.status}>Статус не указан</span>}
          </div>
      }
      {stateLoc.isWriting &&
          <div className=""> 
            <input onChange = {onStatusChange} className = {s.inpStatus} autoFocus = {true} onBlur ={noWriteStatus.bind(this)} className = {s.status} value = {stateLoc.status}/>
            <button onClick ={noWriteStatus.bind(this)} >Изменить статус</button>
          </div>
      }
        </div>
    )
  
}






export default Status;