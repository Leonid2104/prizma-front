import React from "react";
import { connect } from "react-redux";
import { follow } from "../../redux/users-reduser";
import {unfollow} from "../../redux/users-reduser";
import {setUsers} from "../../redux/users-reduser";
import {setCurrentPage} from "../../redux/users-reduser";
import {setTotalUsersCount} from "../../redux/users-reduser";
import Preloader from "../common/Preloader/Preloader";
import s from "./Users.module.css"
import Users from "./Users"
import {toggleIsFollowingProgress} from "../../redux/users-reduser";
import {getUsersThunk} from "../../redux/users-reduser"
import {unfollowing,following} from "../../redux/users-reduser"
class UserAdd extends React.Component {
  componentDidMount(){    
    this.props.getUsersThunk(this.props.currentPage,this.props.pageSize); 
  }
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);

  }
  
  render(){
    return<>
    
      <div className = {!this.props.isFetching ? s.preloaderNonVis : s.preloaderVis }>
          <Preloader />
      </div> 
      <div className = {!this.props.isFetching ?  s.usersVis : s.usersNonVis }>
        <Users toggleIsFollowingProgress = {this.props.toggleIsFollowingProgress} onPageChanged ={this.onPageChanged} 
          pageSize = {this.props.pageSize}
          userFol = {this.props.follow} 
          following = {this.props.following}
          unfollowing = {this.props.unfollowing} 
          currentPage = {this.props.currentPage}
          users = {this.props.users}
          totalUsersCount = {this.props.totalUsersCount}
          followingInProgress = {this.props.followingInProgress}
        />
      </div>
    </>
    
}
}

let mapStateToProps = (state) => {
  return{
    users: state.usersPage.users,
    pageSize : state.usersPage.pageSize,
    totalUsersCount : state.usersPage.totalUsersCount,
    currentPage : state.usersPage.currentPage,
    isFetching  : state.usersPage.isFetching,
    followingInProgress : state.usersPage.followingInProgress
  }
}
/* let mapDispatcToProps = (dispatch) =>{
  return{
    userFol: (userId)=>{
      dispatch(followAC(userId))},
    userUnfol: (userId)=>{
      dispatch(unfollowAC(userId))},
    setUsers : (users) => {
      dispatch(setUsersAC(users))
    },
    setCurrentPage: (numb) =>{
      dispatch(setCurrentPageAC(numb))
    },
    setTotalUsersCount: (totalCount) =>{
      dispatch(setTotalUsersCountAC(totalCount))
    },
    toggleIsFetching: (isFetching) =>{
      dispatch(setIsFetchingAC(isFetching));
    }
  }
} */
export default connect(mapStateToProps,{unfollowing,following,getUsersThunk,follow,toggleIsFollowingProgress, unfollow,setUsers,setCurrentPage,setTotalUsersCount})(UserAdd);