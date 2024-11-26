import React, { useState, useEffect } from "react";
import "./Display.css";

const Display = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [displayQuantity, setDisplayQuantity] = useState('');
  const [displayList, setDisplayList] = useState([]);
  const [present, setPresent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:5000/display');
      const data = await response.json();
      setList(data);
    };
    fetchData();
  }, []);

  const displayItems = () => {
    const selectedItem = list.find((item) => item.name === name);
    
    if (selectedItem) {
      setDisplayList([selectedItem]);
      setDisplayQuantity(selectedItem.quantity);
      setPresent(true);
    } else {
      setDisplayList([]);
      setPresent(false); 
    }
  };
  function remove(){
    setPresent(false)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Inventory Items</h1>
        <p>View and manage your inventory items below</p>
      </div>
      <div className="display-select">
        <h3 className="writeselect">Select :</h3>
        <select name="Items-selection" onChange={(e) => setName(e.target.value)}>
          <option value="">Select an Item</option>
          {list.map((item) => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>
        <button onClick={displayItems}>Display</button>
      </div>

      {present && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Date Added</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dateAdded}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className="action-buttons">
                      
                      <button className="btn delete" onClick={remove}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Display;
