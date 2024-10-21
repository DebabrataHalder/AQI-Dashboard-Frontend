import React from 'react';
import Dashboard from './components/Dashboard'; // Adjust the path if necessary

function App() {
  return (
    <div className="App">
      <Dashboard /> 
    </div>
  );
}

export default App;



























































































































// import React, { useEffect, useState } from 'react';
// import GaugeChart from 'react-gauge-chart';
// import { Line } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // NavBar Component
// const NavBar = () => {
//   return (
//     <nav style={styles.navbar}>
//       <h1 style={styles.navbarText}>Continuous Ambient Air Quality Monitoring System</h1>
//       <img
//         src="plumuleLogo.jpeg"  // Replace with the actual logo URL
//         alt="Plumule Research Logo"
//         style={styles.logo}
//       />
//     </nav>
//   );
// };

// // Helper function to generate timestamps for the past 30 minutes with 5-minute intervals
// const generateTimeLabels = () => {
//   const labels = [];
//   const now = new Date();
//   for (let i = 0; i <= 30; i += 5) {
//     const time = new Date(now - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     labels.unshift(time);
//   }
//   return labels;
// };

// // Sample chart data generator function
// const generateInitialChartData = (label) => {
//   const randomData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)); // Random data between 0 and 100
//   return {
//     labels: generateTimeLabels(),
//     datasets: [
//       {
//         label,
//         data: randomData,
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };
// };

// // Dashboard component
// const Dashboard = () => {
//   const sensors = ['CO2', 'VOC', 'PM2.5', 'PM10', 'O2', 'Temperature', 'Humidity'];

//   // State to hold chart data
//   const [chartData, setChartData] = useState(sensors.map(label => generateInitialChartData(label)));
//   const [aqi, setAqi] = useState(Math.floor(Math.random() * 501));

//   // Brighter shades of the same colors
//   const colors = [
//     "#32CD32", // Brighter Green for Good
//     "#9ACD32", // Brighter Olive for Satisfactory
//     "#FFD700", // Brighter Yellow for Moderate
//     "#FF8C00", // Brighter Orange for Poor
//     "#FF4500", // Brighter Red for Very Poor
//     "#B22222"  // Brighter Dark Red for Severe
//   ];

//   const getAqiLabel = (value) => {
//     if (value <= 50) return "Good";
//     if (value <= 100) return "Satisfactory";
//     if (value <= 200) return "Moderate";
//     if (value <= 300) return "Poor";
//     if (value <= 400) return "Very Poor";
//     return "Severe";
//   };

//   const getColorForAqi = (value) => {
//     if (value <= 50) return colors[0];
//     if (value <= 100) return colors[1];
//     if (value <= 200) return colors[2];
//     if (value <= 300) return colors[3];
//     if (value <= 400) return colors[4];
//     return colors[5];
//   };

//   const percentage = aqi / 500;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newAqi = Math.floor(Math.random() * 501);
//       setAqi(newAqi);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const gaugeContainerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: '10px', // Reduced distance between gauge and charts
//   };

//   // Effect to update only the last data point every 5 seconds
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setChartData(prevData =>
//         prevData.map((dataSet) => {
//           // Create a copy of the current dataset
//           const updatedDataSet = { ...dataSet };
//           // Update only the last data point with a new random value
//           updatedDataSet.datasets[0].data[updatedDataSet.datasets[0].data.length - 1] = Math.floor(Math.random() * 100);
//           return updatedDataSet;
//         })
//       );
//     }, 5000);

//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, []);

//   return (
//     <div>
//       {/* NavBar */}
//       <NavBar />
//       <div style={styles.dashboard}>
//         <div style={gaugeContainerStyle}>
//           <h2>Current AQI: {aqi}</h2>
//           <GaugeChart
//             id="gauge-chart"
//             percent={percentage}
//             arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
//             colors={colors}
//             needleColor="#000000"
//             textColor={getColorForAqi(aqi)}
//             formatTextValue={() => getAqiLabel(aqi)}
//             style={{ width: '100%', maxWidth: '400px' }}
//           />
//         </div>
//         <div style={styles.lineChartsContainer}>
//           {sensors.map((label, index) => (
//             <div style={styles.chartContainer} key={label}>
//               <h4 style={styles.latestReading}>
//                 {label}: {chartData[index].datasets[0].data[chartData[index].datasets[0].data.length - 1]}
//               </h4>
//               <Line
//                 data={chartData[index]} // Use the updated chart data
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: true, // Ensure aspect ratio is maintained
//                   layout: {
//                     padding: 0, // Set padding of all graphs to 0
//                   },
//                   plugins: {
//                     legend: {
//                       display: false, // Remove redundant label
//                     },
//                   },
//                   scales: {
//                     y: {
//                       title: {
//                         display: true,
//                         text: 'Levels',
//                       },
//                     },
//                   },
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   navbar: {
//     width: '100%',
//     backgroundColor: '#ADD8E6', // Light Blue background
//     color: '#00008B', // Dark Blue text for contrast
//     padding: '10px 20px', // Added padding for better spacing
//     textAlign: 'left', // Align text to the left
//     position: 'fixed',
//     top: 0,
//     zIndex: 1000,
//     display: 'flex', // Add flexbox to align items
//     justifyContent: 'space-between', // Space between text and logo
//     alignItems: 'center', // Vertically center items
//   },
//   navbarText: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     margin: 0,
//   },
//   logo: {
//     height: '40px', // Adjust the height of the logo
//     marginRight: '20px', // Space between logo and edge
//   },
//   dashboard: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '20px',
//     paddingTop: '70px', // Offset for the navbar height
//     height: '100vh',
//     overflowY: 'auto',
//   },
//   aqiGaugeContainer: {
//     flexBasis: '100%',
//     maxWidth: '500px',
//     margin: '20px auto',
//   },
//   lineChartsContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   chartContainer: {
//     flexBasis: '30%',
//     minWidth: '200px',
//     maxWidth: '400px',
//     minHeight: '250px',
//     maxHeight: '300px', // Set a max height to prevent stretching
//     padding: '0px', // Set padding of the container to 0
//     boxSizing: 'border-box',
//     margin: '0px', // Ensure no extra margin
//   },
//   latestReading: {
//     textAlign: 'center',
//     marginBottom: '10px',
//   },

//   // Responsive styles for mobile
//   '@media (max-width: 768px)': {
//     lineChartsContainer: {
//       flexDirection: 'column', // Stack charts vertically on mobile
//     },
//     chartContainer: {
//       flexBasis: '100%', // Each chart takes full width on mobile
//       minWidth: '90%', // Slight padding from the sides
//       maxWidth: '100%', // Maximize width for better visibility on mobile
//       minHeight: '300px', // Larger height for better viewing on mobile
//       maxHeight: '400px',
//     },
//   },
// };

// export default Dashboard;
