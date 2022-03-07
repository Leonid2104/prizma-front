import React from "react";
import Header from "./Header.jsx";
import { connect } from "react-redux";
import { setUserData } from "../../redux/auth-reducer";
import { getCock } from "../../redux/auth-reducer";
class HeaderContainer extends React.Component{
  componentDidMount(){
    if (this.props.isAuth){
    this.props.getCock();
  }}
  
  componentDidUpdate(){
    if (this.props.isAuth){
    this.props.getCock();
   }
  }
  render(){
  return(
    <Header {...this.props}/>
  )}
}
const mapStateToProps = (state) =>({
  
  isAuth : state.auth.isAuth,
  login : state.auth.email,
  id : state.auth.userId

} )
export default connect(mapStateToProps,{getCock})(HeaderContainer);