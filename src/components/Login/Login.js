import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../firebaseConfig';
import InputControl from "../InputControl/InputControl";
import styles from "./Login.module.css";


import { loginFields } from "../formFields";
import FormAction from "../FormAction";
import FormExtra from "../FormExtra";
import Input from "../input";
import Header from "../Header";

const fields=loginFields;
// let fieldsState = {};
// fields.forEach(field=>fieldsState[field.id]='');

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

    const handleSubmission = (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");
        console.log("Submitted");

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
    // <div className={styles.container}>
    //     <div className={styles.innerBox}>
    //     <h1 className={styles.heading}>Login</h1>

    //     <InputControl
    //         label="Email"
    //         type="email"
    //         name="email"
    //         onChange={event => handleInputs(event)}
    //         placeholder="Enter email address"
    //     />
    //     <InputControl
    //         label="Password"
    //         type="password"
    //         name="password"
    //         onChange={event => handleInputs(event)}
    //         placeholder="Enter Password"
    //     />

    //     <div className={styles.footer}>
    //         <b className={styles.error}>{errorMsg}</b>
    //         <button disabled={submitButtonDisabled} onClick={handleSubmission}>
    //         Login
    //         </button>
    //         <p>
    //         Already have an account?{" "}
    //         <span>
    //             <Link to="/signup">Sign up</Link>
    //         </span>
    //         </p>
    //     </div>
    //     </div>
    // </div>
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow-card">
            <div className="w-4/5 m-auto py-10">
                <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                    />
                <form className="mt-8 " onSubmit={handleSubmission }>
                    <div className="">
                        {
                            fields.map(field=>
                                    <Input
                                        key={field.id}
                                        handleChange={handleInputs}
                                        value={userData[field.id]}
                                        labelText={field.labelText}
                                        labelFor={field.labelFor}
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        isRequired={field.isRequired}
                                        placeholder={field.placeholder}
                                />
                            
                            )
                        }
                    </div>

                    <FormExtra/>
                    <p className='mt-4 text-red-500 text-center'>{errorMsg}</p>
                    <FormAction disabled={submitButtonDisabled} handleSubmit={handleSubmission } text="Login"/>
                </form>
            </div>
        </div>
    </div>
    );
    }

export default Login;