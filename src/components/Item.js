import React , {useState,useRef} from 'react';
import { DndContext, closestCenter,KeyboardSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import AddDataSet from './AddDataSet';
import SortableTableRow from './SortableTableRow';
import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';
import { utils, writeFile } from 'xlsx';
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

    const handleImport = (event) => {
      if (event.target.files) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = event.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            // console.log("workbook ->", workbook);
            // console.log("worksheet->", sheetName);
            const worksheet = workbook.Sheets[sheetName];
            const excel = xlsx.utils.sheet_to_json(worksheet);
            console.log(excel);

            let labels=[];
            let labelsId=[];

            excel.map((row)=>{
              labels.push(row.Bar);
              labelsId.push(uuidv4());
            })

            console.log(labels);
            console.log(labelsId);

            let dataSets=[];

            if(excel.length>0){
              Object.keys(excel[0]).map((key)=> {
                if(key!=='Index' && key!=='Bar'){
                  console.log(key, " ",excel[0][key]);
                  const defaultValue = {
                    id: uuidv4(),
                    legend: key,
                    backgroundColor:"#2a71d0",
                    borderColor: "#2a71d0",
                    hoverBackgroundColor: "#2a71d0",
                    hoverBorderColor:"#2a71d0",
                    display: "none",
                    data:[],
                    labels:labels,
                    labelsId:labelsId,
                  }
                  dataSets.push(defaultValue);
                  return true;
                }
              });

              excel.map((row)=>{
                dataSets.map((dataset,index)=>{
                  if(row[dataset.legend]){
                    dataSets[index].data.push(row[dataset.legend]);
                  }else{
                    dataSets[index].data.push(0);
                  }
                })
              })
              let newChartData = JSON.parse(JSON.stringify(chartData));
              newChartData.dataSet=dataSets;
              setChartData(newChartData);
            }
          }
          reader.readAsArrayBuffer(event.target.files[0]);
      }
    }
    const handleExport = () => {
      const headings = [[
          'Index',
          'Bar',
      ]];
      chartData.dataSet.map((data)=>{
        headings[0].push(data.legend);
      })

      let newChartData = JSON.parse(JSON.stringify(chartData));
      let newChartDataSet = newChartData.dataSet;
      let exportData=[];

      if(Object.keys(chartData).length!==0 && newChartDataSet.length>0){
        newChartDataSet[0].labels.map((label,index)=>{
              exportData.push({Index:index+1, Bar: label});
        })
      }
        
      exportData.map((row,index)=>{
        newChartDataSet.map((dataSet)=>{
          // console.log(dataSet);
          exportData[index]={...exportData[index], [dataSet.legend]: dataSet.data[index]}
        })
      })
        console.log(exportData);

      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings);
      utils.sheet_add_json(ws, exportData, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Report');
      writeFile(wb, `${chartData.projectName}-file.xlsx`);
  }

  /**** Excel Data fetch END */

  //*************************** */ modal*************************
  const [modal,setModal] = useState("none");
  const handlemodal= () => {
    modal==='none' ? setModal("block") : setModal("none");
  }
  
    if (toggleSetting === "data") {
        return (
          <div className="data-section">
            {/* <h2>Bar Chart Data Input</h2> */}
            <AddDataSet  legends={legends} setLegends={setLegends} chartData={chartData} setChartData={setChartData}/>
    
            <div className='tables h-[50vh]'>
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

            <div className=" z-10 w-full h-full z-4 pt-1/20   fixed top-0 left-0" style={{display: modal}}>
              <div className=" w-full h-full   bg-white  shadow-modal relative  flex flex-col" >
                <p className='h-[4vh] bg-sidebarlight flex justify-end items-center  '>
                  <h2 className='w-[98%] text-center '>Table</h2>
                  <img className=' h-[60%]  mr-[20px]' onClick={handlemodal} src='../images/close.svg' alt='close' />
                </p>
                <div className='tables w-full h-[90vh]'>
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
                <p className=' h-[7vh] flex justify-center'><img className='mx-auto my-auto w-3%' onClick={handleAddField} src='../images/add.png'  /></p>
                {/* <button onClick={handleAddField} style={{alignSelf:"flex-end",width:"30%"}}>Add Data</button> */}
              </div>
            </div> 

            <p className='flex justify-between mb-[10px]'>
              <button onClick={handlemodal}>Distraction Free Mode</button>
              {/* <img className=' w-[10%] bg-white' onClick={handlemodal} src='./images/eye.svg' alt='eye'/> */}
              <button onClick={handleAddField} style={{alignSelf:"flex-end",width:"30%"}}>Add Data</button>
            </p>

            <div>
              <span className='text-white mr-[15px]'>Export Excel file : </span><img className='w-[10%] invert-[1] inline-block' onClick={handleExport} src='./images/import.svg' alt='import'/>

              <input type="file" name="file" className="custom-file-input text-white" style={{padding:"0px"}} id="inputGroupFile" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
              {/* <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label> */}

              {/* <label htmlFor="upload">Export File</label> */}
              {/* <button onClick={handleExport} className="btn btn-primary float-right">
                Export <i className="fa fa-download"></i>
              </button> */}
            </div>
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
                    {/* <div className="customs">
                        <label htmlFor="bar_thickness" >Bar Thickness </label>
                        <input className='setting-input' value={settings.barThickness} type="number" id="bar_thickness" name="barThickness"  onChange={handleSettingChange} />
                    </div> */}
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