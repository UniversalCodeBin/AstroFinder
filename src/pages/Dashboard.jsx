import React, { useState } from 'react';
import StatisticsButton from '../components/StatisticsButton';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    predictions: 0,
    confirmed: 0,
    candidates: 0,
  });

  const handleLoadStatistics = async () => {
    try {
      const response = await fetch('/api/statistics');
      const data = await response.json();
      // Debug: log the data to verify its structure
      console.log('Loaded statistics:', data);
      setStatistics({
        predictions: data.predictions ?? 0,
        confirmed: data.confirmed ?? 0,
        candidates: data.candidates ?? 0,
      });
    } catch (error) {
      console.error('Failed to load statistics:', error);
      setStatistics({
        predictions: 0,
        confirmed: 0,
        candidates: 0,
      });
    }
  };

  return (
    <div>
      {/* ...existing code... */}
      <StatisticsButton onLoadStatistics={handleLoadStatistics} />
      <div>
        <div>Predictions: {statistics.predictions}</div>
        <div>Confirmed: {statistics.confirmed}</div>
        <div>Candidates: {statistics.candidates}</div>
      </div>
      {/* ...existing code... */}
    </div>
  );
};

export default Dashboard;