import React, { useState } from 'react';
import './Additems.css';
import axios from 'axios';

const Additems = () => {
  const [itemsname, setitemname] = useState('');
  const [quantity, setquantity] = useState('');
  const [description, setdescription] = useState('');

  async function submit(e) {
    e.preventDefault();  

    const data = {
      name: itemsname,
      quantity: quantity,
      description: description
    };

    try {
      await axios.post('http://127.0.0.1:5000/Add', data);
      alert("Item added successfully!");
    } catch (error) {
      console.error('Error adding item:', error);
      alert("Failed to add item. Please try again.");
    }
  }

  return (
    <div className='Additems-main'>
      <div className="Additems-Heading">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="60" viewBox="0 0 24 24" fill="none" stroke="#2764EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus h-16 w-16 text-blue-600">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8"></path>
          <path d="M12 8v8"></path>
        </svg>
        <h1>Add New Item</h1>
        <p>Enter the details of your new inventory item below</p>
      </div>

      <div className="Additems-form">
        <div className="form-heading">
          <h2>Item Information</h2>
        </div>
        <div className="input-section">
          <label>
            Item Name:
            <input type="text" placeholder="Enter Item Name" onChange={(e) => setitemname(e.target.value)} />
          </label>
          <label>
            Quantity:
            <input type="number" placeholder="Enter quantity" onChange={(e) => setquantity(e.target.value)} />
          </label>
          <label>
            Date:
            <input type="date" />
          </label>
          <label>
            Description:
            <input type="text" placeholder="Enter item Description" onChange={(e) => setdescription(e.target.value)} />
          </label>
        </div>
        <div className="Additems-buttons">
          <button className="cancel">Cancel</button>
          <button className="Add-button" onClick={submit}>Add Items</button>
        </div>
      </div>
    </div>
  );
};

export default Additems;
