// https://www.makeuseof.com/popup-window-html-css-javascript-create/
import React, { useState, useEffect, useRef} from 'react'
import InputControl from '../InputControl/InputControl';
import { app ,database} from '../../firebaseConfig';
import {
  collection,addDoc,getDocs,doc,updateDoc,deleteDoc,onSnapshot
} from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import AdminTable from './AdminTable';
import { v4 as uuidv4 } from 'uuid';

const AdminDashboard = () => {
    const auth = getAuth();
    const userId = useRef(null);
    const [newChart,setNewChart]=useState({
        UID: "",
        projectName:"",
        chartType:"",
        settings:{
            xText:"x-axis",
            yText:"y-axis", 
            legend: true,
            borderWidth: 2,
            hitRadius:5,
            barThickness: 30,
            pointStyle:"rect",
        },
        dataSet : []
    });
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            userId.current=uid;
            setNewChart({...newChart,UID:uid})
            // You can use the UID here or set it to the component's state
          }
        });
    }, []);

    if(!userId.current){
        userId.current="UnknownUser";
    }
    const dbInstance = collection(database,userId.current);

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
    
        setNewChart({ ...newChart, ...inputs })
    }

    const handleCreate=()=>{
        addDoc(dbInstance,newChart)
        .then((response)=>{
            alert("Data Saved");
        })
        .catch((err)=>{
          alert(err.message);
        }) 
    }

    const [userProject,setUserProject]=useState([]);

    const getData= ()=>{
        onSnapshot(dbInstance, (data)=>{
            setUserProject(data.docs.map((item)=>{
                // console.log("item",item);
                return {...item.data(),id:item.id};
            }));
            // console.log("user ka project",userProject);
        })
    }

    useEffect(()=>{
        getData();
    },[userId.current]);
    

    const handleDelete=(id,UID)=>{
        const dataToDelete = doc(database,UID,id);
        deleteDoc(dataToDelete)
        .then(()=>{
          alert("data deleted");
          getData();
        })
        .catch((err)=>{
          alert(err.message);
        })
    }
    
    return (

        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"90vh"}}>
            <div className="form" style={{width:"30%",height:"40%",background:"#bacbed", border:"1px solid red" , padding:"4rem"}}>
                <InputControl
                    label="Project Name"
                    name="projectName"
                    placeholder="Enter Project Name"
                    type="text"
                    onChange={event => handleInputs(event)}
                />
                <InputControl
                    label="Chart Type"
                    name="chartType"
                    placeholder="Enter chart Type"
                    type="text"
                    onChange={event => handleInputs(event)}
                />
                <button onClick={handleCreate}>Create</button>
            </div>

            <AdminTable userProject={userProject} handleDelete={handleDelete} />
        </div>
  )
}

export default AdminDashboard;


// const PostData =async(e)=>{
//     console.log("Data saved");
//     modalContent.classList.add("hidden-modal");
//     blurBg.classList.add("hidden-blur");

//     const{UID,Title,type}=newChart;

//    const res=await fetch("https://fir-auth-test-82235-default-rtdb.firebaseio.com/Chartform.json",
//    {
//        method:'POST',
//        headers:{
//            'Content-Type':'application/json'
//        },
//        body:JSON.stringify({
//         UID,
//         Title,
//         type,
//        })
//     })

//     if(res){
//         console.log(res);
//         alert("Data saved successfully");
//     }else{
//         alert("Fill data properly");
//     }
// }