import { useState, useEffect } from "react";
import Tooltip from "./components/Tooltip";
import "./App.css";

function App() {
  const [chartData, setChartData] = useState([]);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/AlamKhalid?y=last")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
        const { contributions } = data;
        console.log(contributions, 'twoDimensionalData')
        const twoDimensionalData = [];
        while (contributions.length)
          twoDimensionalData.push(contributions.splice(0, 7));
        setContributions(twoDimensionalData);
        console.log(twoDimensionalData, 'twoDimensionalData')
      });
  }, []);

  const getColor = (level) => {
    switch (level) {
      case 1:
        return "#0E4429";
      case 2:
        return "#006D32";
      case 3:
        return "#25A640";
      case 4:
        return "#39D353";
      default:
        return "#161B22";
    }
  };

  return (
    <div>
      <h1>GitHub Contributions Chart</h1>
      <div style={{ display: "flex", width: "100vw" }}>
        {contributions.map((row, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            {row.map((cell, index) => (
              <div key={index}>
                <Tooltip
                  content={`${cell.count} contributions on ${cell.date}`}
                >
                  <div
                    className="chart-cell"
                    style={{
                      width: 20,
                      height: 20,
                      margin: 1,
                      backgroundColor: getColor(cell.level),
                    }}
                  ></div>
                </Tooltip>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
