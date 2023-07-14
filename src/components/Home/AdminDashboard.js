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
        indexAxis:'x',
        id:"",
        stacked: false,
        chartType:"",
        actualvalue:"",
        settings:{
            xText:"x-axis",
            yText:"y-axis", 
            legend: true,
            borderWidth: 2,
            hitRadius:5,
            barThickness: 30,
            pointStyle:"rect",
        },
        dataSet : [{
            id: uuidv4(),
            legend: `New-DataSet-1`,
            backgroundColor:"#2a71d0",
            borderColor: "#2a71d0",
            hoverBackgroundColor: "#2a71d0",
            hoverBorderColor:"#2a71d0",
            display: "none",
            data:[0,0,0],
            labels:['label-1','label-2','label-3'],
            labelsId:[1,2,3],
        }]
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

    const handleInputs = (e) => {
        let target = e.target.value;
        let temp = JSON.parse(JSON.stringify(newChart));

        temp[e.target.name]= e.target.value ;
        // console.log(e.target.options[e.target.selectedIndex].getAttribute('direction'));
        // console.log(e.target.options[e.target.selectedIndex].getAttribute('stacked'));
        if(e.target.name==="chartType"){
            temp.actualvalue = e.target.options[e.target.selectedIndex].getAttribute('actualvalue');
            if((target==="line" || target==="bar")){
                temp.indexAxis=e.target.options[e.target.selectedIndex].getAttribute('direction');
                temp.stacked = e.target.options[e.target.selectedIndex].getAttribute('stacked');
            }
        }
        console.log(temp);
        setNewChart(temp);
    }

    const handleCreate=()=>{
        addDoc(dbInstance,newChart)
        .then((response)=>{
            console.log(response.id);
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
                <button className='px-[25px] py-[15px] shadow-button  bg-white' onClick={handlemodal} >Create Project</button>
                <div className=" w-full h-full z-4 pt-1/20  bg-modalO fixed top-0 left-0" style={{display: modal}}>
                    <div className=" animate-[modal_0.5s_ease-in-out]  w-2/5 h-1/3 bg-white  shadow-modal relative top-[33%] left-[33%] flex flex-col pt-0 pb-6  pl-8 " >
                        <img className='self-end mt-2 mr-2 mb-8 w-3%  hover:rotate-[90deg] duration-500' onClick={handlemodal} src='../images/close.png' alt='close' />
                        
                        <InputControl
                            label="Project Name"
                            name="projectName"
                            placeholder="Enter Project Name"
                            type="text"
                            onChange={event => handleInputs(event)}
                        />

                        <select onChange={event => handleInputs(event)} name="chartType" placeholder='Select Chart Type' id="point_style" className='border border-solid border-cardinput rounded-[5px] py-[10px] px-[15px] mr-[30px] mb-[20px] outline-none' >
                            <option value="" disabled selected hidden  >Select Chart Type</option>
                            <option value="bar" direction="x" stacked="false" actualvalue="Vertical Bar" >Vertical Bar</option>
                            <option value="bar" direction="x" stacked="true" actualvalue="Vertical Stacked Bar" >Vertical Stacked Bar</option>
                            <option value="bar" direction="y" stacked="false" actualvalue="Horizontal Bar">Horizontal Bar</option>
                            <option value="bar" direction="y" stacked="true" actualvalue="Horizontal Stacked Bar">Horizontal Stacked Bar</option>
                            <option value="line" direction="x" stacked="false" actualvalue="Line">Line</option>
                            <option value="line" direction="y" stacked="false" actualvalue="Horizontal Line">Horizontal Line</option>
                            <option value="scatter" actualvalue="Scatter">Scatter</option>
                            <option value="pie" actualvalue="Pie">Pie</option>
                            <option value="doughnut" actualvalue="Doughnut">Doughnut</option>
                            <option value="radar" actualvalue="Radar">Radar</option>
                            <option value="polar" actualvalue="Polar">Polar</option>             
                        </select>
                        {/* <InputControl
                            label="Chart Type"
                            name="chartType"
                            placeholder="Enter chart Type"
                            type="text"
                            onChange={event => handleInputs(event)}
                        /> */}
                        <p className='mr-5'><img className='mx-auto w-6%' onClick={handleCreate} src='../images/add.png'  /></p>
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