import React from "react";
import "./spinner.css";
import { Navigate,useNavigate,Link } from 'react-router-dom';


export default function Loader({chartData}) {
    const navigate=useNavigate();
    if(Object.keys(chartData).length !== 0){
        console.log(chartData);
        navigate("/app");
    }

    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
}