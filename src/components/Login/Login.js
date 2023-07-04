import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../firebaseConfig';
import InputControl from "../InputControl/InputControl";
import styles from "./Login.module.css";

function Login({userDetails,setUserDetails}) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [userData, setuserData] = useState({
        userId:"",
        name:"",
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
    
        setuserData({ ...userData, ...inputs })
    }

    const handleSubmission = () => {
        if (!userData.email || !userData.password) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth,userData.email,userData.password)
        .then(async (response)=>{
            setSubmitButtonDisabled(false);
            // alert("Login succesfully");
            const user=response.user;
            await setUserDetails({userName:user.displayName,userId:user.uid});
            await setuserData({...userData,name:user.displayName,userId:user.uid});
            navigate("/home");
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
            // alert(err.message);
        })
    };
    return (
    <div className={styles.container}>
        <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
            label="Email"
            type="email"
            name="email"
            onChange={event => handleInputs(event)}
            placeholder="Enter email address"
        />
        <InputControl
            label="Password"
            type="password"
            name="password"
            onChange={event => handleInputs(event)}
            placeholder="Enter Password"
        />

        <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
            </button>
            <p>
            Already have an account?{" "}
            <span>
                <Link to="/signup">Sign up</Link>
            </span>
            </p>
        </div>
        </div>
    </div>
    );
    }

export default Login;