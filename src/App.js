// Command use: npm add chart.js react-chartjs-2
import { useState, useEffect } from 'react';
import './App.css';
import BarChart from './components/BarChart';
// import LineChart from './components/LineChart';
// import PieChart from './components/PieChart';
// import {UserData} from './Data'
import BarChartForm from './components/BarChartForm';

function App() {
  const [UserData, setUserData] = useState([]);

  const handleLiveDataChange = (data) => {
    // console.log(data);
    setUserData(data);
  };

  useEffect(() => {
    setuserData({
      labels: UserData.map((data)=> data.label),
      datasets: [{
            label: "Users Gained",
            data: UserData.map((data) => data.value),
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
      ],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserData]);

  const [userData,setuserData] =useState({
    labels: UserData.map((data)=> data.label),
    datasets: [{
          label: "Users Gained",
          data: UserData.map((data) => data.value),
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
    ],
  });

  // console.log(UserData);
  // console.log(userData);

  return (
    <div>
      <h1>My Bar Chart App</h1>
      <BarChartForm onLiveDataChange={handleLiveDataChange} />
      {/* <h2>Live Data</h2>
      <pre>{JSON.stringify(UserData, null, 2)}</pre> */}
      <div style={{ width: 700 }}>
        <BarChart chartData={userData} />
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
