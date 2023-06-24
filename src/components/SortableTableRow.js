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

    const style={
        transform:CSS.Transform.toString(transform),
        transition,
    }
                
    return (
    <tr key={index} ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td>{index + 1}</td>
        <td>
        <input
            type="string"
            value={label}
            onChange={(e) => handleDataLabel(e, index)}
            placeholder={`Label ${index + 1}`}
        />
        </td>
        {dataSet.map((data,index)=>{
            return(
            <td key={index}>
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
    )
}

export default SortableTableRow;