import API, { dialogsAPI } from "../api/api";
const ADD_MES = "ADD-MES";
const INP_TEXT_MES= "INP-TEXT-MES";
const SET_CHATS = "SET_CHATS";
const SET_MES = 'SET_MES'

let inicialState = {
  mesInputText : 'Hi',
  chats : [],
  abonentInfo:{},
  messages : [],
  dialogs:[
    {id : 1, name : "Nastyonchic"},
    {id : 2, name : "Vovucha"},
    {id : 3, name : "Mom"},
    {id : 4, name : "Papa"}
  ],
  images:{
    Nastyonchic:[
      {OimgUrl:'"https://i.pinimg.com/originals/b3/5d/15/b35d1508c3d1f46f848e31efad070bf7.jpg"'},
      {TimgUrl: '"https://www.pixel-creation.com/wp-content/uploads/ocean-pictures-wallpaper-70-images.jpg"'},
  ]
}
}

const dialogsPageR = (state = inicialState,action)=> {
  if (action.type === INP_TEXT_MES){
    return{
    ...state,
    mesInputText:action.newText
     };
  }else if(action.type == SET_MES){
    return{
      ...state,messages:action.data.messages,abonentInfo: action.data.abInfo
    }
  }else if(action.type == SET_CHATS){
    return{
      ...state,chats: action.chats
    }
  } else if(action.type === ADD_MES){
    let body =state.mesInputText;
    return{
    ...state,
    mesInputText : '',
    messages : [...state.messages,{textMessage: action.text, speakerId: action.speakerId}]
    
  }
  }else{
    return state;
  }
}

export const setChats = (chats) => {
  return{
    type: SET_CHATS,
    chats
  }
}
export const setMessages = (data) =>{
  return{
    type:SET_MES,
    data
  }
}
export const addTextMes = (text) =>{
  return{
    type: INP_TEXT_MES,
    newText : text }
}  
export const addMes = (id,text) =>{
  return{
    type: ADD_MES,
    speakerId: id,text
  }
}

export const addNewMes = (AbId,text,Id) =>{
  return(dispatch) =>{
    API.sendMessages(AbId,text).then(response => {
      dispatch(addMes(Id,text))
    }).catch(err => {debugger})
  }
}
export const getMessages = (MyId,AbId) =>{
  return(dispatch) => {
    API.getMessages(AbId).then(response => {
      
      dispatch(setMessages(response.data))
    })
  }
}

export const addChat = (id) => {
  return(dispatch) => {
    dialogsAPI.addChats(id).then(

    )
  }
}
export const getChats = (MyId,AbId) =>{
  return(dispatch) =>{
    dialogsAPI.getChats().then(response => {
      dispatch(setChats(response.data))
    })
    
  }
}
export default dialogsPageR;
