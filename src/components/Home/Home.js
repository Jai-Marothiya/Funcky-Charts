import React, {useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import {getAuth,signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import AdminNavbar from "./AdminNavbar";
import AdminDashboard from "./AdminDashboard";

function Home({userDetails,setUserDetails,chartData,setChartData}) {

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth,async (user) => {
          if (user) {
            const uid = user.uid;
            await setUserDetails({...userDetails,userName:user.displayName,userId:uid});
            // You can use the UID here or set it to the component's state
          }
        });
    }, []);

    const handleSignOut = () =>{
        
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            navigate("/login");
            setUserDetails({...userDetails,userName:"",userId:""});
        })
        .catch((error) => {
            // An error happened.
            alert("Meri likhi hui error");
        });
    }

    return (
        <div style={{height:"100vh"}}>
            <AdminNavbar userDetails={userDetails} setUserDetails={setUserDetails} handleSignOut={handleSignOut} />

            <AdminDashboard userDetails={userDetails} setUserDetails={setUserDetails} chartData={chartData} setChartData={setChartData}/>        
        </div>
    );
}

export default Home;
// Footer
// © 2023 GitHub, Inc.
// Footer navigation
// Terms