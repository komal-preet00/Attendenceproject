// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddData from './components/AddData';
import ShowData from './components/ShowData';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddData />} />
        <Route path="/show" element={<ShowData />} />
      </Routes>
    </Router>
  );
}

export default App;
