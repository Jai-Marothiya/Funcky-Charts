import React, { useState} from 'react';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';
const Sidebar = ({
  setChartType,
  settings,
  handleSettingChange,
  legends,
  setLegends,
  dataSet,
  setDataSet,
  toggle,
  setToggle,
  chartProps,
  setChartProps
}) => {
  const [toggleSetting, setToggleSetting] = useState("data");
  
  /**** set tab of side bar customize tabs and onclick event****/
  /** It will may be remove **/
  // const handleMouseEnter=(e)=>{
  //     const temp=e.currentTarget.id;
  //     if(toggleSetting!==temp){
  //       e.target.style.background="#ddd";
  //     }
  // }

  // const handleMouseLeave=(e)=>{
  //     const temp=e.currentTarget.id;
  //     if(temp!==toggleSetting){
  //       e.target.style.background="#f1f1f1";
  //     }
  // }

  /* When we will click on chart: 1. It will set chartType i.e. which chart user want to see 2. It will change toggle(In App.js) to "settings"  */
  const handleChartClick = (e) => {
    const target = e.target.alt;
    setChartType(target);
    setToggle("settings");
    if(target==="bar" || target==="line"){
      let temp = Object.assign({}, chartProps);
      temp.indexAxis = e.target.attributes.direction.value;
      temp.stacked = e.target.attributes.stacked.value==="true"?true:false;
      setChartProps(temp);
    }
  };

  /* When we submit Add Label form then it will call(here it is call from Item.js)*/
  const handleAddField = () => {
    const newData = JSON.parse(JSON.stringify(dataSet));
    let index=0;
    if(dataSet.length>0){
      index=dataSet[0].labels.length;
    }
    newData.forEach((element) => {
      element.labels.push(`label-${index+1}`);
      console.log(element);
      element.labelsId.push(uuidv4());
      element.data.push(0);
    });

    setDataSet(newData);
  };

  /* When we edit any label from table then it will called(It is also call from Item.js) */
  const handleDataLabel = (e, index) => {
    const newData = JSON.parse(JSON.stringify(dataSet));
    newData.forEach((element) => {
      element.labels[index]=e.target.value;
    });
    setDataSet(newData);
  };

  /* When we edit any data of any legend from table then it will called. (It is also call from Item.js) */
  const handleDataValue = (e,id,index) => {
    // console.log(index," -> ", legend);
    let newData = JSON.parse(JSON.stringify(dataSet));
    let newDataSet = newData.find((data)=> data.id===id)
    newDataSet.data[index] = e.target.value;
    newData.every((data,idx)=>{
      if(data.id===id){
        newData[idx]=newDataSet;
        return false;
      }else{
        return true;
      }
    });
    setDataSet(newData);
  };

  /* When we Click on remove button in the table then it will call.(here it is call from Item.js)*/
  const handleRemoveField = (index) => {
    const newData = JSON.parse(JSON.stringify(dataSet));
    newData.forEach((element) => {
      element.labels.splice(index, 1);
      element.labelsId.splice(index, 1);
      element.data.splice(index, 1);
    });
    setDataSet(newData);
  };

  /* Set props when we click on particular chart */

  const handleSlider=(e)=>{
      console.log(e);
      console.log(e.target.parentElement.parentElement.style.width);
      let width = e.target.parentElement.parentElement.style.width;
      e.target.parentElement.parentElement.style.width=width==="30%"?"4rem":"30%";
      e.target.parentElement.parentElement.nextElementSibling.style.width=width==="30%"?"99%":"70%";
      let rot=e.target.style.transform;
      e.target.style.transform= rot==="rotate(180deg)"?"rotate(0deg)":"rotate(180deg)";
  }

  if (toggle === "chart") {
    return (
      <div style={{display:"flex", width:"30%",transition:"all 0.4s"}}>
        <div className="main">
            <div className="graphs">
              <div className="graphContainer">
                <div className="graphHeading">
                  <p>Bar-Charts</p>
                  {/* <span>See All</span> */}
                </div>
                <div className="graphWrapper">
                  <div className="graphIcon"></div>
                  <ul className="graph-box">
                    <li className="box"><img src="../images/bar1.svg" alt="bar" direction="x" stacked="false"  onClick={handleChartClick} /></li>
                    <li className="box"><img src="../images/bar2.svg" alt="bar" direction="x" stacked="true" onClick={handleChartClick}/></li>
                    <li className="box"><img src="../images/bar3.svg" alt="bar" direction="y" stacked="false" onClick={handleChartClick}/></li>
                    <li className="box"><img src="../images/bar4.svg" alt="bar" direction="y" stacked="true" onClick={handleChartClick}/></li>
                  </ul>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="graphs">
              <div className="graphContainer">
                <div className="graphHeading">
                  <p>Line and Dot Charts</p>
                </div>
                <div className="graphWrapper">
                  <div className="graphIcon"></div>
                  <ul className="graph-box">
                    <li className="box"><img src="../images/line1.svg" alt="line" direction="x" stacked="false" onClick={handleChartClick} /></li>
                    <li className="box"><img src="../images/line2.svg" alt="scatter" onClick={handleChartClick}/></li>
                    <li className="box"><img src="../images/line4.svg" alt="line" direction="y" stacked="false" onClick={handleChartClick} /></li>
                  </ul>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="graphs">
              <div className="graphContainer">
                <div className="graphHeading">
                  <p>Pie-Charts</p>
                </div>
                <div className="graphWrapper">
                  <div className="graphIcon"></div>
                  <ul className="graph-box">
                    <li className="box"><img src="../images/pie1.svg" alt="pie" onClick={handleChartClick} /></li>
                    <li className="box"><img src="../images/pie2.svg" alt="doughnut" onClick={handleChartClick} /></li>
                  </ul>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="graphs">
              <div className="graphContainer">
                <div className="graphHeading">
                  <p>Polar-Area-Charts</p>
                </div>
                <div className="graphWrapper">
                  <div className="graphIcon"></div>
                  <ul className="graph-box">
                    <li className="box"><img src="../images/polar_area2.png" alt="polar" onClick={handleChartClick} /></li>
                  </ul>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
            <div className="graphs">
              <div className="graphContainer">
                <div className="graphHeading">
                  <p>Radar-Charts</p>
                </div>
                <div className="graphWrapper">
                  <div className="graphIcon"></div>
                  <ul className="graph-box">
                    <li className="box"><img src="../images/radar_chart.png" alt="radar" onClick={handleChartClick} /></li>
                  </ul>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', alignItems:"center", background:"rgb(186, 203, 237)"}}>
          <img src='./images/slider.svg' alt='slider' style={{filter:'invert(0)',width:"2.5rem",height:"8rem",transition: "all 0.5s ease 0s"}} onClick={handleSlider}/>
        </div>
      </div>
    );
  } else {
    return (
    <div style={{display:"flex", width:"30%",transition:"all 0.4s"}}>
      <div className="setting">
        {/* <button className='back' onClick={handleBack} style={{width:"100%"}}>⬅ Back</button> */}
        <ul className="tabs-box">
          <li className="tab" ><button className="bg-slate-500 hover:bg-slate-600" id="data" onClick={() => setToggleSetting("data")} style={{background: toggleSetting==="data" ? "#1F2A40" : "#BACBED",color:toggleSetting==="data" ? "white" : "#1F2A40"}}><span>table</span></button></li>
          <li className="tab"><button id="setting" onClick={() => setToggleSetting("setting")} style={{background: toggleSetting==="setting" ? "#1F2A40" : "#BACBED",color:toggleSetting==="setting" ? "white" : "#1F2A40"}}><span>setting</span></button></li>
        </ul>
        <Item
          toggleSetting={toggleSetting}
          handleAddField={handleAddField}
          handleDataLabel={handleDataLabel}
          handleDataValue={handleDataValue}
          handleRemoveField={handleRemoveField}
          settings={settings}
          handleSettingChange={handleSettingChange}
          legends={legends}
          setLegends={setLegends}
          dataSet={dataSet} 
          setDataSet={setDataSet}
        />
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems:"center", background:"rgb(186, 203, 237)"}}>
          <img src='./images/slider.svg' alt='slider' style={{filter:'invert(0)',width:"2.5rem",height:"8rem",transition: "all 0.5s ease 0s"}} onClick={handleSlider}/>
      </div>
  </div>
    );
  }
}

export default Sidebar;