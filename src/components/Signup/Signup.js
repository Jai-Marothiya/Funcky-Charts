import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {app} from '../../firebaseConfig';
import {getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// import InputControl from "../InputControl/InputControl";

// import styles from "./Signup.module.css";


import { signupFields } from "../formFields";
import FormAction from "../FormAction";
import Input from "../input";
import Header from "../Header";

const fields=signupFields;

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

    const handleSubmission = (e) => {
        e.preventDefault();
        console.log("onSubmit");
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
        console.log("outside");
        createUserWithEmailAndPassword(auth,userData.email,userData.password)
        .then(async(response)=>{
            setSubmitButtonDisabled(false);
            const user=response.user;
            console.log(user);
            await updateProfile(user, {
                displayName: userData.name,
            });
            await setUserDetails({userName:user.displayName,userId:user.uid,email:user.email});
            navigate("/login");
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
        })
    
        // alert("Signup user");
    };

    return (
        <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 shadow-card'>
                    <div className="w-4/5  m-auto py-10">
                        <Header
                        heading="Signup to create an account"
                        paragraph="Already have an account? "
                        linkName="Login"
                        linkUrl="/"
                        />
                        <form className="mt-8 space-y-6" onSubmit={handleSubmission} >
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
                            <FormAction handleSubmit={handleSubmission} text="Signup" />
                            </div>
                        </form>
                </div>
            </div>
        </div>
        );
    }

export default Signup;