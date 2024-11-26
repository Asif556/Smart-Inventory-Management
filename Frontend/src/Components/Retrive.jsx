import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Retrive.css';

const Retrive = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [removeQuantity, setRemoveQuantity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/display');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedItem || !removeQuantity) {
      setError('Please select an item and enter a quantity.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/update-quantity', {
        id: selectedItem,
        quantity: parseInt(removeQuantity),
      });

      alert(`Updated successfully! Remaining quantity: ${response.data.remaining_quantity}`);
      setRemoveQuantity('');
      fetchItems(); 
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <div className="retrieve-update-container">
      <h1>Retrieve and Update Items</h1>
      <form onSubmit={handleSubmit} className="retrieve-update-form">
        <div className="form-group">
          <label>Select Item:</label>
          <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} required>
            <option value="">-- Select an Item --</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity to Remove:</label>
          <input
            type="number"
            value={removeQuantity}
            onChange={(e) => setRemoveQuantity(e.target.value)}
            min="1"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="update-btn">Remove Quantity</button>
      </form>

      <h2>Current Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Retrive;
