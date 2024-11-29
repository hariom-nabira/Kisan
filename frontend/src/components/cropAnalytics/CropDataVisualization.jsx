import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartBar, FaChartLine } from "react-icons/fa";
import Papa from "papaparse";
import testData from "./cropdata";
const CropDataVisualization = () => {
  const [cropData, setCropData] = useState([]);
  const [xParam, setXParam] = useState("N");
  const [yParam, setYParam] = useState("P");
  const [graphType, setGraphType] = useState("Scatter");
  const [processedData, setProcessedData] = useState([]);

  const parameters = [
    "N",
    "P",
    "K",
    "temperature",
    "humidity",
    "ph",
    "rainfall",
  ];
  const graphTypes = [
    // { label: "Scatter", icon: /> },
    { label: "Line", icon: <FaChartLine /> },
    { label: "Bar", icon: <FaChartBar /> },
  ];

  // Load CSV data
  useEffect(() => {
    Papa.parse(testData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => setCropData(result.data),
    });
  }, []);

  // Process data when parameters or cropData change
  useEffect(() => {
    const uniqueCrops = [...new Set(cropData.map((item) => item.label))];
    const newData = uniqueCrops.map((cropType) => {
      const cropPoints = cropData.filter((item) => item.label === cropType);
      return {
        name: cropType,
        data: cropPoints.map((point) => ({
          x: point[xParam],
          y: point[yParam],
        })),
      };
    });
    setProcessedData(newData);
  }, [cropData, xParam, yParam]);

  // Custom colors for different crops
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#a4de6c"];

  const renderChart = () => {
    const chartProps = {
      width: 800,
      height: 400,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    switch (graphType) {
      case "Scatter":
        return (
          <ScatterChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name={xParam}
              label={{ value: xParam, position: "bottom" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yParam}
              label={{ value: yParam, angle: -90, position: "left" }}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            {processedData.map((crop, index) => (
              <Scatter
                key={crop.name}
                name={crop.name}
                data={crop.data}
                fill={colors[index % colors.length]}
              />
            ))}
          </ScatterChart>
        );

      case "Line":
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name={xParam}
              label={{ value: xParam, position: "bottom" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yParam}
              label={{ value: yParam, angle: -90, position: "left" }}
            />
            <Tooltip />
            <Legend />
            {processedData.map((crop, index) => (
              <Line
                key={crop.name}
                type="monotone"
                data={crop.data}
                name={crop.name}
                stroke={colors[index % colors.length]}
                dot
              />
            ))}
          </LineChart>
        );

      case "Bar":
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name={xParam}
              label={{ value: xParam, position: "bottom" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yParam}
              label={{ value: yParam, angle: -90, position: "left" }}
            />
            <Tooltip />
            <Legend />
            {processedData.map((crop, index) => (
              <Bar
                key={crop.name}
                dataKey="y"
                data={crop.data}
                name={crop.name}
                fill={colors[index % colors.length]}
              />
            ))}
          </BarChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl h-screen flex flex-col justify-center align-center mx-auto">
      <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
        Crop Data Visualization
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            X-Axis Parameter
          </label>
          <select
            value={xParam}
            onChange={(e) => setXParam(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {parameters.map((param) => (
              <option key={param} value={param}>
                {param}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Y-Axis Parameter
          </label>
          <select
            value={yParam}
            onChange={(e) => setYParam(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {parameters.map((param) => (
              <option key={param} value={param}>
                {param}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Graph Type
          </label>
          <select
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {graphTypes.map((type) => (
              <option key={type.label} value={type.label}>
                {type.label} {type.icon}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full aspect-[2/1] mt-8">
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>

      <a href="https://kisann.streamlit.app/">
        <button className="flex justify-center align-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300 transform hover:scale-105">
          For More Detailed Analysis
        </button>
      </a>
    </div>
  );
};

export default CropDataVisualization;
