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
    // ***********************modal*************************
    const [modal,setModal] = useState("none");
    const handlemodal= () => {
        modal==='none' ? setModal("block") : setModal("none");
    }

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
            modal==='none' ? setModal("block") : setModal("none");
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
            <div className='h-full flex flex-col justify-center items-center bg-dashboard'>
                <button onClick={handlemodal}>click me</button>
                <div className=" w-full h-full z-4 pt-1/20  bg-modalO fixed top-0 left-0" style={{display: modal}}>
                    <div className=" animate-[modal_0.5s_ease-in-out]  w-2/5 h-2/5 bg-white p-16  shadow-modal relative top-[33%] left-[33%] " >
                        <span onClick={handlemodal}>remove</span>
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