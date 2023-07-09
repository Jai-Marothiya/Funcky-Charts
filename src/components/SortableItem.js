import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// import {} from '@dnd-kit/utilities'

const SortableItem = ({id,dataSet,index,handleInputChange,handleDataSetToggle,handleRemoveDataset,handleCopy}) => {
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
        <div key={id} className="dataSetSection" ref={setNodeRef}  style={style} {...attributes}>
            <div className='dataSetButton'>
                <div className='Image_wrapper' {...listeners}><img className='cursor-grab mx-auto' src='../images/draggable.svg' alt='icons'/></div>
                <button style={{width:'70%'}} onClick={()=>{ handleDataSetToggle(index)}}>{dataSet.legend}</button>
                {/* <svg path='../images/copy_icon.svg'/>
                <svg src='../images/delete_icon.svg' onClick={handleRemoveDataset}/> */}
                <div className='Image_wrapper'><img  src='../images/copy_icon.svg' alt='icons' onClick={()=>handleCopy(dataSet)}/></div>
                <div className='Image_wrapper'><img  src='../images/delete_icon.svg' alt='icons' onClick={()=>handleRemoveDataset(dataSet.id)} /></div>
            </div>
            <div className="dataSetCustomize"  style={{display:dataSet.display}}>

                <div className="dataSetConfig dataSetText">
                    <label htmlFor="dataSet-Name">Name:</label>
                    <input type="text" id="dataSet-Name" name="legend" value={dataSet.legend} onChange={(e)=>handleInputChange(e,index)} autoFocus/>
                </div>
                <div className="dataSetConfig dataSetColor">
                    <label htmlFor="dataSet-background">Background Color :</label>
                    <div className="dataSetInput">
                        <input type="color" id="dataSet-background" opacity name="backgroundColor" value={dataSet.backgroundColor}
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
                {/* <div className="dataSetConfig" style={{justifyContent:'end'}}>
                    <button style={{color:'white' , background:'#4caf50'}} onClick={()=>handleDataSetToggle(index)}>Save</button>
                </div> */}
            </div>
        </div>
  )
}

export default SortableItem