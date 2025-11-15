import ProcessData from "../models/ProcessData.js";
import csv from "csv-parser";
import fs from "fs";
import path from "path";

// Simple CO2 calculation based on methane reforming stoichiometry
const calculateCO2 = ({ naturalGasFlow, reformerTemp, steamToCarbonRatio }) => {
  // Example: 1 Nm³ CH4 -> 2 kg CO2 (simplified)
  const co2 = naturalGasFlow * 2; 
  return co2;
};

// Manual input
export const addProcessData = async (req, res) => {
  const { date, naturalGasFlow, reformerTemp, steamToCarbonRatio } = req.body;
  const userId = req.user.id;

  try {
    const co2Generated = calculateCO2({ naturalGasFlow, reformerTemp, steamToCarbonRatio });

    const newData = await ProcessData.create({
      user: userId,
      date,
      naturalGasFlow,
      reformerTemp,
      steamToCarbonRatio,
      co2Generated,
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// CSV Upload
export const uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const results = [];
  const userId = req.user.id;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      const { date, naturalGasFlow, reformerTemp, steamToCarbonRatio } = data;
      const co2Generated = calculateCO2({ 
        naturalGasFlow: parseFloat(naturalGasFlow), 
        reformerTemp: parseFloat(reformerTemp), 
        steamToCarbonRatio: parseFloat(steamToCarbonRatio) 
      });

      results.push({
        user: userId,
        date: new Date(date),
        naturalGasFlow: parseFloat(naturalGasFlow),
        reformerTemp: parseFloat(reformerTemp),
        steamToCarbonRatio: parseFloat(steamToCarbonRatio),
        co2Generated,
      });
    })
    .on("end", async () => {
      try {
        await ProcessData.insertMany(results);
        fs.unlinkSync(req.file.path); // remove temp file
        res.status(201).json({ message: "CSV data uploaded successfully", count: results.length });
      } catch (err) {
        res.status(500).json({ message: "Error saving data", error: err.message });
      }
    });
};
