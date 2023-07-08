import React , {useRef} from 'react';
import { DndContext, closestCenter,KeyboardSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import AddDataSet from './AddDataSet';
import SortableTableRow from './SortableTableRow';
import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
const Item = (
    {
    toggleSetting,
    handleAddField,
    handleDataLabel,
    handleDataValue,
    handleRemoveField,
    settings,
    handleSettingChange,
    legends,
    setLegends,
    //firebase data
    chartData,
    setChartData,
    }
) => {
    const handleDragEnd=(event)=>{
      console.log("Drag end called");
      const {active,over}=event;
      if(active.id === over.id) return;

      //firebase data
      let newChartData = JSON.parse(JSON.stringify(chartData));
      let newChartDataSet = newChartData.dataSet;
      // console.log(newChartData);

      if(Object.keys(chartData).length!==0 && newChartDataSet.length>0){
        // console.log(newChartDataSet[0].labelsId);
        let oldDataSet = newChartDataSet[0].labelsId.find((data)=> data===active.id);
        let newDataSet = newChartDataSet[0].labelsId.find((data)=> data===over.id);
        const activeIndex= newChartDataSet[0].labelsId.indexOf(oldDataSet);
        const overIndex= newChartDataSet[0].labelsId.indexOf(newDataSet);

        // console.log(oldDataSet,newDataSet);
        // console.log(activeIndex,"  ",overIndex);
        let newData = JSON.parse(JSON.stringify(newChartDataSet));
        newData.map((dataset)=>{
          dataset.data = [...arrayMove(dataset.data,activeIndex,overIndex)];
          dataset.labels = [...arrayMove(dataset.labels,activeIndex,overIndex)];
          dataset.labelsId = [...arrayMove(dataset.labelsId,activeIndex,overIndex)];
          return true;
        })
        newChartDataSet=newData;
        newChartData.dataSet=newChartDataSet;
        console.log(newChartData);
        setChartData(newChartData);
      }
    }
    const ref = useRef(null);

    /*** Stackoverflow  start ***/
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
          distance: 10, // Enable sort function when dragging 10px   💡 here!!!
        },
      })
    const keyboardSensor = useSensor(KeyboardSensor)
    const sensors = useSensors(mouseSensor, keyboardSensor) ;

    /** End ******/

    /**** Excel Data fetch start */
    const readUploadFile = (e) => {
      if (e.target.files) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const data = e.target.result;
              const workbook = xlsx.read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              // console.log("workbook ->", workbook);
              // console.log("worksheet->", sheetName);
              const worksheet = workbook.Sheets[sheetName];
              const json = xlsx.utils.sheet_to_json(worksheet);
              console.log(json);

              let data1=[];
              let data2=[];
              let labels=[];

              json.map((label)=>{
                labels.push(label.Label);
                data1.push(label["Data-1"]);
                data2.push(label["Date-2"]);
              });
              console.log(labels);
              console.log(data1);
              console.log(data2);

          };
          reader.readAsArrayBuffer(e.target.files[0]);
      }
    }
    /**** Excel Data fetch END */
    if (toggleSetting === "data") {
        return (
          <div className="data-section">
            {/* <h2>Bar Chart Data Input</h2> */}
            <AddDataSet  legends={legends} setLegends={setLegends} chartData={chartData} setChartData={setChartData}/>
    
            <div className='tables'>
              <table>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Bar</th>
                    {Object.keys(chartData).length!==0?chartData.dataSet.map((data)=>{
                      return(
                        <th key={data.id}>{data.legend}</th>
                      )
                    }):null}
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>  
                  <DndContext sensors={sensors} ref={ref} collisionDetection={closestCenter} onDragEnd={(e)=>handleDragEnd(e)} modifiers={[restrictToVerticalAxis]}>
                    <SortableContext 
                    items={(Object.keys(chartData).length!==0 && chartData.dataSet.length>0)?chartData.dataSet[0].labelsId.map((value) => {
                        return value;
                      }):[]}
                    strategy={verticalListSortingStrategy}
                    >   {(Object.keys(chartData).length!==0 && chartData.dataSet.length>0)?(chartData.dataSet[0].labels).map((label, index) => {
                       const temp=chartData.dataSet[0].labelsId[index];
                      return (
                            <SortableTableRow ref={ref} key={temp} id={temp} dataSet={chartData.dataSet} handleDataLabel={handleDataLabel} handleRemoveField={handleRemoveField} handleDataValue={handleDataValue} index={index} label={label} />)
                          }):null}
                    </SortableContext>
                  </DndContext>
                </tbody>
              </table>
            </div>
            <p className='p-[10px] bg-chart'><img className='mx-auto w-1/10 cursor-cell' onClick={handleAddField} src='./images/add.png'  /></p>
            <label htmlFor="upload">Upload File</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
          </div>
        );
      }
      return (
        <div>
          <div className="customize">
                <form className="form">
                    <div className="customs">
                        <label htmlFor="x-axis">x-axis </label>
                        <input className='customize-input' value={settings.xText}  type="text" id="x-axis" name="xText"  onChange={handleSettingChange}/>                
                    </div>
                    <div className="customs">
                        <label htmlFor="y-axis">y-axis  </label>
                        <input className='setting-input'  value={settings.yText} type="text" id="y-axis" name="yText"  onChange={handleSettingChange}/>
                    </div>
                    <div className="customs">
                        <label htmlFor="width" >Border Width </label>
                        <input className='setting-input'  value={settings.borderWidth} type="number" id="width" name="borderWidth" onChange={handleSettingChange} />
                    </div>
                    <div className="customs">
                        <label htmlFor="hit_radius"  >Hit Radius </label>
                        <input className='setting-input'  value={settings.hitRadius} type="number" id="hit_radius" name="hitRadius" onChange={handleSettingChange}  />
                    </div>
                    <div className="customs">
                        <label htmlFor="bar_thickness" >Bar Thickness </label>
                        <input className='setting-input' value={settings.barThickness} type="number" id="bar_thickness" name="barThickness"  onChange={handleSettingChange} />
                    </div>
                    <div className="customs">
                        <label htmlFor="point_style" >Point style </label>
                        <select id="point_style" className="rounded-s-md"  value={settings.pointStyle}  name="pointStyle" onChange={handleSettingChange} style={{width: "55%",background:"#BACBED",outline:"none",border:"none",borderRadius:"5px",color:"black"}}>
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
                    </div>
                    <div className="customs">
                        <label   >Show Legend </label>
                        <div style={{width:"55%", textAlign: "end",padding:"8px"}}>
                          <label className="switch">
                            <input type="checkbox" name="legend" onClick={handleSettingChange} />
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