import dialogsPageR from "./dialogsPage-Reducer.js"
import profilePageR from "./profilePage-Reducer"
const ADD_POST = "ADD-POST";
const INP_TEXT_POST = "INP-TEXT-POST";
const ADD_MES = "ADD-MES"
const INP_TEXT_MES= "INP-TEXT-MES"


let store ={
  _state : {
  profilePage :{
    postInputText : 'Lyonchic',
    
    posts: [
      {id : 1, message : "Hi, how are you?", likeCounts : 15},
      {id : 2, message : "It's my first post", likeCounts : 115},
      {id : 3, message : "It's my second post", likeCounts : 12},
      {id : 4, message : "Ha", likeCounts : 10}
    ],
  },
  dialogsPage:{
    mesInputText : 'Hi',
    messages : [
    {id : 1, message : "Hello"},
    {id : 2, message : "Hi"},
    {id : 3, message : "Go to walk?"},
    {id : 4, message : "Yo, lets go"},
    {id : 5, message : ";)"}
    ],
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

    
  },

  },
  
  
 
 
  
  
  dispatch(action){
    this._state.profilePage = profilePageR(this._state.profilePage, action);
    this._state.dialogsPage = dialogsPageR(this._state.dialogsPage, action);
    this._callSubscriber(this._state);

     
    if(action.type === 'SUBSCRIBE'){
      
      this._callSubscriber = action.observer
      
    
    }else if(action.type === 'CALLSUBSCRIBER'){
      
      console.log('State changed')
      
    }else if(action.type === 'GET-STATE'){
      return this._state 
    }
    
  }
  
}

export const addTextActionCreater = (text) =>{
  return{
    type:INP_TEXT_POST,
    newText : text }
}  

export default store;
let c = [{id : 1, followed: true, fullName : "Nastyonchic", status : "Fluffy bunny", location : {city:"Moscow",country:"Russia"}},
    {id : 2, followed: true, fullName : "Vovucha", status : "Music..", location : {city:"Petropavlovsk-Kamchatsky",country:"Russia"}},
    {id : 3, followed: false, fullName : "Mom", status : "I'm a boss", location : {city:"Petropavlovsk-Kamchatsky",country:"Russia"}},
]