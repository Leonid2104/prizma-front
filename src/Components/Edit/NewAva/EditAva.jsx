import React from "react";
import s from '../Edit.module.css'
import { Field, reduxForm } from "redux-form";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar, setCandAvatar, updateAvatar } from "../../../redux/profilePage-Reducer";
import { setUserAvatar, setUserAvatarTh } from "../../../redux/users-reduser";
import AvatarEditor from "react-avatar-editor"
import { useRef } from "react";

const EditAva= (props) => {
  let [isMouse,setMouse] = useState(false)
  let editorRef = null
  let inputRef = null

  const setInputRef = (input) => {inputRef = input}
  const setEditorRef = (editor) => (editorRef = editor)
  const changePhoto = () => {

    let canv = editorRef.getImageScaledToCanvas()
      canv.toBlob((b) =>{
        let file = new File([b],`avatar.${b.type.slice(b.type.lastIndexOf('/') + 1,b.type.length)}`)
        console.log(file)
        dispatch(setCandAvatar(file))
      })
      
  }
  function scrollEvent(e){
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
      console.log(e)
    }
  }
  let inpActive = () =>{
    inputRef.click()
  }

  let mouseOver = () => {
    document.body.classList.add("stopScroll") 
    if(!isMouse){
      setMouse(true)
      console.log(true,1111)
    }
  }
  let mouseLeave = () => {
    document.body.classList.remove("stopScroll") 
    if(isMouse){
      changePhoto()
      setMouse(false)
      console.log(false,1111)
    }
  }

  const dispatch = useDispatch()
  const [scale,setScale] = useState(1.2)
  const avaUploader = useSelector(state => state.profilePage.candidateAvatarFile)
  const avaFile = useSelector(state => state.profilePage.candidateAvatar)
  const [file, setFile] = useState(null)
  const id = useSelector(state => state.auth.userId)
  const locId =  useSelector(state => state.usersPage.hashUserId.get(id))
  const onChange = (data) =>{
    setFile(data.target.files[0])
  }
 

  const addAvatar = () =>{
    console.log(avaFile)
    dispatch(setAvatar())
    dispatch(updateAvatar(avaUploader))
    dispatch(setUserAvatarTh(avaFile,locId))
    
  }
  return(
    <div className={s.editAvaBody}>
      <div className={s.editButtons}>
        <p className= {s.zag}>Edit Avatar</p>
        <div className={s.buttons}></div>
        <button onClick={inpActive} className={s.btnChoose}>Choose file</button>
        <input ref = {setInputRef} hidden className={s.input} accept=".jpg, .jpeg, .png" type = 'file' onChange={(e) => onChange(e)}></input>
        <button className={s.btnEdit} onClick={addAvatar} >Edit avatar</button>
      </div>
      <div className={s.imgCont} id ={'imgContAvatarEditor'}>
        <AvatarEditor
          className={s.editorAva}
          crossOrigin="anonymus"
          ref={setEditorRef}
          onWheel = {scrollEvent}
          onMouseOver = {mouseOver}
          onMouseLeave = {mouseLeave}
          image ={file}
          onImageReady = {changePhoto}
          width={300}
          height={300}
          border={18}
          color={[23, 34, 45, 0.6]} // RGBA
          scale={scale}
          rotate={0}/>
      </div>
    </div>
  )
}

export default EditAva;