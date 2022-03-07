import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import borderCont from './images/borderLine.svg'
import backgroundImage1 from './images/MaskGroup1.svg'
import backgroundImage2 from './images/MaskGroup2.svg'
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer.jsx';
import Dialogs from './Components/Dialogs/Dialogs.jsx';
import { Route } from 'react-router';
import Registration from './Components/Users/Registration/Registation';
import News from './Components/News/News.jsx';
import UsersContainer from './Components/Users/UsersContainer';
import Login from './Components/Users/Login/Login';
import { Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Messages from './Components/Dialogs/Messages/Messages';
import EditCont from './Components/Edit/EditCont';
import Preloader from './Components/common/Preloader/Preloader';
import { getCock } from './redux/auth-reducer';
import { getUsersThunk } from './redux/users-reduser';
import LikesUs from './Components/LikesUs/LikesUs';


const App = (props) => {
  const dispatch = useDispatch()
  const isLog = useSelector(state => state.auth.isAuth)
  debugger
  useEffect(() => {
    if(isLog === null){
      dispatch(getCock())
    }
    dispatch(getUsersThunk())
  },[])
  if(isLog === null){
    return <Preloader/>
  }
  if (isLog === false) {return(
    <div className = "loginCont">
      <img className='img1' src = {backgroundImage1}/>
      <img className='img2' src = {backgroundImage2}/>
      {/*<img className='borderLine' src ={borderCont}/>*/}
      <Routes>
            <Route path = '/' element ={<Login/>}/>
            <Route path = 'users' element ={<UsersContainer/>}/>
            <Route path = "dialogs/:id" element = {<Messages/>}/>
            <Route path = "dialogs" element = {<Dialogs/>}/>
            <Route path = "profile/:userId" element ={<ProfileContainer/>}/>
            <Route path = "news" element ={<News/>}/>
            <Route path = "/likes" element ={<LikesUs/>}/>
            <Route path = "/login" element= {<Login/>}/>
            <Route path = "/registration" element= {<Registration/>}/>
            <Route path = "/edit" element= {<EditCont/>}/>
      </Routes>
      <div className = "logoContainer">
        PRIZMA
      </div>
    </div>
    )}

  return (
      <div className = "app-wrapper">
        <HeaderContainer/>
        <div className = "appWrapperContent">
        <Routes>
            <Route path = '/' element ={<UsersContainer/>}/>
            <Route path = 'users' element ={<UsersContainer/>}/>
            <Route path = "dialogs" element = {<Dialogs/>}/>
            <Route path = "dialogs/:id" element = {<Messages/>}/>
            <Route path = "profile/:userId" element ={<ProfileContainer/>}/>
            <Route path = "/login" element= {<Login/>}/>
            <Route path = "/registration" element= {<Registration/>}/>
            <Route path = "news" element ={<News/>}/>
            <Route path = "/likes" element ={<LikesUs/>}/>
            <Route path = "/edit" element= {<EditCont/>}/>
        </Routes>
        
        </div>
        
      </div>
    
  );
}


export default App;
