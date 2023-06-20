import React, { useState } from 'react'

const AddDataSet = ({legends,setLegends,dataSet,setDataSet}) => {
    // const [toggle,setToggle]=use(false);

    const handleAddDataset=(e)=>{
        e.preventDefault();
        const temp = e.target.children[0].value;
        // const newData = [...legends];
        // newData.push(temp);
        // setLegends(newData);
        let tempLabels =[];

        if(dataSet.length>0){
            tempLabels = dataSet[0].labels;
        }
        let tempData =Array(tempLabels.length).fill(0);
        const defaultValue = {
            legend:temp,
            backgroundColor:"#2a71d0",
            borderColor: "grey",
            hoverBackgroundColor: "rgba(270, 240, 32, 0.2)",
            hoverBorderColor:"yellow",
            display: "none",
            data:tempData,
            labels:tempLabels,
        }
        e.target.children[0].value = '';

        let tempDataSet = [...dataSet];
        tempDataSet.push(defaultValue);
        setDataSet(tempDataSet);
        // console.log(typeof(dataSet));
        // console.log(typeof(legends));
        // console.log(dataSet);
    }

    const handleDataSetToggle=(index)=>{
        let newData = [...dataSet];
        // console.log(dataSet);
        // console.log(newData);
        // console.log(newData);
        // console.log(newData[index]);
        newData[index].display = (newData[index].display==="none"?"block":"none");
        setDataSet(newData);
    }

    const handleRemoveDataset=(e,removableData)=>{
        console.log(dataSet);
        // console.log(legends);
        let newData = [...dataSet];
        newData=newData.filter((data)=> data.legend!==removableData);
        // console.log(newData);
        setDataSet(newData);
    }

    const handleDatasetCustomization=(e,index)=>{
        e.preventDefault();
        console.log(e);
        let newDataset=[...dataSet];
        console.log(newDataset[index],index);
        console.log(e.target[0].name," ",e.target[0].value);
        
        const newLegends=[...legends];
        console.log("mai new legend",newLegends);
        newLegends[index]=e.target[0].value;
        setLegends(newLegends);
        newDataset[index][e.target[0].name]=e.target[0].value;
        newDataset[index][e.target[1].name]=e.target[1].value;
        newDataset[index][e.target[2].name]=e.target[2].value;
        newDataset[index][e.target[3].name]=e.target[3].value;
        newDataset[index][e.target[4].name]=e.target[4].value;

        console.log(newDataset);

        // // newDataset[index][e.target.name]=e.target.value;
        setDataSet(newDataset);
    }

    return (
        <div className="AddDataSet">
            <form onSubmit={handleAddDataset} required>
                <input type="text" placeholder="Enter Legend" required/>
                <input type="submit" value="Add Dataset" />
            </form>

            {dataSet.map((dataSet,index)=>{
                // console.log(index);
                return(
                    <div className="dataSetSection" key={index}>
                        <div className='dataSetButton'>
                            <button style={{width:'90%'}} onClick={()=>handleDataSetToggle(index)}>{dataSet.legend}</button>
                            <button style={{width:'10%'}} onClick={(e)=>handleRemoveDataset(e,dataSet.legend)}>X</button>
                        </div>
                        <form className="dataSetCustomize" key={dataSet.legend} onSubmit={(e)=>handleDatasetCustomization(e,index)}style={{display:dataSet.display}} required>
        
                            <div className="dataSetConfig dataSetText">
                                <label htmlFor="dataSet-Name">Name:</label>
                                <input type="text" id="dataSet-Name" name="legend"   />
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-background">Background Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-background" name="backgroundColor"
                                     />
                                </div>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-border">border Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-border" name="borderColor" 
                                     />
                                </div>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-hover-background">Hover Background Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-hover-background" name="hoverBackgroundColor"
                                   />
                                </div>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-hover-border">Hover Border Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-hover-border" name="hoverBorderColor" 
                                     />
                                </div>
                            </div>
                            <div className="dataSetConfig" style={{justifyContent:'end'}}>
                                <input type='submit' value={'SAVE'} style={{color:'white' , background:'#4caf50'}} onClick={()=>handleDataSetToggle(index)}/>
                            </div>
                    </form>
                </div>
                )
            })}

        </div>
    )
}

export default AddDataSet