import express from "express";

const router = express.Router();

// Temporary mock data — replace later with DB logic
router.get("/history", (req, res) => {
  const mockData = [
    {
      date: "2025-11-01",
      co2Generated: 120,
      co2PerNm3: 0.8,
      reformerTemp: 830,
      steamToCarbonRatio: 2.2,
    },
    {
      date: "2025-11-02",
      co2Generated: 110,
      co2PerNm3: 0.75,
      reformerTemp: 820,
      steamToCarbonRatio: 2.1,
    },
    {
      date: "2025-11-03",
      co2Generated: 140,
      co2PerNm3: 0.9,
      reformerTemp: 860,
      steamToCarbonRatio: 1.8,
    },
  ];

  res.json(mockData);
});

export default router;
