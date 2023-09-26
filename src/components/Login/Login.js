import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {app} from '../../firebaseConfig';
// import InputControl from "../InputControl/InputControl";
// import styles from "./Login.module.css";


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
    const googleProvider = new GoogleAuthProvider();
    // const facebookProvider = new FacebookAuthProvider();
    // const twitterProvider = new TwitterAuthProvider();
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
        // let checked = e.target.form[2].checked;
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
            await setUserDetails({userName:user.displayName,userId:user.uid,email:user.email});
            await setuserData({...userData,name:user.displayName,userId:user.uid});
            navigate("/home");
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
        })
    };

    const handleAuth=(e)=>{
        const authType = e.target.id;
        let provider;
        if(authType==="google"){
            provider=googleProvider;
        }
        // else if(authType==="facebook"){
        //     provider=facebookProvider;
        // }else if(authType==="twitter"){
        //     provider=twitterProvider;
        // }
        signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = (authType==="google" ? GoogleAuthProvider.credentialFromResult(result):(authType==="facebook"?FacebookAuthProvider.credentialFromResult(result):TwitterAuthProvider.credentialFromResult(result)));
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            await setUserDetails({userName:user.displayName,userId:user.uid});
            await setuserData({...userData,name:user.displayName,userId:user.uid});
            navigate("/home");
            // IdP data available using getAdditionalUserInfo(result)


            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const accessToken = credential.accessToken;
        }).catch((err) => {
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
        });
    }
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
                    <div className="flex flex-col mt-4">
                        <div className="flex justify-center items-center ">
                            <div className="bg-slate-400 h-px grow"></div>
                            <div className="mx-3 text-gray-500"> or sign in with </div>
                            <div className="bg-slate-400 h-px grow"></div>
                        </div>
                        <div>
                            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700  mt-6"
                                onClick={handleAuth} id="google">Continue with Google</button>
                            {/* <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700  mt-6"
                                onClick={handleAuth} id="facebook">Continue with Facebook</button>
                            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700  mt-6"
                                onClick={handleAuth} id="twitter" >Continue with Twitter</button> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
    }

export default Login;