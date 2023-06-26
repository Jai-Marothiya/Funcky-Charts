import React, { useState, useEffect } from 'react';

const BarChartForm = ({ onLiveDataChange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = localStorage.getItem('myData');
    console.log(storedData);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  // console.log(localStorage.getItem('myData'));

  useEffect(() => {
    // Update local storage whenever data changes
    if(data.length>0)
    localStorage.setItem('myData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    onLiveDataChange(data);
  }, [data, onLiveDataChange]);

  const handleDataLabel = (e, index) => {
    const newData = [...data];
    // console.log(newData[index]);
    // console.log(typeof(e.target.value));

    // if(typeof(e.target.value)==='string'){
      newData[index].label = e.target.value;
    // }else{
    //   newData[index].value = e.target.value;
    // }
    // console.log(data);

    setData(newData);
  };
  const handleDataValue = (e, index) => {
    const newData = [...data];
    newData[index].value = e.target.value;

    setData(newData);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const label = e.target.children[0].value;
    const value = e.target.children[1].value;
    const newData = [
      ...data,
      {
        label: label,
        value: value,
      },
    ];
    console.log(newData);
    setData(newData);
    e.target.children[0].value = '';
    e.target.children[1].value = '';
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
        <input type="text" placeholder="Enter Label" />
        <input type="number" step="0.01" placeholder="Enter Data" />
        <input type="submit" value="Add Data" />
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
              <td>{index + 1}</td>
              <td>
                <input
                  type="string"
                  value={item.label}
                  onChange={(e) => handleDataLabel(e, index)}
                  placeholder={`Value ${index + 1}`}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleDataValue(e, index)}
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