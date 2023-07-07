import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { loginFields } from "../formFields";
import FormAction from "../FormAction";
import FormExtra from "../FormExtra";
import Input from "../input";
import Header from "../Header";

function ResetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const auth = getAuth();
  
    const triggerResetEmail = async (e) => {
        e.preventDefault();
        console.log("Password reset email sent", email);
        // alert("Password reset email sent");
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent", email);

        navigate("/login");
    }
    const handleInputs = (e) => {
        setEmail(e.target.value)
    }
   
    return (
    //   <div className="resetPassword-main">
    //     <input type="email" onChange={handleInputs} value={email} placeholder="Enter Email ...."/>
    //     <button className="resetBtn" type="button" onClick={triggerResetEmail}>Reset password</button>
    //   </div>
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow-card">
            <div className="w-4/5 m-auto py-10">
                <Header
                        heading="Reset the password of your account"
                        paragraph="If remember the password? "
                        linkName="Login"
                        linkUrl="/login"
                    />
                <form className="mt-8 " onSubmit={triggerResetEmail }>
                    <Input
                        handleChange={handleInputs}
                        value={email}
                        labelText="Email"
                        labelFor="Email"
                        name="email"
                        type="email"
                        isRequired={true}
                        placeholder="Enter Email..."
                    />

                    <FormAction  handleSubmit={triggerResetEmail} text="Reset Password"/>
                </form>
            </div>
        </div>
    </div>
    )
  }
  
  export default ResetPassword;