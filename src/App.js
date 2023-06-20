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
  const [UserData, setUserData] = useState([]);
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState('');

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


  /************************ For AddDataSet Component **************************/
  const [legends,setLegends] = useState([]);
  const [dataSet,setDataSet] = useState([]);

  const handleLiveDataChange = (data) => {
    // console.log(data);
    setUserData(data);
  };

  // console.log(colors);
  // console.log(newColor);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem('myColor');
    if (storedData) {
      setColors(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever data changes
    if(colors.length>0)
    localStorage.setItem('myColor', JSON.stringify(colors));
  }, [colors]);

  // console.log(settings);
  useEffect(() => {
    let dataLabels = [];
    if(dataSet.length>0){
      dataLabels=dataSet[0].labels;
    }

    let tempDataSets = [];

    if(dataSet.length>0){
      dataSet.map((data)=>{
        let set={
          label: data.legend,
          data: data.data,
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
      })
    }
    setuserData({
      labels: dataLabels,
      datasets: tempDataSets,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserData,colors,settings,dataSet]);

  let dataLabels = [];
  if(dataSet.length>0){
    dataLabels=dataSet[0].labels;
  }

  console.log("App ka dataSet -> ",dataSet);
  console.log("App ka dataLabels -> ",dataLabels);

  let tempDataSets = [];

  if(dataSet.length>0){
    dataSet.map((data)=>{
      let set={
        label: data.legend,
        data: data.data,
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
    })
  }
  console.log("chart ka dataSet -> ",tempDataSets);
  const [userData,setuserData] =useState({
    labels: dataLabels,
    datasets: tempDataSets,
  });

  // console.log(UserData);
  // console.log(userData);

  
  return (
    <div style={{display:'flex',height:"100%"}}>
      <Sidebar chartType={chartType} setChartType={setChartType} onLiveDataChange={handleLiveDataChange} colors={colors} newColor={newColor} setColors={setColors} setNewColor={setNewColor} settings={settings} setSettings={setSettings}
      legends={legends} setLegends={setLegends} dataSet={dataSet} setDataSet={setDataSet}/>
      
      <div className="barBackground">
        <button>EDIT</button>
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


/*
const [userData,setUserData] =useState({
    labels: UserData.map((data)=> data.year),
    datasets: [{
          label: "Users Gained",
          data: UserData.map((data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          color:"white",
          borderColor: "black",
          borderWidth: 2,
          responsive:true,
          hitRadius:30,
          pointHoverRadius: 20,
      },
      {
        label: "Users Lost",
        data: UserData.map((data) => data.userLost),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
        responsive:true,
        hitRadius:5,
        pointHoverRadius: 15,
    },
    ],
  });

  
  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: 700 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
*/



/*****************Working prototype ************/

/***Start*****/
/*
<div>
    <h1>My Bar Chart App</h1>
    <div>
        <h1>Chart with Custom Background Colors</h1>
    <div>
    <label htmlFor="colorInput">Enter a color:</label>
    <input type="color" id="colorInput" value={newColor} onChange={handleColorChange}/>
    <button onClick={handleAddColor}>Add Color</button>
</div>

<div>
    <h3>Selected Colors:</h3>
    <ul>
      {colors.map((color, index) => (
        <li key={index}>
          <span
            style={{
              backgroundColor: color,
              width: '20px',
              height: '20px',
              display: 'inline-block',
              marginRight: '5px',
            }}
          ></span>
          {color}
          <button onClick={() => handleRemoveColor(index)}>Remove</button>
        </li>
      ))}
    </ul>
    <button onClick={generateChart}>Generate Chart</button> 
</div>

<canvas id="myChart"></canvas>
</div>
  <BarChartForm onLiveDataChange={handleLiveDataChange} />
</div>

<div style={{ width: 700 }}>
  <BarChart chartData={userData} />
</div>




*/
