import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Import the CSS file

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// NavBar Component
const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbarText">Continuous Ambient Air Quality Monitoring System</h1>
      <img
        src="plumuleLogo.jpeg"  // Replace with the actual logo URL
        alt="Plumule Research Logo"
        className="logo"
      />
    </nav>
  );
};

// Helper function to generate timestamps for the past 30 minutes with 5-minute intervals
const generateTimeLabels = () => {
  const labels = [];
  const now = new Date();
  for (let i = 0; i <= 30; i += 5) {
    const time = new Date(now - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    labels.unshift(time);
  }
  return labels;
};

// Sample chart data generator function
const generateInitialChartData = (label) => {
  const randomData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)); // Random data between 0 and 100
  return {
    labels: generateTimeLabels(),
    datasets: [
      {
        label,
        data: randomData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

// Dashboard component
const Dashboard = () => {
  const sensors = ['CO2', 'VOC', 'PM2.5', 'PM10', 'O2', 'Temperature', 'Humidity'];

  // State to hold chart data
  const [chartData, setChartData] = useState(sensors.map(label => generateInitialChartData(label)));
  const [aqi, setAqi] = useState(Math.floor(Math.random() * 501));

  // Brighter shades of the same colors
  const colors = [
    "#32CD32", // Brighter Green for Good
    "#9ACD32", // Brighter Olive for Satisfactory
    "#FFD700", // Brighter Yellow for Moderate
    "#FF8C00", // Brighter Orange for Poor
    "#FF4500", // Brighter Red for Very Poor
    "#B22222"  // Brighter Dark Red for Severe
  ];

  const getAqiLabel = (value) => {
    if (value <= 50) return "Good";
    if (value <= 100) return "Satisfactory";
    if (value <= 200) return "Moderate";
    if (value <= 300) return "Poor";
    if (value <= 400) return "Very Poor";
    return "Severe";
  };

  const getColorForAqi = (value) => {
    if (value <= 50) return colors[0];
    if (value <= 100) return colors[1];
    if (value <= 200) return colors[2];
    if (value <= 300) return colors[3];
    if (value <= 400) return colors[4];
    return colors[5];
  };

  const percentage = aqi / 500;

  useEffect(() => {
    const interval = setInterval(() => {
      const newAqi = Math.floor(Math.random() * 501);
      setAqi(newAqi);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData(prevData =>
        prevData.map((dataSet) => {
          const updatedDataSet = { ...dataSet };
          updatedDataSet.datasets[0].data[updatedDataSet.datasets[0].data.length - 1] = Math.floor(Math.random() * 100);
          return updatedDataSet;
        })
      );
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <NavBar />
      <div className="dashboard">
        <div className="gaugeContainer">
          <h2>Current AQI: {aqi}</h2>
          <GaugeChart
            id="gauge-chart"
            percent={percentage}
            arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
            colors={colors}
            needleColor="#000000"
            textColor={getColorForAqi(aqi)}
            formatTextValue={() => getAqiLabel(aqi)}
            style={{ width: '100%', maxWidth: '400px' }}
          />
        </div>
        <div className="lineChartsContainer">
          {sensors.map((label, index) => (
            <div className="chartContainer" key={label}>
              <h4 className="latestReading">
                {label}: {chartData[index].datasets[0].data[chartData[index].datasets[0].data.length - 1]}
              </h4>
              <Line
                data={chartData[index]}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  layout: {
                    padding: 0,
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: 'Levels',
                      },
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
