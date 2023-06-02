import React, { useState, useEffect } from 'react';

const BarChartForm = ({ onLiveDataChange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    onLiveDataChange(data);
  }, [data, onLiveDataChange]);

  const handleDataChange = (e, index) => {
    const newData = [...data];
    newData[index].value = e.target.value;
    setData(newData);
  };
  const handleBarDataChange = (e, index) => {
    const newData = [...data];
    newData[index].label = e.target.value;
    setData(newData);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    console.log(e.target.children[0].value);
    let label=e.target.children[0].value;
    let value=e.target.children[1].value;
    Number(value);
    const newData = [...data];
    newData.push({
      label:label,
      value:value,
    });
    setData(newData);
    e.target.children[0].value="";
    e.target.children[1].value="";
  };

  const handleRemoveField = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div>
      <h2>Bar Chart Data Input</h2>
        <form onSubmit={handleAddField}>
          <input type="text" placeholder="Enter Label"/>
          <input type="number" step="0.01" placeholder="Enter Data"/>
          <input type="submit" value="Add Data"/>
        </form>

      <h2>Preview</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Bar</th>
            <th>Value</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                {index+1}
              </td>
              <td>
                <input
                    type="string"
                    value={item.label}
                    onChange={(e) => handleBarDataChange(e, index)}
                    placeholder={`Value ${index + 1}`}
                />
              </td>
              <td>
                <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleDataChange(e, index)}
                    placeholder={`Value ${index + 1}`}
                />
              </td>
              <td>
                <button onClick={() => handleRemoveField(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarChartForm;
