import React from 'react';
import AddDataSet from './AddDataSet';

const Item = (
    {
    toggleSetting,
    handleAddField,
    handleDataLabel,
    handleDataValue,
    handleRemoveField,
    sideSet,
    settings,
    handleSettingChange,
    legends,
    setLegends,
    dataSet,
    setDataSet
    }
) => {
    if (toggleSetting === "data") {
        return (
          <div className="data-section">
            {/* <h2>Bar Chart Data Input</h2> */}
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
          <div className="customize">
                <form className="form">
                    <div className="customs">
                        <label htmlFor="x-axis" style={{width: "40%"}}>x-axis : </label>
                        <input className='customize-input' value={settings.xText}  type="text" id="x-axis" name="xText" style={{width: "60%"}} onChange={handleSettingChange}/>
                        {/* <div style={{width: "50%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" name="xTitle" onClick={handleSettingChange} defaultChecked />
                            <span className="slider round"></span>
                        </label>
                        </div> */}
                    </div>
                    <div className="customs">
                        <label htmlFor="y-axis" style={{width: "40%"}}>y-axis : </label>
                        <input className='setting-input'  value={settings.yText} type="text" id="y-axis" name="yText" style={{width: "60%"}} onChange={handleSettingChange}/>
                        {/* <div style={{width: "50%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" name="yTitle" onClick={handleSettingChange} defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div> */}
                    </div>
                    <div className="customs">
                        <label htmlFor="width" style={{width: "40%"}}>Border Width :</label>
                        <input className='setting-input'  value={settings.borderWidth} type="number" id="width" name="borderWidth" onChange={handleSettingChange} style={{width: "60%"}}/>
                        {/* <div style={{width: "60%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div> */}
                    </div>
                    <div className="customs">
                        <label htmlFor="hit_radius"  style={{width: "40%"}}>Hit Radius :</label>
                        <input className='setting-input'  value={settings.hitRadius} type="number" id="hit_radius" name="hitRadius" onChange={handleSettingChange}   style={{width: "60%"}}/>
                        {/* <div style={{width: "67%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div> */}
                    </div>
                    <div className="customs">
                        <label htmlFor="bar_thickness" style={{width: "40%"}}>Bar Thickness :</label>
                        <input className='setting-input' value={settings.barThickness} type="number" id="bar_thickness" name="barThickness"  onChange={handleSettingChange}  style={{width: "60%"}}/>
                        {/* <div style={{width: "67%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div> */}
                    </div>
                    <div className="customs">
                        <label htmlFor="point_style" style={{width: "40%"}}>Point style :</label>
                        <select id="point_style"  value={settings.pointStyle} style={{width: "60%"}} name="pointStyle" onChange={handleSettingChange}>
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
                        {/* <div style={{width: "60%",textAlign:"end"}}>
                            <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div> */}
                    </div>
                    <div className="customs">
                        <label   style={{width: "40%"}}>Show Legend </label>
                        {/* <input type="text" id="y-axis" name="y-axis" style="width: 40%;">  */}
                        <div style={{width: "60%", textAlign: "end",padding:"8px"}}>
                            <label className="switch">
                            <input type="checkbox" name="legend" onClick={handleSettingChange} defaultChecked/>
                            <span className="slider round"></span>
                        </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      );
}

export default Item;

/*********************** Pehle sidebar mai jo laga rakha tha Item uska code hai niche *************************/
// const Items = ({
//     toggleSetting,
//     setToggleSetting,
//     handleAddField,
//     data,
//     handleDataLabel,
//     handleDataValue,
//     handleRemoveField,
//     sideSet,
//     handleSettingChange,
//     legends,
//     setLegends,
//     dataSet,
//     setDataSet
//   }) => {
//     if (toggleSetting === "data") {
//       return (
//         <div className="data-section">
//           <h2>Bar Chart Data Input</h2>
//           <AddDataSet  legends={legends} setLegends={setLegends} dataSet={dataSet} setDataSet={setDataSet}/>
//           <form onSubmit={handleAddField}>
//             <input type="text" placeholder="Enter Label" required/>
//             {/* <input type="number" step="0.01" placeholder="Enter Data" required/> */}
//             <input type="submit" value="Add Data" />
//           </form>
  
//           <h2>Preview</h2>
//           <div className='table'>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Index</th>
//                   <th>Bar</th>
//                   {dataSet.map((data)=>{
//                     return(
//                       <th key={data.legend}>{data.legend}</th>
//                     )
//                   })}
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                 dataSet.length>0 ?(dataSet[0].labels).map((label, index) => {
      
//                   return (<tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>
//                       <input
//                         type="string"
//                         value={label}
//                         onChange={(e) => handleDataLabel(e, index)}
//                         placeholder={`Label ${index + 1}`}
//                       />
//                     </td>
//                     {dataSet.map((data)=>{
//                           return(
//                           <td key={data.legend}>
//                             <input
//                               type="number"
//                               value={data.data[index]}
//                               onChange={(e) => handleDataValue(e,data.legend, index)}
//                               placeholder={`Value ${index + 1}`}
//                             />
//                           </td>)
//                     })}
//                     <td>
//                       <button onClick={() => handleRemoveField(index)}>Remove</button>
//                     </td>
//                   </tr>
//                   )}
//                 ):null
//               }
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div>
//         <div className="customize">
//                   <form className="form">
//                       <div className="customs">
//                           <label htmlFor="x-axis" style={{width: "12%"}}>x-axis : </label>
//                           <input className='customize-input' value={sideSet.xText}  type="text" id="x-axis" name="xText" style={{width: "40%"}} onChange={handleSettingChange}/>
//                           <div style={{width: "50%",textAlign:"end"}}>
//                               <label className="switch">
//                               <input type="checkbox" name="xTitle" onClick={handleSettingChange} defaultChecked />
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                       <div className="customs">
//                           <label htmlFor="y-axis" style={{width: "12%"}}>y-axis : </label>
//                           <input className='setting-input'  value={sideSet.yText} type="text" id="y-axis" name="yText" style={{width: "40%"}} onChange={handleSettingChange}/>
//                           <div style={{width: "50%",textAlign:"end"}}>
//                               <label className="switch">
//                               <input type="checkbox" name="yTitle" onClick={handleSettingChange} defaultChecked/>
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                       <div className="customs">
//                           <label   style={{width: "20%"}}>Show Legend </label>
//                           {/* <input type="text" id="y-axis" name="y-axis" style="width: 40%;">  */}
//                           <div style={{width: "80%", textAlign: "end"}}>
//                               <label className="switch">
//                               <input type="checkbox" name="legend" onClick={handleSettingChange} defaultChecked/>
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                       <div className="customs">
//                           <label htmlFor="width" style={{width: "30%"}}>Border Width :</label>
//                           <input className='setting-input'  value={sideSet.borderWidth} type="number" id="width" name="borderWidth" onChange={handleSettingChange} /*style={{width: "8%"}}*//>
//                           <div style={{width: "67%",textAlign:"end"}}>
//                               <label className="switch">
//                               <input type="checkbox" defaultChecked/>
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                       <div className="customs">
//                           <label htmlFor="hit_radius"  style={{width: "30%"}}>Hit Radius :</label>
//                           <input className='setting-input'  value={sideSet.hitRadius} type="number" id="hit_radius" name="hitRadius" onChange={handleSettingChange}  /*style={{width: "8%"}}*//>
//                           <div style={{width: "67%",textAlign:"end"}}>
//                               <label className="switch">
//                               <input type="checkbox" defaultChecked/>
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                       <div className="customs">
//                           <label htmlFor="bar_thickness" style={{width: "30%"}}>Bar Thickness :</label>
//                           <input className='setting-input' value={sideSet.barThickness} type="number" id="bar_thickness" name="barThickness"  onChange={handleSettingChange} /*style={{width: "8%"}}*//>
//                           <div style={{width: "67%",textAlign:"end"}}>
//                               <label className="switch">
//                               <input type="checkbox" defaultChecked/>
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                       <div className="customs">
//                           <label htmlFor="point_style" style={{width: "25%"}}>Point style :</label>
//                           <select id="point_style"  value={sideSet.pointStyle} style={{width: "15%"}} name="pointStyle" onChange={handleSettingChange}>
//                               <option>circle</option>
//                               <option>triangle</option>
//                               <option>cross</option>
//                               <option>crossRot</option>
//                               <option>dash</option>
//                               <option>line</option>
//                               <option>rect</option>
//                               <option>rectRounded</option>
//                               <option>rectRot</option>
//                               <option>star</option>             
//                           </select>
//                           <div style={{width: "60%",textAlign:"end"}}>
//                               <label className="switch">
//                               <input type="checkbox" defaultChecked/>
//                               <span className="slider round"></span>
//                           </label>
//                           </div>
//                       </div>
//                   </form>
//               </div>
//       </div>
//     );
//   };