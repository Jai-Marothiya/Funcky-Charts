import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({id,dataSet,index,handleInputChange,handleDataSetToggle, handleDragEnd,handleTODataset,handleRemoveDataset ,setDataSet, legends,setLegends}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    }=useSortable({id:id});

    const style={
        transform:CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div className="dataSetSection" ref={setNodeRef} key={dataSet.legend} style={style} {...attributes} {...listeners}>
            <div className='dataSetButton'>
                <button style={{width:'90%'}} onClick={()=>{ handleDataSetToggle(index)}}>{dataSet.legend}</button>
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
        </div>
  )
}

export default SortableItem