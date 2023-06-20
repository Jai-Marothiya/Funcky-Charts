import React, { useState, useEffect } from 'react';
import AddDataSet from './AddDataSet';

const Item = ({
  toggleSetting,
  setToggleSetting,
  handleAddField,
  data,
  handleDataLabel,
  handleDataValue,
  handleRemoveField,
  newColor,
  handleAddColor,
  handleRemoveColor,
  handleColorChange,
  colors,
  sideSet,
  handleSettingChange,
  legends,
  setLegends,
  dataSet,
  setDataSet
}) => {
  if (toggleSetting === "data") {
    return (
      <div className="data-section">
        <h2>Bar Chart Data Input</h2>
        <AddDataSet  legends={legends} setLegends={setLegends} dataSet={dataSet} setDataSet={setDataSet}/>
        <form onSubmit={handleAddField}>
          <input type="text" placeholder="Enter Label" required/>
          {/* <input type="number" step="0.01" placeholder="Enter Data" required/> */}
          <input type="submit" value="Add Data" />
        </form>

        <h2>Preview</h2>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Bar</th>
                {dataSet.map((data)=>{
                  return(
                    <th key={data.legend}>{data.legend}</th>
                  )
                })}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
              dataSet.length>0 ?(dataSet[0].labels).map((label, index) => {
    
                return (<tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="string"
                      value={label}
                      onChange={(e) => handleDataLabel(e, index)}
                      placeholder={`Label ${index + 1}`}
                    />
                  </td>
                  {dataSet.map((data)=>{
                        return(
                        <td key={data.legend}>
                          <input
                            type="number"
                            value={data.data[index]}
                            onChange={(e) => handleDataValue(e,data.legend, index)}
                            placeholder={`Value ${index + 1}`}
                          />
                        </td>)
                  })}
                  <td>
                    <button onClick={() => handleRemoveField(index)}>Remove</button>
                  </td>
                </tr>
                )}
              ):null
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <div className='color-section'>
        <h1>Chart with Custom Background Colors</h1>
        <div>
          <label htmlFor="colorInput">Enter a color:</label>
          <input
            type="color"
            id="colorInput"
            value={newColor}
            onChange={handleColorChange}
          />
          <button onClick={handleAddColor}>Add Color</button>
        </div>

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
      </div> */}
      <div className="customize">
                <form className="form">
                    <div className="customs">
                        <label htmlFor="x-axis" style={{width: "12%"}}>x-axis : </label>
                        <input className='customize-input' value={sideSet.xText}  type="text" id="x-axis" name="xText" style={{width: "40%"}} onChange={handleSettingChange}/>
                        <div style={{width: "50%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" name="xTitle" onClick={handleSettingChange} defaultChecked />
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                    <div className="customs">
                        <label htmlFor="y-axis" style={{width: "12%"}}>y-axis : </label>
                        <input className='setting-input'  value={sideSet.yText} type="text" id="y-axis" name="yText" style={{width: "40%"}} onChange={handleSettingChange}/>
                        <div style={{width: "50%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" name="yTitle" onClick={handleSettingChange} defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                    <div className="customs">
                        <label   style={{width: "20%"}}>Show Legend </label>
                        {/* <input type="text" id="y-axis" name="y-axis" style="width: 40%;">  */}
                        <div style={{width: "80%", textAlign: "end"}}>
                            <label className="switch">
                            <input type="checkbox" name="legend" onClick={handleSettingChange} defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                    <div className="customs">
                        <label htmlFor="width" style={{width: "30%"}}>Border Width :</label>
                        <input className='setting-input'  value={sideSet.borderWidth} type="number" id="width" name="borderWidth" onChange={handleSettingChange} /*style={{width: "8%"}}*//>
                        <div style={{width: "67%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                    <div className="customs">
                        <label htmlFor="hit_radius"  style={{width: "30%"}}>Hit Radius :</label>
                        <input className='setting-input'  value={sideSet.hitRadius} type="number" id="hit_radius" name="hitRadius" onChange={handleSettingChange}  /*style={{width: "8%"}}*//>
                        <div style={{width: "67%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                    <div className="customs">
                        <label htmlFor="bar_thickness" style={{width: "30%"}}>Bar Thickness :</label>
                        <input className='setting-input' value={sideSet.barThickness} type="number" id="bar_thickness" name="barThickness"  onChange={handleSettingChange} /*style={{width: "8%"}}*//>
                        <div style={{width: "67%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                    <div className="customs">
                        <label htmlFor="point_style" style={{width: "25%"}}>Point style :</label>
                        <select id="point_style"  value={sideSet.pointStyle} style={{width: "15%"}} name="pointStyle" onChange={handleSettingChange}>
                            <option>circle</option>
                            <option>triangle</option>
                            <option>cross</option>
                            <option>crossRot</option>
                            <option>dash</option>
                            <option>line</option>
                            <option>rect</option>
                            <option>rectRounded</option>
                            <option>rectRot</option>
                            <option>star</option>             
                        </select>
                        <div style={{width: "60%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                </form>
            </div>
    </div>
  );
};

const Sidebar = ({
  chartType,
  setChartType,
  onLiveDataChange,
  colors,
  setColors,
  newColor,
  setNewColor,
  // settings,
  setSettings,
  legends,
  setLegends,
  dataSet,
  setDataSet,
  toggle,
  setToggle
}) => {
  // const [toggle, setToggle] = useState("chart");

  const handleChartClick = (e) => {
    const target = e.target.alt;
    setChartType(target);
    setToggle("settings");
  };

  // const handleBack = () => {
  //   setToggle("chart");
  // };

  // const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setDataSet(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (dataSet.length > 0) {
      localStorage.setItem('myData', JSON.stringify(dataSet));
    }
  }, [dataSet]);

  // useEffect(() => {
  //   onLiveDataChange(dataSet);
  // }, [dataSet, onLiveDataChange]);
  //Done
  const handleDataLabel = (e, index) => {
    const newData = [...dataSet];
    newData.forEach((element) => {
      element.labels[index]=e.target.value;
    });
    // newData[index].label = e.target.value;
    setDataSet(newData);
  };

  
  const handleDataValue = (e,legend, index) => {
    let newData = [...dataSet];
    console.log(newData);
    let newDataSet = newData.find((data)=> data.legend===legend)
    newDataSet.data[index] = e.target.value;
    newData.every((data,idx)=>{
      if(data.legend===legend){
        newData[idx]=newDataSet;
        return false;
      }else{
        return true;
      }
    });
    console.log(newDataSet);
    setDataSet(newData);
    console.log(dataSet);
  };
  //Done
  const handleAddField = (e) => {
    e.preventDefault();
    const label = e.target.children[0].value;
    // const value = e.target.children[1].value;
    const newData = [...dataSet];
    console.log(dataSet);
    newData.forEach((element) => {
      console.log(element);
      console.log(element.labels);
      element.labels.push(label);
      element.data.push(0);
    });
    console.log(newData);
    setDataSet(newData);
    e.target.children[0].value = '';
    // e.target.children[1].value = '';
  };

  //Done(partially)
  const handleRemoveField = (index) => {
    const newData = [...dataSet];
    newData.forEach((element) => {
      element.labels.splice(index, 1);
      element.data.splice(index, 1);
    });
    // setData(newData);
    setDataSet(newData);
  };

  /******** Color Section Start ********/
  const handleColorChange = (event) => {
    setNewColor(event.target.value);
  };

  const handleAddColor = () => {
    setColors([...colors, newColor]);
    setNewColor('');
  };

  const handleRemoveColor = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
  };
  /******** Color Section End ********/

  const [toggleSetting, setToggleSetting] = useState("data");

  /******************* setting section part ***************/
  const [sideSet,setSideset]=useState({
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
  const handleSettingChange=(e)=>{
        // console.log(e.target.checked);
        console.log(e.target.type);
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(sideSet);
        let temp = Object.assign({}, sideSet);
        // console.log(temp);
        // console.log(temp[e.target.name]);
        if(e.target.type==="text" || e.target.type==="number" || e.target.type==="select-one"){
          temp[e.target.name]= e.target.value;
        }else if(e.target.type==="checkbox"){
          temp[e.target.name]= e.target.checked;
        }
        // console.log(temp);
        // console.log(temp[e.target.name]);
        setSettings(Object.assign({}, temp));
        setSideset(Object.assign({}, temp));
        console.log(sideSet);
  }

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem('mySettings');
    if (storedData) {
      setSideset(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever data changes
    localStorage.setItem('mySettings', JSON.stringify(sideSet));
  }, [sideSet]);

  if (toggle === "chart") {
    return (
      <div className="main">
          <div className="graphs">
            <div className="graphContainer">
              <div className="graphHeading">
                <p>Bar-Charts</p>
                <span>See All</span>
              </div>
              <div className="graphWrapper">
                <div className="graphIcon"></div>
                <ul className="graph-box">
                  <li className="box"><img src="../images/bar1.svg" alt="bar" onClick={handleChartClick} /></li>
                  <li className="box"><img src="../images/bar2.svg" alt="bar" /></li>
                  <li className="box"><img src="../images/bar3.svg" alt="bar" /></li>
                  <li className="box"><img src="../images/bar4.svg" alt="bar" /></li>
                </ul>
                <div className="icon"></div>
              </div>
            </div>
          </div>
          <div className="graphs">
            <div className="graphContainer">
              <div className="graphHeading">
                <p>Line and Dot Charts</p>
                <span>See All</span>
              </div>
              <div className="graphWrapper">
                <div className="graphIcon"></div>
                <ul className="graph-box">
                  <li className="box"><img src="../images/line1.svg" alt="line" onClick={handleChartClick} /></li>
                  <li className="box"><img src="../images/line2.svg" alt="line" /></li>
                  <li className="box"><img src="../images/line3.svg" alt="line" /></li>
                  <li className="box"><img src="../images/line4.svg" alt="line" /></li>
                </ul>
                <div className="icon"></div>
              </div>
            </div>
          </div>
          <div className="graphs">
            <div className="graphContainer">
              <div className="graphHeading">
                <p>Pie-Charts</p>
                <span>See All</span>
              </div>
              <div className="graphWrapper">
                <div className="graphIcon"></div>
                <ul className="graph-box">
                  <li className="box"><img src="../images/pie1.svg" alt="pie" onClick={handleChartClick} /></li>
                  <li className="box"><img src="../images/pie2.svg" alt="pie" /></li>
                </ul>
                <div className="icon"></div>
              </div>
            </div>
          </div>
      </div>
    );
  } else {
    return (
      <div className="setting" style={{ border: "1px solid red" }}>
        {/* <button className='back' onClick={handleBack} style={{width:"100%"}}>⬅ Back</button> */}
        <ul className="tabs-box">
          <li className="tab" style={{ borderRight: "1px solid lightgray" }}><button onClick={() => setToggleSetting("data")}><span>table</span></button></li>
          <li className="tab"><button onClick={() => setToggleSetting("setting")}><span>setting</span></button></li>
        </ul>
        <Item
          toggleSetting={toggleSetting}
          setToggleSetting={setToggleSetting}
          handleAddField={handleAddField}
          // data={data}
          handleDataLabel={handleDataLabel}
          handleDataValue={handleDataValue}
          handleRemoveField={handleRemoveField}
          newColor={newColor}
          handleAddColor={handleAddColor}
          handleRemoveColor={handleRemoveColor}
          handleColorChange={handleColorChange}
          colors={colors}
          sideSet={sideSet}
          handleSettingChange={handleSettingChange}
          legends={legends}
          setLegends={setLegends}
          dataSet={dataSet} 
          setDataSet={setDataSet}
        />
      </div>
    );
  }
}

export default Sidebar;
