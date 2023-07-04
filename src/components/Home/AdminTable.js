import React from 'react'
import { useEffect, useState } from 'react';
import { Navigate,useNavigate,Link } from 'react-router-dom';
import { app ,database} from '../../firebaseConfig';
import {
  collection,addDoc,getDocs,doc,updateDoc,deleteDoc, onSnapshot
} from 'firebase/firestore';
const AdminTable = ({userProject,handleDelete}) => {
    const navigate = useNavigate();
    // console.log("AdminTable",dbInstance);

    const handleView =(id,UID,projectName,chartType,settings,dataSet)=>{
        // const data = JSON.parse(JSON.stringify(chartData));
        const data = {
            UID:UID,
            id:id,
            projectName:projectName,
            chartType:chartType,
            settings:settings,
            dataSet:dataSet,
        };
        //for deep copy we use below code
        let tempDataSet= JSON.parse(JSON.stringify(data));
        
        // console.log("chart data store kaise ",tempDataSet);
        localStorage.setItem('myChartData', JSON.stringify(tempDataSet));
        navigate("/app");
    }
    
    return (
        <div style={{margin:"2rem", width:"60%" , height:"fit-content"}}>
            <table className='Dashboardtable'>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Project Name</th>
                    <th>Chart Type</th>
                    <th>View</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>  
                   {userProject.map((project,index)=>{
                      return(
                        <tr key={project.id}>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                {project.projectName}
                            </td>
                            <td>
                                {project.chartType}
                            </td>
                            <td>
                                <button onClick={()=>handleView(project.id,project.UID,project.projectName,project.chartType,project.settings,project.dataSet)}>View</button>
                            </td>
                            <td>
                                <button onClick={()=>handleDelete(project.id,project.UID)}>Delete</button>                    
                            </td>
                        </tr>
                      );
                   })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminTable