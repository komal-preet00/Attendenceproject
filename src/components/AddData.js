import React, { useState } from 'react';
import { database } from '../appwrite'; // Import Appwrite setup
import './AddData.css'; // AddData styles

const AddData = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    date: '',
    department: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await database.createDocument(
        '670ce7790018824faa22', // Replace with Database ID
        '670ce788000d3b49762d', // Replace with Collection ID
        'unique()',
        formData
      );
      alert('Employee data added successfully!');
    } catch (error) {
      console.error('Error adding employee data:', error);
      alert('Failed to add employee data.');
    }
  };

  return (
    <div className="add-data-container">
      <br />
      <br />
      <h2>Add Employee Data</h2>
      <form onSubmit={handleSubmit} className="data-form">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee Data</button>
      </form>
    </div>
  );
};

export default AddData;
