import React, {useRef} from 'react'

const AddDataSet = ({legends,setLegends,dataSet,setDataSet}) => {
    let InputField = useRef();
    InputField = JSON.parse(JSON.stringify(dataSet));

    const handleAddDataset=(e)=>{
        e.preventDefault();
        const temp = e.target.children[0].value;

        //legends
        let newLegends = [...legends];
        newLegends.push(temp);
        setLegends(newLegends);

        //dataSet
        let tempLabels =[];

        if(dataSet.length>0){
            tempLabels = [...dataSet[0].labels];
        }
        let tempData =Array(tempLabels.length).fill(0);
        const defaultValue = {
            legend:temp,
            backgroundColor:"#2a71d0",
            borderColor: "#2a71d0",
            hoverBackgroundColor: "#2a71d0",
            hoverBorderColor:"#2a71d0",
            display: "none",
            data:tempData,
            labels:tempLabels,
        }
        e.target.children[0].value = '';

        let tempDataSet = JSON.parse(JSON.stringify(dataSet));
        tempDataSet.push(defaultValue);
        setDataSet(tempDataSet);
    }

    const handleDataSetToggle=(index)=>{
        let newData = JSON.parse(JSON.stringify(dataSet));
        newData[index].display = (newData[index].display==="none"?"block":"none");
        setDataSet(newData);
    }

    const handleRemoveDataset=(removableData)=>{
        //legends
        let newLegends = [...legends];
        newLegends=newLegends.filter((data)=> data!==removableData);
        setLegends(newLegends);

        //dataSet
        let newData = JSON.parse(JSON.stringify(dataSet));
        newData=newData.filter((data)=> data.legend!==removableData);
        setDataSet(newData);
    }

    const handleInputChange = (e,index)=>{
        let newData = JSON.parse(JSON.stringify(dataSet));
        newData[index][e.target.name]=e.target.value;
        setDataSet(newData);
    }

    // const handleDatasetCustomization=(e,index)=>{
    //     e.preventDefault();
    //     let newDataset=JSON.parse(JSON.stringify(dataSet));
        
    //     const newLegends=[...legends];
    //     newLegends[index]=e.target[0].value;
    //     setLegends(newLegends);

    //     newDataset[index][e.target[0].name]=e.target[0].value;
    //     newDataset[index][e.target[1].name]=e.target[1].value;
    //     newDataset[index][e.target[2].name]=e.target[2].value;
    //     newDataset[index][e.target[3].name]=e.target[3].value;
    //     newDataset[index][e.target[4].name]=e.target[4].value;

    //     setDataSet(newDataset);
    // }

    return (
        <div className="AddDataSet">
            <form onSubmit={handleAddDataset} required autoComplete="on">
                <input type="text" placeholder="Enter Legend" required autoFocus/>
                <input type="submit" value="Add Dataset" />
            </form>

            {dataSet.map((dataSet,index)=>{
                return(
                    <div className="dataSetSection" key={index}>
                        <div className='dataSetButton'>
                            <button style={{width:'90%'}} onClick={()=>handleDataSetToggle(index)}>{dataSet.legend}</button>
                            <button style={{width:'10%'}} onClick={()=>handleRemoveDataset(dataSet.legend)}>X</button>
                        </div>
                        <div className="dataSetCustomize" key={dataSet.legend} style={{display:dataSet.display}}>
        
                            <div className="dataSetConfig dataSetText">
                                <label htmlFor="dataSet-Name">Name:</label>
                                <input type="text" id="dataSet-Name" name="legend" value={dataSet.legend} onChange={(e)=>handleInputChange(e,index)} autoFocus/>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-background">Background Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-background" name="backgroundColor" value={dataSet.backgroundColor}
                                    onChange={(e)=>handleInputChange(e,index)} />
                                </div>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-border">border Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-border" name="borderColor" value={dataSet.borderColor}
                                    onChange={(e)=>handleInputChange(e,index)} />
                                </div>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-hover-background">Hover Background Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-hover-background" name="hoverBackgroundColor" value={dataSet.hoverBackgroundColor}
                                    onChange={(e)=>handleInputChange(e,index)}/>
                                </div>
                            </div>
                            <div className="dataSetConfig dataSetColor">
                                <label htmlFor="dataSet-hover-border">Hover Border Color :</label>
                                <div className="dataSetInput">
                                    <input type="color" id="dataSet-hover-border" name="hoverBorderColor" value={dataSet.hoverBorderColor}
                                    onChange={(e)=>handleInputChange(e,index)} />
                                </div>
                            </div>
                            <div className="dataSetConfig" style={{justifyContent:'end'}}>
                                <button style={{color:'white' , background:'#4caf50'}} onClick={()=>handleDataSetToggle(index)}>Save</button>
                            </div>
                        </div>
                    </div>)
            })}

        </div>
    )
}

export default AddDataSet