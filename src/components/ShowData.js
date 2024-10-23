import React, { useState, useEffect } from 'react';
import { database } from '../appwrite'; // Import Appwrite services
import './ShowData.css'; // Import CSS for styling

const ShowData = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the employee being edited
  const [editFormData, setEditFormData] = useState({
    employeeId: '',
    employeeName: '',
    date: '',
    department: '',
    time: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await database.listDocuments(
          '670ce7790018824faa22', // Database ID
          '670ce788000d3b49762d'  // Collection ID
        );
        setData(response.documents);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await database.deleteDocument('670ce7790018824faa22', '670ce788000d3b49762d', id);
      setData(data.filter((doc) => doc.$id !== id));
    } catch (error) {
      console.error('Error deleting employee data:', error);
    }
  };

  const handleEditClick = (doc) => {
    setEditingId(doc.$id);
    setEditFormData({
      employeeId: doc.employeeId,
      employeeName: doc.employeeName,
      date: doc.date,
      department: doc.department,
      time: doc.time,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await database.updateDocument(
        '670ce7790018824faa22', // Database ID
        '670ce788000d3b49762d', // Collection ID
        editingId,
        editFormData
      );
      alert('Employee data updated successfully!');
      setData(data.map((doc) => (doc.$id === editingId ? { ...doc, ...editFormData } : doc)));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating employee data:', error);
      alert('Failed to update employee data.');
    }
  };

  return (
    <div className="show-data-container">
      <h2>Employee Data</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Department</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc.$id}>
              <td>{doc.employeeId}</td>
              <td>{doc.employeeName}</td>
              <td>{doc.date}</td>
              <td>{doc.department}</td>
              <td>{doc.time}</td>
              <td>
                <button onClick={() => handleEditClick(doc)}>Edit</button>
                <button onClick={() => handleDelete(doc.$id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingId && (
        <div className="edit-form-container">
          <form onSubmit={handleEditSubmit} className="edit-form">
            <h3>Edit Employee Data</h3>
            <input
              type="text"
              name="employeeId"
              value={editFormData.employeeId}
              onChange={handleEditChange}
              required
              placeholder="Employee ID"
            />
            <input
              type="text"
              name="employeeName"
              value={editFormData.employeeName}
              onChange={handleEditChange}
              required
              placeholder="Employee Name"
            />
            <input
              type="date"
              name="date"
              value={editFormData.date}
              onChange={handleEditChange}
              required
            />
            <input
              type="text"
              name="department"
              value={editFormData.department}
              onChange={handleEditChange}
              required
              placeholder="Department"
            />
            <input
              type="time"
              name="time"
              value={editFormData.time}
              onChange={handleEditChange}
              required
            />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShowData;
