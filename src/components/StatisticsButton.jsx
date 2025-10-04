import React from 'react';

const StatisticsButton = ({ onLoadStatistics }) => (
  <button onClick={onLoadStatistics}>
    Load Statistics
  </button>
);

export default StatisticsButton;