import React, { useState } from 'react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { parseHealthData, handleButtonClick } from './dataHandling';

const workoutTimestamps = [
  ['2021-08-01 04:47:38', '2021-08-07 06:09:38'],
  ['2021-09-01 04:47:38', '2021-09-07 06:31:38'],
  ['2024-12-17 04:47:38', '2024-12-17 05:51:38'],
  ['2024-11-27 04:47:38', '2024-11-27 06:30:38'],
  ['2024-12-12 04:47:38', '2024-12-12 05:39:38'],
  ['2024-12-07 04:47:38', '2024-12-07 05:22:38']
];


const Dashboard = () => {
  const navigate = useNavigate();

  const [healthData, setHealthData] = useState([]);
  const [heartRateReadings, setHeartRateReadings] = useState([])

  const handleStoringHeartRates = (completeHeartRateData) => {

    const parsedIntervals = workoutTimestamps.map(([start, end]) => {
      return { 
        start: new Date(start), 
        end: new Date(end) 
      };
    });

    const filteredData = completeHeartRateData.filter((entry) => {
      const startTime = new Date(entry.startDate);
      const endTime = new Date(entry.endDate); 

      return parsedIntervals.some(interval =>
        (startTime >= interval.start && startTime <= interval.end) || // reading starts within workout
        (endTime >= interval.start && endTime <= interval.end) || // reading ends within workout
        (startTime <= interval.start && endTime >= interval.end)   // reading completely covers workout
      );
    });
    console.log(filteredData); 
    setHeartRateReadings(filteredData);
  }


  const handleFileUpload = async (event) => {
    const XMLfile = event.target.files[0];
    try {
      const parsedData = await parseHealthData(XMLfile); 
      console.log(parsedData);
      setHealthData(parsedData);
      handleStoringHeartRates(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <div className="container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* Menu - Home, Profile, Logout */}
      <nav className="dashboard-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Upload Data from Apple Health</h1>
        <div>
            <input type="file"
             id="input"
              accept=".xml"
              onChange={(event) => handleFileUpload(event)} />
            <button onClick={() => handleButtonClick()}>Load my Data</button>
        </div>

        <div>
          <h1>Data from file: (for testing)</h1>
          {heartRateReadings ? (
              <pre>{JSON.stringify(heartRateReadings, null, 2)}</pre>
            ) : (
              <p>No data uploaded yet. Please upload a file.</p>
            )}
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;