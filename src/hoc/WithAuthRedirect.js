import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const WithAuthRedirect = (Component) => {
  const RedirectComponent = (props) =>{
    let location = useLocation()
    const isAuth = useSelector(state => state.auth.isAuth)
    
    if (!isAuth)  {

        return <Navigate  to = '../../login' state ={{replace:true}}/>
      }
    return <Component/>
  }
  return RedirectComponent
}
