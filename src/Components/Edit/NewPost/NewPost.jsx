import React from "react";
import s from '../Edit.module.css'
import nullImg from '../../Profile/Images/contI.jpg'
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostImage, addPostText,setCandAvatar, thunk_addPost} from "../../../redux/profilePage-Reducer";

import AvatarEditor from "react-avatar-editor";

const NewPost= (props) => {
 

  let photoRef = null
  const setPhotoRef = (ref) => {photoRef = ref}

  let inputRef = null
  const setInputRef = (ref) => {inputRef = ref}

  function changeScale(e){
    if(isMouse){
      if(e.deltaY < 0){
        let sc = scale
        if(!(sc >= 3)){
          setScale(sc + 0.1)
        }
      }else{
        let sc = scale
        if(!(sc <= 0.6)){
          setScale(sc - 0.1)
        }
       }
    }
  }

  const changePhoto = () => {
    let canv = photoRef.getImageScaledToCanvas()
      canv.toBlob((b) =>{
        let file = new File([b],`avatar.${b.type.slice(b.type.lastIndexOf('/') + 1,b.type.length)}`)
        
        dispatch(addPostImage(file))
      })
      
  }
  const dispatch = useDispatch()

  const inputTxt = useSelector(state => state.profilePage.inputText)
  const postImage = useSelector(state => state.profilePage.candidatePostImage)

  const [width,setWidth] = useState(window.screen.width / 3)
  const [isMouse,setMouse] = useState(false)
  const [scale, setScale] = useState(1.2)
  const [stateImage, setImageLoc] = useState(null)

  const addNewPost = () =>{
    dispatch(thunk_addPost(postImage,inputTxt))
  }
  const onChangePhoto = (data) =>{
   setImageLoc(data.target.files[0])
  }
  const onChangeText = (data,text) =>{
    dispatch(addPostText(data.target.value))
  }
  
  const mouseOver = () =>{
    document.body.classList.add("stopScroll") 
    if(!isMouse){
      setMouse(true)
    }
  }
  const inpActive = () => {
    inputRef.click()
  }
  const leaveMouse = () =>{
    document.body.classList.remove("stopScroll") 
    if(isMouse){
      setMouse(false)
      changePhoto()
    }
  }
  
  useEffect(() => {
    if(Math.abs(window.screen.width - width) > 5){
      setWidth(window.screen.width / 3)
    }
  },[window.screen.width])
  
  
  return(
    
    <div className={s.editAvaBody}>
      <div className={s.btnGroup}>
        <p className={s.zag}>New post</p>  
        <input ref = {setInputRef} hidden accept=".jpg, .jpeg, .png" type = 'file' onChange={(e) => onChangePhoto(e)}/>
        <input className={s.inputText} type = 'text' value={inputTxt} onChange={(e,text) => onChangeText(e)}/>
        <button onClick={inpActive} className={s.btnChoosePost}>Choose file</button>
        <button onClick={addNewPost} className= {s.btnEditPost} >Add post</button>
      </div>
      <div className={s.imgCont}>
        <AvatarEditor
          className={s.editorPost}
          ref = {setPhotoRef}
          onImageReady = {changePhoto}
          image={stateImage}
          onMouseOver = {mouseOver}
          onMouseLeave = {leaveMouse}
          onWheel = {changeScale}
          crossOrigin="anonymus"
          width = {width}
          height = {width * 0.7}
          border={width / 15}
          color={[23, 34, 45, 0.6]} // RGBA
          scale={scale}
          rotate={0}
      />
      </div>
    </div>
  )
}

export default NewPost;