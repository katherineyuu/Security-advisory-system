import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Label } from 'recharts';
import './BarGraph.css';

const BarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch JSON data from the API
    fetch('http://localhost:3001/api/v1/cves/recent?time_range=month')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(parsedData => {
        console.log("Fetched Data:", parsedData); // Debugging: Check fetched data

        // Extract and format data with colors
        const scoreRanges = {
          '0-1': { count: 0, color: '#00FF00' }, // Green
          '1-2': { count: 0, color: '#7FFF00' }, // Light Green
          '2-3': { count: 0, color: '#ADFF2F' }, // Green-Yellow
          '3-4': { count: 0, color: '#FFFF00' }, // Yellow
          '4-5': { count: 0, color: '#FFD700' }, // Gold
          '5-6': { count: 0, color: '#FFA500' }, // Orange
          '6-7': { count: 0, color: '#FF8C00' }, // Dark Orange
          '7-8': { count: 0, color: '#FF4500' }, // Orange-Red
          '8-9': { count: 0, color: '#FF0000' }, // Red
          '9+': { count: 0, color: '#8B0000' }  // Dark Red
        };

        parsedData.forEach(item => {
          const score = item.max_cvss_base_score;
          if (score >= 0 && score < 1) scoreRanges['0-1'].count++;
          else if (score >= 1 && score < 2) scoreRanges['1-2'].count++;
          else if (score >= 2 && score < 3) scoreRanges['2-3'].count++;
          else if (score >= 3 && score < 4) scoreRanges['3-4'].count++;
          else if (score >= 4 && score < 5) scoreRanges['4-5'].count++;
          else if (score >= 5 && score < 6) scoreRanges['5-6'].count++;
          else if (score >= 6 && score < 7) scoreRanges['6-7'].count++;
          else if (score >= 7 && score < 8) scoreRanges['7-8'].count++;
          else if (score >= 8 && score < 9) scoreRanges['8-9'].count++;
          else if (score >= 9) scoreRanges['9+'].count++;
        });

        console.log("Score Ranges:", scoreRanges); // Debugging: Check processed data

        const chartData = Object.keys(scoreRanges).map(range => ({
          scoreRange: range,
          count: scoreRanges[range].count,
          fill: scoreRanges[range].color
        }));

        console.log("Chart Data:", chartData); // Debugging: Check chart data

        setData(chartData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <BarChart width={800} height={400} data={data} className="bar-chart">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="scoreRange">
        <Label value="CVSS Score" offset={-5} position="insideBottom" />
      </XAxis>
      <YAxis />
      <Tooltip />
      <Bar dataKey="count">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarGraph;