import React , {useRef, useState} from 'react';
import { DndContext, closestCenter,KeyboardSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { v4 as uuidv4 } from 'uuid';
import {
    restrictToVerticalAxis,
  } from '@dnd-kit/modifiers';

const AddDataSet = ({legends,setLegends,chartData,setChartData}) => {
    const index=Object.keys(chartData).length!==0?chartData.dataSet.length:0;
    const handleAddDataset=()=>{
        if(Object.keys(chartData).length===0) return ;
        // legends
        let newLegends = [...legends];
        newLegends.push(`New-DataSet-${index+1}`);
        setLegends(newLegends);

        //dataSet
        let tempLabels =[];
        let tempLabelsId =[];

        if(Object.keys(chartData).length!==0 && chartData.dataSet.length>0){
            tempLabels = [...chartData.dataSet[0].labels];
            tempLabelsId = [...chartData.dataSet[0].labelsId];
        }
        let tempData =Array(tempLabels.length).fill(0);
        const defaultValue = {
            id: uuidv4(),
            legend: `New-DataSet-${index+1}`,
            backgroundColor:"#2a71d0",
            borderColor: "#2a71d0",
            hoverBackgroundColor: "#2a71d0",
            hoverBorderColor:"#2a71d0",
            display: "none",
            data:tempData,
            labels:tempLabels,
            labelsId:tempLabelsId,
        }
        
        //firebase data
        let tempChartData = JSON.parse(JSON.stringify(chartData));
        tempChartData.dataSet.push(defaultValue);
        // console.log("data jo add hua ",tempChartData.dataSet);
        setChartData(tempChartData);
    }

    const handleDataSetToggle=(index)=>{
        if(Object.keys(chartData).length===0) return ;

        let newChartData = JSON.parse(JSON.stringify(chartData));
        newChartData.dataSet[index].display = (newChartData.dataSet[index].display==="none"?"block":"none");
        setChartData(newChartData)
    }

    const handleRemoveDataset=(removableData)=>{
        if(Object.keys(chartData).length===0) return ;

        //legends
        let newLegends = [...legends];
        newLegends=newLegends.filter((data)=> data!==removableData);
        setLegends(newLegends);

        //firebase data
        let newChartData = JSON.parse(JSON.stringify(chartData));
        let newChartDataSet=newChartData.dataSet;
        newChartDataSet=newChartDataSet.filter((data)=> data.id!==removableData);
        newChartData.dataSet=newChartDataSet;
        setChartData(newChartData);

        localStorage.setItem('myChartData', JSON.stringify(newChartData));
    }

    const handleInputChange = (e,index)=>{
        if(Object.keys(chartData).length===0) return ;

        let newLegend = JSON.parse(JSON.stringify(legends)); 
        newLegend[index]=e.target.value;
        setLegends(newLegend);

        //firebase data
        let newChartData = JSON.parse(JSON.stringify(chartData));
        newChartData.dataSet[index][e.target.name]=e.target.value;
        setChartData(newChartData);
    }

    const handleCopy=(data)=>{
        if(Object.keys(chartData).length===0) return ;

        let copy = JSON.parse(JSON.stringify(data));
        copy.id=uuidv4();

        //firebase data
        let newChartData = JSON.parse(JSON.stringify(chartData));
        newChartData.dataSet.push(copy);
        setChartData(newChartData);
    }


    const handleDragEnd=(event)=>{
        if(Object.keys(chartData).length===0) return ;

        const {active,over}=event;
        if(active.id === over.id) return;

        //firebase data
        let newChartData = JSON.parse(JSON.stringify(chartData));
        let newChartDataSet = newChartData.dataSet;

        let oldDataSet = newChartDataSet.find((data)=> data.id===active.id);
        let newDataSet = newChartDataSet.find((data)=> data.id===over.id);
        const activeIndex=newChartDataSet.indexOf(oldDataSet);
        const overIndex=newChartDataSet.indexOf(newDataSet);
        newChartDataSet = arrayMove(newChartDataSet,activeIndex,overIndex);
        newChartData.dataSet=newChartDataSet;
        setChartData(newChartData);
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

    const [toggleDataset,setToggleDataset]=useState("none");
    const [opacityValue,setOpacityValue]=useState(0);
    const handleDropDown=(e)=>{
        toggleDataset==="none"?setToggleDataset("flex"):setToggleDataset("none");
        setTimeout(() => {
            opacityValue===0 ? setOpacityValue(1) : setOpacityValue(0);
        },0.0000001);

        console.log(opacityValue);
        
        console.log(e.currentTarget.children[0].style.transform);
        console.log(e);
        let rot=e.currentTarget.children[0].style.transform;
        e.currentTarget.children[0].style.transform= rot==="rotate(-90deg)"?"rotate(90deg)":"rotate(-90deg)";
    }

    return (
        <div className="AddDataSet" style={{margin:"2rem 0"}}>
                <div className='dataSet-dropDown'>
                    <button className='cursor-default'  >DataSets</button>
                    <div onClick={handleDropDown} className='w-[10%]'>
                        <img className='cursor-pointer' src='./images/slider.svg' alt="drop-drown" style={{filter:'invert(0)',width:"2.5rem", transform:"rotate(-90deg)",transition: "all 0.5s ease 0s",width:"90%"}}/> 
                    </div>    
                </div>
                <div className="dataSet-wrapper" style={{display:toggleDataset,opacity:{opacityValue}, transition:"opacity 1s"}}>
                    <DndContext sensors={sensors} ref={ref} collisionDetection={closestCenter} onDragEnd={(e)=>handleDragEnd(e)} modifiers={[restrictToVerticalAxis]}>
                        <SortableContext 
                        items={Object.keys(chartData).length!==0 ? chartData.dataSet.map((value) => {
                            return value.id;
                        }):[]}
                        strategy={verticalListSortingStrategy}
                        >
                            {Object.keys(chartData).length!==0 ? chartData.dataSet.map((dataSet,index)=>{
                                return(
                                    <div style={{transition:"all 0.4s"}}>
                                        <SortableItem ref={ref} key={dataSet.id} id={dataSet.id} dataSet={dataSet} index={index} handleDragEnd={handleDragEnd} handleInputChange={handleInputChange} handleRemoveDataset={handleRemoveDataset} handleDataSetToggle={handleDataSetToggle} handleCopy={handleCopy} />
                                    </div>)
                            }):null}
                        </SortableContext>
                    </DndContext>
                    <p className='p-[10px]'><img className='mx-auto w-1/10 cursor-cell' onClick={handleAddDataset} src='./images/add.png'  /></p>
                </div>
        </div>
    )
}

export default AddDataSet