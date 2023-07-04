import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {app} from '../../firebaseConfig';
import {getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../InputControl/InputControl";

import styles from "./Signup.module.css";

function Signup({userDetails,setUserDetails}) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }

        setuserData({ ...userData, ...inputs })
    }

    const handleSubmission = () => {
        if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
            setErrorMsg("Fill all fields");
            return;
        }

        if(userData.password!==userData.confirmPassword){
            setErrorMsg("Password not matched");
            return;
        }

        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth,userData.email,userData.password)
        .then(async(response)=>{
            setSubmitButtonDisabled(false);
            const user=response.user;

            await updateProfile(user, {
                displayName: userData.name,
            });
            await setUserDetails({userName:user.displayName,userId:user.uid});
            navigate("/login");
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
        })
    
        // alert("Signup user");
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Signup</h1>

                <InputControl
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    onChange={event => handleInputs(event)}
                />
                <InputControl
                    label="Email"
                    name="email"
                    placeholder="Enter email address"
                    type="email"
                    onChange={event => handleInputs(event)}
                />
                <InputControl
                    label="Password"
                    placeholder="Enter password"
                    name="password"
                    type="password"
                    onChange={event => handleInputs(event)}
                />
                <InputControl
                    label="Confirm Password"
                    placeholder="Enter password"
                    name="confirmPassword"
                    type="password"
                    onChange={event => handleInputs(event)}
                />

                <div className={styles.footer}>
                    <b className={styles.error}>{errorMsg}</b>
                    <button onClick={handleSubmission} disabled={submitButtonDisabled}>
                    Signup
                    </button>
                    <p>
                    Already have an account?{" "}
                    <span>
                        <Link to="/login">Login</Link>
                    </span>
                    </p>
                </div>
            </div>
        </div>
        );
    }

export default Signup;