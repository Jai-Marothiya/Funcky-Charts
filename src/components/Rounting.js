import React, { useEffect, useState } from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import App from "../App";

import "../App.css";
import ResetPassword from "./Login/ResetPassword";

const Routing=()=>{
  const auth = getAuth();
  const [userDetails,setUserDetails]=useState({
    userName:"",
    userId:"",
    email:""
  });
  
  useEffect(() => {
    onAuthStateChanged(auth,async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("mai user hoon",user);
        await setUserDetails({userName:user.displayName,userId:uid,email:user.email});
        // You can use the UID here or set it to the component's state
      }
    });
  }, []);
  
  return (
    <div className="Router" style={{height: "100vh"}}>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={userDetails.userName!==""?<Home userDetails={userDetails} setUserDetails={setUserDetails} />:<Login  userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
            <Route exact path="/login" element={<Login  userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
            <Route exact path="/reset-password" element={<ResetPassword userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
            <Route exact path="/signup"element={<Signup  userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
            {userDetails.userName!=="" ?<Route exact path="/home" element={<Home  userDetails={userDetails} setUserDetails={setUserDetails}  />  }/> : <Route exact path="/login" element={<Login  userDetails={userDetails} setUserDetails={setUserDetails}/>}/>}
            {userDetails.userName!=="" ?<Route exact path="/app" element={<App  userDetails={userDetails} setUserDetails={setUserDetails} style={{height:"100vh"}}/> }/> : <Route exact path="/login" element={<Login  userDetails={userDetails} setUserDetails={setUserDetails}/>}/>}
          </Routes>
      </BrowserRouter>
    </div>
  );
  }

export default Routing;


