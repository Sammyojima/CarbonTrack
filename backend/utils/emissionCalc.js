export function calculateEmissions(data) {
  const { fuelType, temperature, pressure, airFlow, fuelFlow } = data;

  // Fuel carbon content (kg CO2 per Nm3 or per kg)
  const fuelFactors = {
    "natural_gas": 2.75,     // kg CO2 per Nm³
    "propane": 1.51,         // kg CO2 per L
    "purge_gas": 2.60,       // assumed methane-rich
    "coal": 2.86             // kg CO2 per kg (simplified)
  };

  const baseCO2Factor = fuelFactors[fuelType] || 2.75;

  // Estimate efficiency based on operating conditions
  let efficiency = 0.85;

  if (temperature > 850) efficiency += 0.05;
  if (temperature < 750) efficiency -= 0.05;

  if (airFlow < 100) efficiency -= 0.10;  // insufficient air
  if (airFlow > 200) efficiency += 0.02;  // excess air improves burn

  if (pressure < 1) efficiency -= 0.03;

  if (efficiency > 0.98) efficiency = 0.98;
  if (efficiency < 0.50) efficiency = 0.50;

  // Emissions
  const CO2 = fuelFlow * baseCO2Factor * efficiency;
  const CO = fuelFlow * baseCO2Factor * (1 - efficiency) * 0.02; // 2% of unburned carbon becomes CO

  return {
    efficiency: (efficiency * 100).toFixed(2),
    CO2: CO2.toFixed(2),
    CO: CO.toFixed(2),
    recommendation: generateRecommendation(efficiency, temperature, airFlow)
  };
}

function generateRecommendation(eff, temp, air) {
  if (eff < 0.70) {
    return "⚠ Low combustion efficiency. Increase combustion air supply and check burner condition.";
  }
  if (air < 120) {
    return "Increase air flow — insufficient air is causing CO formation.";
  }
  if (temp < 780) {
    return "Raise furnace temperature — low temperature reduces combustion efficiency.";
  }
  return "✔ Combustion is stable. Maintain current operation.";
}
