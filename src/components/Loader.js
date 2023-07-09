import React from "react";
import "./spinner.css";
import { Navigate,useNavigate,Link } from 'react-router-dom';


export default function Loader({chartData}) {
    return (
        <div className="spinner-container flex justify-center items-center h-1/4">
            <div className="loading-spinner"></div>
        </div>
    );
}