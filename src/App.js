// Command use: npm add chart.js react-chartjs-2
// npm i file-saver(for download image from canva)
import {React, useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import Sidebar from './components/Sidebar';
import { app,database} from './firebaseConfig';
import {
  doc,updateDoc
} from 'firebase/firestore';
import { saveAs } from 'file-saver'; 
function App() {
  const [chartData,setChartData]=useState({});
  const [disabled,setDisabled] = useState(false);
  /* Stored chartData data in localStorage */
  useEffect(() => {
    const storedData = localStorage.getItem('myChartData');
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }
  }, []);
  const [userProject,setUserProject]=useState([]);
  useEffect(() => {
      
      // if(chartData!==JSON.parse(localStorage.getItem('myChartData')))
      
      if(Object.keys(chartData).length!==0){
        
        localStorage.setItem('myChartData', JSON.stringify(chartData));
      }

  }, [chartData]);

  /********************* Chart Data End  *******************/
 
  const [toggle, setToggle] = useState("setting");

  /********* Side bar settings section ******/
  const handleSettingChange=(e)=>{
    let temp = Object.assign({}, chartData.settings);

    if(e.target.type==="text" || e.target.type==="number" || e.target.type==="select-one"){
      temp[e.target.name]= e.target.value;
    }else if(e.target.type==="checkbox"){
      temp[e.target.name]= e.target.checked;
    }

    setChartData({...chartData,settings:temp});
  }


  /******** For AddDataSet Component **********/
  const [legends,setLegends] = useState([]);

  /* Initializing userData */
  let dataLabels = [];
  if(Object.keys(chartData).length!==0 && chartData.dataSet.length>0){
    dataLabels=[...chartData.dataSet[0].labels];
  }

  let tempDataSets = [];

  if(Object.keys(chartData).length!==0 && chartData.dataSet.length>0){
    chartData.dataSet.map((data)=>{
      let set={
        label: data.legend,
        data: [...data.data],
        backgroundColor: [
          data.backgroundColor
        ],
        color:"yellow",
        borderColor: data.borderColor,
        borderWidth: 2,
        responsive:true,
        hitRadius:0,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
        fill:false,
        pointHoverRadius: 20,
        hoverBackgroundColor: data.hoverBackgroundColor,
        hoverBorderColor:data.hoverBorderColor,
      }
      tempDataSets.push(set);
      return null ;
    })
  }

  const [userData,setuserData] =useState({
    labels: dataLabels,
    datasets: tempDataSets,
  });

  /* update userData, whenever either "dataSet" or "settings" will change */
  useEffect(() => {
    let dataLabels = [];
    if(Object.keys(chartData).length!==0 && chartData.dataSet.length>0){
      dataLabels=[...chartData.dataSet[0].labels];
    }

    let tempDataSets = [];

    if(Object.keys(chartData).length!==0 && chartData.dataSet.length>0){
      chartData.dataSet.map((data)=>{
        let set={
          label: data.legend,
          data: [...data.data],
          backgroundColor: [data.backgroundColor],
          borderColor: data.borderColor,
          hoverBackgroundColor: data.hoverBackgroundColor,
          hoverBorderColor:data.hoverBorderColor,
          hoverBorderWidth:4,
          color:"yellow",
          borderWidth: chartData.settings.borderWidth,
          responsive:false,
          hitRadius:chartData.settings.hitRadius,
          pointHoverRadius: 5,
          // barThickness: chartData.settings.barThickness,
          // borderSkipped: "bottom",
          borderRadius: 2,
          fill:false,
          grouped:true,
          skipNull:true,
          // clip: {left: 20, top: false, right: 5, bottom: 0},
          // maxBarThickness: 60,
          pointStyle: chartData.settings.pointStyle,
        }
        tempDataSets.push(set);
        return null ;
      })
    }
    setuserData({
      labels: dataLabels,
      datasets: tempDataSets,
    });
  }, [chartData]);

  /* When we click on Edit button it will alter toggle from "chart" to "data" and vice versa */
  const handleEdit = (e) => {
    let temp=(toggle==="chart"?"setting":"chart");
    setToggle(temp);
  };

  /* Different Bar charts Input like indexAxis, stacked */
  const [chartProps,setChartProps] = useState({
    indexAxis:chartData.indexAxis,
    stacked: chartData.stacked,
  })

  const downloadChart=()=> {
    //save to png
    const canvasSave = document.getElementById('stackD');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "chart.png")
    })
  }

  const SaveData=()=>{
    if(Object.keys(chartData).length!==0){
      const dataToUpdate = doc(database,chartData.UID,chartData.id);
      updateDoc(dataToUpdate,{
        settings:chartData.settings,
        dataSet:chartData.dataSet,
      })
      .then(()=>{
        console.log("update succesfully");
      })
      .catch((err)=>{
          alert(err.message);
      })
    }
  }

  //*************************** */ modal*************************
  const [modal,setModal] = useState("none");
  const handlemodal= () => {
    modal==='none' ? setModal("block") : setModal("none");
  }

  return (
    <div style={{display:'flex',height:"100%"}}>
      <Sidebar settings={chartData.settings} legends={legends} setLegends={setLegends} toggle={toggle} setToggle={setToggle} handleSettingChange={handleSettingChange} chartProps={chartProps} setChartProps={setChartProps} chartData={chartData} setChartData={setChartData} />
      
      <div className="barBackground">
          {/* <button onClick={handleEdit}>Charts</button> */}
        <p className='self-center'>
          <button id="save" disabled={disabled} onClick={SaveData} style={{opacity: (disabled===true ? 0.25 : 1)}}>Save</button>
        </p>
        <div className="graphBackground">
          <p className='h-[4%] bg flex justify-end items-center gap-[20px] mt-[5px]'>
            <img className='w-fit h-[90%] ' onClick={downloadChart} src='./images/download.svg' alt='download'/>
            <img className='w-fit h-[90%] mr-[10px]' onClick={handlemodal} src='./images/eye.svg' alt='eye'/>
          </p>
          <div className="barChartWrapper">
            {Object.keys(chartData).length!==0?<BarChart chartType={chartData.chartType} chartData={userData} settings={chartData.settings} chartProps={chartProps}/>:null}
          </div>
        </div>

        <div className="  w-full h-full z-4 pt-1/20   fixed top-0 left-0" style={{display: modal}}>
          <div className=" w-full h-full   bg-white  shadow-modal relative  flex flex-col" >
            <p className='h-[3%]  flex justify-end items-center gap-[20px] mt-[5px] '>
              <img className='w-fit h-[90%]' onClick={downloadChart} src='./images/download.svg' alt='download'/>
              <img className='w-fit h-[90%] self-end mr-[10px]    hover:rotate-[90deg] duration-500' onClick={handlemodal} src='../images/close.svg' alt='close' />
            </p>
            <div className="w-full h-full flex justify-center items-center">
              {Object.keys(chartData).length!==0?<BarChart chartType={chartData.chartType} width="100%" height="90%"  chartData={userData} settings={chartData.settings} chartProps={chartProps} options={{ maintainAspectRatio: false }}/>:null}
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
}

export default App;