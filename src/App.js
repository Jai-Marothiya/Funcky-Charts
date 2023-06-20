// Command use: npm add chart.js react-chartjs-2
import { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
// import LineChart from './components/LineChart';
// import PieChart from './components/PieChart';
// import {UserData} from './Data'
// import BarChartForm from './components/BarChartForm';
import Sidebar from './components/Sidebar';

function App() {
  const [toggle, setToggle] = useState("chart");
  const [chartType,setChartType]=useState();


  /************************* Side bar settings section **************/
  const [settings,setSettings]=useState({
    xTitle:true,
    xText:"x-axis",
    yTitle:true,
    yText:"y-axis", 
    legend: true,
    borderWidth: 2,
    hitRadius:5,
    barThickness: 30,
    pointStyle:"rect",
  });

  useEffect(() => {
    // Load settings-data from local storage on component mount
    const storedData = localStorage.getItem('mySettings');
    if (storedData) {
      setSettings(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever data changes
    localStorage.setItem('mySettings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange=(e)=>{
    let temp = Object.assign({}, settings);

    if(e.target.type==="text" || e.target.type==="number" || e.target.type==="select-one"){
      temp[e.target.name]= e.target.value;
    }else if(e.target.type==="checkbox"){
      temp[e.target.name]= e.target.checked;
    }

    setSettings(Object.assign({}, temp));
  }


  /************************ For AddDataSet Component **************************/
  const [legends,setLegends] = useState([]);
  const [dataSet,setDataSet] = useState([]);

  /* Stored dataSet data in localStorage */
  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setDataSet(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
      if(dataSet.length>0){
        localStorage.setItem('myData', JSON.stringify(dataSet));
      }
  }, [dataSet]);


  /* Initializing userData */
  let dataLabels = [];
  if(dataSet.length>0){
    dataLabels=[...dataSet[0].labels];
  }

  let tempDataSets = [];

  if(dataSet.length>0){
    dataSet.map((data)=>{
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
    if(dataSet.length>0){
      dataLabels=[...dataSet[0].labels];
    }

    let tempDataSets = [];

    if(dataSet.length>0){
      dataSet.map((data)=>{
        let set={
          label: data.legend,
          data: [...data.data],
          backgroundColor: [data.backgroundColor],
          borderColor: data.borderColor,
          hoverBackgroundColor: data.hoverBackgroundColor,
          hoverBorderColor:data.hoverBorderColor,
          hoverBorderWidth:4,
          color:"yellow",
          borderWidth: settings.borderWidth,
          responsive:true,
          hitRadius: settings.hitRadius,
          pointHoverRadius: 5,
          barPercentage: 0.9,
          barThickness: settings.barThickness,
          borderSkipped: "bottom",
          borderRadius: 2,
          maxBarThickness: 60,
          pointStyle: settings.pointStyle,
        }
        tempDataSets.push(set);
        return null ;
      })
    }
    setuserData({
      labels: dataLabels,
      datasets: tempDataSets,
    });
  }, [settings,dataSet]);

  /* When we click on Edit button it will alter toggle from "chart" to "data" and vice versa */
  const handleEdit = () => {
    let temp=(toggle==="chart"?"setting":"chart");
    setToggle(temp);
  };

  
  return (
    <div style={{display:'flex',height:"100%"}}>
      <Sidebar setChartType={setChartType} settings={settings} setSettings={setSettings}  legends={legends} setLegends={setLegends} dataSet={dataSet} setDataSet={setDataSet} toggle={toggle} setToggle={setToggle} handleSettingChange={handleSettingChange}/>
      
      <div className="barBackground">
        <button onClick={handleEdit}>EDIT</button>
        <div className="graphBackground">
          <div className="barChartWrapper">
            <BarChart chartType={chartType} chartData={userData} settings={settings}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
