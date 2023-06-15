import React, { useState, useEffect } from 'react';

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
  colors
}) => {
  if (toggleSetting === "data") {
    return (
      <div>
        <h2>Bar Chart Data Input</h2>
        <form onSubmit={handleAddField}>
          <input type="text" placeholder="Enter Label" />
          <input type="number" step="0.01" placeholder="Enter Data" />
          <input type="submit" value="Add Data" />
        </form>

        <h2>Preview</h2>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Bar</th>
                <th>Value</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="string"
                      value={item.label}
                      onChange={(e) => handleDataLabel(e, index)}
                      placeholder={`Value ${index + 1}`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => handleDataValue(e, index)}
                      placeholder={`Value ${index + 1}`}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleRemoveField(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className='color-section'>
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
  setNewColor
}) => {
  const [toggle, setToggle] = useState("chart");

  const handleChartClick = (e) => {
    const target = e.target.alt;
    setChartType(target);
    setToggle("settings");
  };

  const handleBack = () => {
    setToggle("chart");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('myData', JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    onLiveDataChange(data);
  }, [data, onLiveDataChange]);

  const handleDataLabel = (e, index) => {
    const newData = [...data];
    newData[index].label = e.target.value;
    setData(newData);
  };

  const handleDataValue = (e, index) => {
    const newData = [...data];
    newData[index].value = e.target.value;
    setData(newData);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const label = e.target.children[0].value;
    const value = e.target.children[1].value;
    const newData = [
      ...data,
      {
        label: label,
        value: value,
      },
    ];
    setData(newData);
    e.target.children[0].value = '';
    e.target.children[1].value = '';
  };

  const handleRemoveField = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

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

  const [toggleSetting, setToggleSetting] = useState("data");

  if (toggle === "chart") {
    return (
      <div className="main">
        <div className="mainleft">
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
      </div>
    );
  } else {
    return (
      <div className="setting" style={{ border: "1px solid red" }}>
        <button onClick={handleBack} style={{width:"100%"}}>⬅ Back</button>
        <ul className="tabs-box">
          <li className="tab" style={{ borderRight: "1px solid lightgray" }}><button onClick={() => setToggleSetting("data")}><span>table</span></button></li>
          <li className="tab"><button onClick={() => setToggleSetting("setting")}><span>setting</span></button></li>
        </ul>
        <Item
          toggleSetting={toggleSetting}
          setToggleSetting={setToggleSetting}
          handleAddField={handleAddField}
          data={data}
          handleDataLabel={handleDataLabel}
          handleDataValue={handleDataValue}
          handleRemoveField={handleRemoveField}
          newColor={newColor}
          handleAddColor={handleAddColor}
          handleRemoveColor={handleRemoveColor}
          handleColorChange={handleColorChange}
          colors={colors}
        />
      </div>
    );
  }
}

export default Sidebar;
