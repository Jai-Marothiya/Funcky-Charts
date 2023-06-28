import React , {useRef, useState} from 'react';
import { DndContext, closestCenter,KeyboardSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { v4 as uuidv4 } from 'uuid';


const AddDataSet = ({legends,setLegends,dataSet,setDataSet}) => {
    const index=dataSet.length;
    const handleAddDataset=()=>{
        // legends
        let newLegends = [...legends];
        newLegends.push(`New-DataSet-${index+1}`);
        setLegends(newLegends);

        //dataSet
        let tempLabels =[];
        let tempLabelsId =[];

        if(dataSet.length>0){
            tempLabels = [...dataSet[0].labels];
            tempLabelsId = [...dataSet[0].labelsId];
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

        let tempDataSet = JSON.parse(JSON.stringify(dataSet));
        tempDataSet.push(defaultValue);
        setDataSet(tempDataSet);
    }

    const handleDataSetToggle=(index)=>{
        let newData = JSON.parse(JSON.stringify(dataSet));
        newData[index].display = (newData[index].display==="none"?"block":"none");
        setDataSet(newData)
    }

    const handleRemoveDataset=(removableData)=>{
        //legends
        let newLegends = [...legends];
        newLegends=newLegends.filter((data)=> data!==removableData);
        setLegends(newLegends);

        //dataSet
        let newData = JSON.parse(JSON.stringify(dataSet));
        newData=newData.filter((data)=> data.id!==removableData);
        setDataSet(newData);
    }

    const handleInputChange = (e,index)=>{
        let newData = JSON.parse(JSON.stringify(dataSet)); 
        let newLegend = JSON.parse(JSON.stringify(legends)); 
        console.log(e);

        newData[index][e.target.name]=e.target.value;
        newLegend[index]=e.target.value;
        setDataSet(newData);
        setLegends(newLegend);
    }

    const handleCopy=(data)=>{
        let newData=JSON.parse(JSON.stringify(dataSet));
        let copy = JSON.parse(JSON.stringify(data));
        console.log(newData);
        console.log(copy);
        copy.id=uuidv4();
        newData.push(copy);
        setDataSet(newData);
    }


    const handleDragEnd=(event)=>{
        const {active,over}=event;
        if(active.id === over.id) return;
        setDataSet((dataSet)=>{
            let oldDataSet = dataSet.find((data)=> data.id===active.id);
            let newDataSet = dataSet.find((data)=> data.id===over.id);
            const activeIndex=dataSet.indexOf(oldDataSet);
            const overIndex=dataSet.indexOf(newDataSet);
            return arrayMove(dataSet,activeIndex,overIndex);
        })
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
    const handleDropDown=(e)=>{
        toggleDataset==="none"?setToggleDataset("flex"):setToggleDataset("none");
        console.log(e.currentTarget.children[0].style.transform);
        console.log(e);
        let rot=e.currentTarget.children[0].style.transform;
        e.currentTarget.children[0].style.transform= rot==="rotate(-90deg)"?"rotate(90deg)":"rotate(-90deg)";
    }

    return (
        <div className="AddDataSet" style={{margin:"2rem 0"}}>
                <div className='dataSet-dropDown'>
                    <button  style={{transition: "1.4s"}}>DataSets</button>
                    <div onClick={handleDropDown}>
                        <img src='./images/slider.svg' alt="drop-drown" style={{filter:'invert(0)',width:"2.5rem", transform:"rotate(-90deg)",transition: "all 0.5s ease 0s"}}/> 
                    </div>
                </div>
                <div className="dataSet-wrapper" style={{display:toggleDataset}}>
                    <DndContext sensors={sensors} ref={ref} collisionDetection={closestCenter} onDragEnd={(e)=>handleDragEnd(e)}>
                        <SortableContext 
                        items={dataSet.map((value) => {
                            return value.id;
                        })}
                        strategy={verticalListSortingStrategy}
                        >
                            {dataSet.map((dataSet,index)=>{
                                return(
                                    <div style={{transition:"all 0.4s"}}>
                                        <SortableItem ref={ref} key={dataSet.id} id={dataSet.id} dataSet={dataSet} setDataSet={setDataSet} legend={legends} setLegends={setLegends} index={index} handleDragEnd={handleDragEnd} handleInputChange={handleInputChange} handleRemoveDataset={handleRemoveDataset} handleDataSetToggle={handleDataSetToggle} handleCopy={handleCopy} />
                                    </div>)
                            })}
                        </SortableContext>
                    </DndContext>
                    <button onClick={handleAddDataset} >Add DataSet</button>
                </div>
        </div>
    )
}

export default AddDataSet