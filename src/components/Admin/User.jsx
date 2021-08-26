import React, { useEffect } from "react";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./user.css";
import AuthService from "../../api/auth.service";
import UserService from "../../api/user.service";
import { useHistory } from "react-router";
import a from "../../assets/avt.svg";

export default function User() {
  const history = useHistory();


  useEffect(() => {
    

   UserService.getAdmin().then(
     (response) => {},
     (error) => {
       const resMessage =
         (error.response &&
           error.response.data &&
           error.response.data.message) ||
         error.message ||
         error.toString();
         console.error(resMessage);
       if (resMessage!==null ) {
         AuthService.logout();
         history.push("/"); 
       }
     })});


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Admin</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={a}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Kenneth Shepherd</span>
              <span className="userShowUserTitle">Owner</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">User</span>
            </div>
            
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+94 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">abcd@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Colombo | Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

