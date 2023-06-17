// Command use: npm add chart.js react-chartjs-2
import { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
// import LineChart from './components/LineChart';
// import PieChart from './components/PieChart';
// import {UserData} from './Data'
import BarChartForm from './components/BarChartForm';
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
    setuserData({
      labels: UserData.map((data)=> data.label),
      datasets: [{
            label: "Age Vs name",
            data: UserData.map((data) => data.value),
            backgroundColor: colors,
            color:"yellow",
            borderColor: "grey",
            borderWidth: settings.borderWidth,
            responsive:true,
            hitRadius: settings.hitRadius,
            pointHoverRadius: 5,
            barPercentage: 0.9,
            barThickness: settings.barThickness,
            maxBarThickness: 60,
            // minBarLength: 50,
            // backgroundColor: "blue",
            borderSkipped: "bottom",
            borderRadius: 2,
            hoverBackgroundColor: "rgba(270, 240, 32, 0.2)",
            hoverBorderWidth:4,
            pointStyle: settings.pointStyle,
            // clip: {left: 5, top: false, right: -2, bottom: 0}
        },
      ],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserData,colors,settings]);

  const [userData,setuserData] =useState({
    labels: UserData.map((data)=> data.label),
    datasets: [{
          label: "Age vs Name",
          data: UserData.map((data) => data.value),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          color:"yellow",
          borderColor: "black",
          borderWidth: 2,
          responsive:true,
          hitRadius:0,
          pointHoverRadius: 20,
      },
    ],
  });

  // console.log(UserData);
  // console.log(userData);

  
  return (
    <div style={{display:'flex',height:"100%"}}>
      <Sidebar chartType={chartType} setChartType={setChartType} onLiveDataChange={handleLiveDataChange} colors={colors} newColor={newColor} setColors={setColors} setNewColor={setNewColor} settings={settings} setSettings={setSettings}/>
      
      <div className="barBackground">
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
