import React from 'react';
import { useState,useEffect,useRef } from 'react';

const Sidebar = ({chartType,setChartType,onLiveDataChange,colors, setColors, newColor, setNewColor}) => {
    //Chart side setting
    const [toggle,setToggle]=useState("chart");
  
    const handleChartClick=(e)=>{
        const target=e.target.alt;
        setChartType(target);
        setToggle("settings");
    }

    const handleBack=()=>{
        setToggle("chart");
    }

    /*********** Data side setting **********/


    const [data, setData] = useState([]);

    useEffect(() => {
        // Load data from local storage on component mount
        const storedData = localStorage.getItem('myData');
        console.log(storedData);
        if (storedData) {
        setData(JSON.parse(storedData));
        }
    }, []);
    // console.log(localStorage.getItem('myData'));

    useEffect(() => {
        // Update local storage whenever data changes
        if(data.length>0)
        localStorage.setItem('myData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        onLiveDataChange(data);
    }, [data, onLiveDataChange]);

    const handleDataLabel = (e, index) => {
        const newData = [...data];
        // console.log(newData[index]);
        // console.log(typeof(e.target.value));

        // if(typeof(e.target.value)==='string'){
        newData[index].label = e.target.value;
        // }else{
        //   newData[index].value = e.target.value;
        // }
        // console.log(data);

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
        console.log(newData);
        setData(newData);
        e.target.children[0].value = '';
        e.target.children[1].value = '';
    };

    const handleRemoveField = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    /******** Color setting  ******/
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

    if(toggle==="chart"){
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
                                        <li className="box"><img src="../images/bar1.svg" alt="bar" onClick={handleChartClick}/></li>
                                        <li className="box"><img src="../images/bar2.svg" alt="bar"/></li>
                                        <li className="box"><img src="../images/bar3.svg" alt="bar"/></li>
                                        <li className="box"><img src="../images/bar4.svg" alt="bar"/></li>
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
                                        <li className="box"><img src="../images/line1.svg" alt="line" onClick={handleChartClick}/></li>
                                        <li className="box"><img src="../images/line2.svg" alt="line"/></li>
                                        <li className="box"><img src="../images/line3.svg" alt="line"/></li>
                                        <li className="box"><img src="../images/line4.svg" alt="line"/></li>
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
                                        <li className="box"><img src="../images/pie1.svg" alt="pie" onClick={handleChartClick}/></li>
                                        <li className="box"><img src="../images/pie2.svg" alt="pie"/></li>
                                        {/* <!-- <li class="box"><img src="line3.svg" alt="bar"></li> */}
                                        {/* <li class="box"><img src="line4.svg" alt="bar"></li> --> */}
                                    </ul>
                                    <div className="icon"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }else{
        return(
            <div className="setting" style={{border:"1px solid red"}}>
                <button onClick={handleBack}>⬅ Back</button>
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
                        {/* <button onClick={generateChart}>Generate Chart</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar