import React, { useState, useEffect } from 'react';

const BarChartForm = ({ onLiveDataChange }) => {
  const [data, setData] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  useEffect(() => {
    onLiveDataChange(previewData);
  }, [previewData, onLiveDataChange]);

  const handleDataChange = (e, index) => {
    const newData = [...data];
    newData[index] = e.target.value;
    setData(newData);
    generatePreviewData(newData);
  };

  const handleAddField = () => {
    const newData = [...data, ''];
    setData(newData);
  };

  const handleRemoveField = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    generatePreviewData(newData);
  };

  const generatePreviewData = (newData) => {
    const preview = newData.map((value, index) => ({
      label: `Bar ${index + 1}`,
      value: parseFloat(value) || 0,
    }));
    setPreviewData(preview);
  };

  return (
    <div>
      <h2>Bar Chart Data Input</h2>
      <button onClick={handleAddField}>Add Field</button>
      {data.map((value, index) => (
        <div key={index}>
          <input
            type="number"
            value={value}
            onChange={(e) => handleDataChange(e, index)}
            placeholder={`Value ${index + 1}`}
          />
          <button onClick={() => handleRemoveField(index)}>Remove</button>
        </div>
      ))}
      <h2>Preview</h2>
      <table>
        <thead>
          <tr>
            <th>Bar</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {previewData.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarChartForm;
