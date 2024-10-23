// src/components/Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.css'; // Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Attendance System</h1>
      <div className="nav-links">
        <Link to="/" className="nav-button">Add Data</Link>
        <Link to="/show" className="nav-button">Show Data</Link>
      </div>
    </nav>
  );
};

export default Navbar;
