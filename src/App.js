import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //"https://aspnetwebapi20240615225434.azurewebsites.net/"
        // Replace with your actual API endpoint
        const response = await fetch(
          "https://aspnetwebapi20240615225434.azurewebsites.net/api/PledgeDrives/86"
        );
        const jsonData = await response.json();
        const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
        setData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Data Table</h1>
        <Table data={data} />
      </header>
    </div>
  );
}

function Table({ data }) {
  if (!data.length) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
