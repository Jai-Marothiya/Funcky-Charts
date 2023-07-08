// Command use: npm add chart.js react-chartjs-2
// npm i file-saver(for download image from canva)
import { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
import Sidebar from './components/Sidebar';
import { app ,database} from './firebaseConfig';
import {
  collection,addDoc,getDocs,doc,updateDoc,deleteDoc
} from 'firebase/firestore';
import { saveAs } from 'file-saver'; 
function App() {
  const [chartData,setChartData]=useState({});
  const [disabled,setDisabled] = useState(true);
  /* Stored chartData data in localStorage */
  useEffect(() => {
    const storedData = localStorage.getItem('myChartData');
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
      if(Object.keys(chartData).length!==0){
        localStorage.setItem('myChartData', JSON.stringify(chartData));
      }
      setDisabled(false);
      console.log("appjnasjnjdkn",disabled);

      // if(Object.keys(chartData).length!==0){
      //   setChartProps({indexAxis:chartData.indexAxis,stacked: chartData.stacked,});
      
      //   const dataToUpdate = doc(database,chartData.UID,chartData.id);
      //   updateDoc(dataToUpdate,{
      //     settings:chartData.settings,
      //     dataSet:chartData.dataSet,
      //   })
      //   .then(()=>{
      //     console.log("update succesfully");
      //   })
      //   .catch((err)=>{
      //       alert(err.message);
      //   })
      // }
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
        barPercentage: 0.9,
        categoryPercentage: 1,
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
          responsive:true,
          hitRadius:chartData.settings.hitRadius,
          pointHoverRadius: 5,
          barPercentage: 0.9,
          categoryPercentage: 1,
          barThickness: chartData.settings.barThickness,
          // borderSkipped: "bottom",
          borderRadius: 2,
          fill:false,
          maxBarThickness: 60,
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
    indexAxis:'x',
    stacked: 'false',
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

  return (
    <div style={{display:'flex',height:"100%"}}>
      <Sidebar settings={chartData.settings} legends={legends} setLegends={setLegends} toggle={toggle} setToggle={setToggle} handleSettingChange={handleSettingChange} chartProps={chartProps} setChartProps={setChartProps} chartData={chartData} setChartData={setChartData} />
      
      <div className="barBackground">
          {/* <button onClick={handleEdit}>Charts</button> */}
        <p className='self-center'>
          <button id="save" disabled={disabled} onClick={SaveData} style={{opacity: disabled==="true" ? "100% ": "25% "}}>Save</button>
        </p>
        <div className="graphBackground">
          <p className=' self-end contents'><img className='w-[4%] ml-auto' onClick={downloadChart} src='./images/download.jpg' alt='download'/></p>
          <div className="barChartWrapper">
           {Object.keys(chartData).length!==0?<BarChart chartType={chartData.chartType} chartData={userData} settings={chartData.settings} chartProps={chartProps}/>:null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;