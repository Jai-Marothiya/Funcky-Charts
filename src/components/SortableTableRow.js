import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTableRow = ({
        id,
        dataSet,
        label,
        index,
        handleDataLabel,
        handleDataValue,
        handleRemoveField
    }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    }=useSortable({id:id});

    // console.log("SortableTableRow ki id ->", id);
    const style={
        transform: CSS.Translate.toString(transform),
        transition
    }
                
    return (
    <tr ref={setNodeRef} key={id} style={style} {...attributes}>
        <td><img className='cursor-grab' src='../images/draggable.svg' alt='icons' {...listeners}/></td>
        <td>
        <input
            type="string"
            value={label}
            onChange={(e) => handleDataLabel(e, index)}
            placeholder={`Label ${index + 1}`}
        />
        </td>
        {dataSet.map((data,idx)=>{
            
            return(
            <td key={idx}>
                <input
                type="number"
                value={data.data[index]}
                onChange={(e) => handleDataValue(e,data.id, index)}
                placeholder={`Value ${index + 1}`}
                />
            </td>)
        })}
        <td>
            <img  src='../images/delete_icon.svg' alt='icons' onClick={() => handleRemoveField(index)}/>
        </td>
    </tr>
    )
}

export default SortableTableRow;