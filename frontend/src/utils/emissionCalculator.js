// src/utils/emissionCalculator.js
export function calculateEmissions({ fuelType, temperature, pressure, airFlow, fuelFlow }) {
  // normalize values (numbers)
  const temp = Number(temperature);
  const pres = Number(pressure);
  const air = Number(airFlow);
  const fuel = Number(fuelFlow);

  // base CO2 emission factors (simplified, adjust later with real factors)
  const fuelFactors = {
    Propane: 1.51,      // placeholder factor
    "Natural Gas": 2.75,
    "Purge Gas": 2.60,
    Coal: 3.20,
  };

  const baseCO2 = fuelFactors[fuelType] ?? 2.75;

  // Combustion efficiency estimation (simple model)
  let efficiency = 0.82;
  if (temp >= 900) efficiency += 0.06;
  else if (temp >= 800) efficiency += 0.03;
  else if (temp < 700) efficiency -= 0.07;

  // air effect (assume airFlow in Nm3/h)
  if (air < 0.5 * fuel) efficiency -= 0.10;   // very low relative air
  if (air >= 2 * fuel) efficiency += 0.03;     // lots of excess air helps burn (but not infinite)

  // pressure small effect
  if (pres < 0.9) efficiency -= 0.03;
  if (pres > 1.5) efficiency += 0.01;

  // clamp
  efficiency = Math.max(0.5, Math.min(0.98, efficiency));

  // Emissions approximations
  // CO2 proportional to fuel amount * factor * efficiency
  const CO2 = fuel * baseCO2 * efficiency;

  // CO from incomplete combustion ~ fraction of unburned carbon
  const unburnedFraction = 1 - efficiency;
  const CO = fuel * baseCO2 * unburnedFraction * 0.18; // tuned factor - small fraction becomes CO

  // Particulate / soot / elemental carbon - rough estimate
  const carbon = fuel * 0.02 * (unburnedFraction * 2); // small baseline scaled by inefficiency

  // Recommendations generator
  const recs = [];
  if (efficiency < 0.7) recs.push("Low combustion efficiency — check burner tuning, increase temperature and air supply.");
  if (temp < 780) recs.push("Increase furnace temperature (°C) to improve combustion.");
  if (air < fuel * 0.8) recs.push("Increase air flow relative to fuel (insufficient air).");
  if (unburnedFraction > 0.15) recs.push("Significant incomplete combustion — inspect fuel/air mixing and burner flame.");
  if (CO2 > fuel * baseCO2 * 0.95) recs.push("High CO₂ per fuel — consider fuel quality or optimizing firing strategy.");
  if (recs.length === 0) recs.push("Combustion within expected range — maintain current operating point and monitor trends.");

  return {
    efficiency: Number((efficiency * 100).toFixed(2)), // %
    CO2: Number(CO2.toFixed(3)),
    CO: Number(CO.toFixed(3)),
    carbon: Number(carbon.toFixed(4)),
    recommendations: recs,
    meta: { baseCO2 }
  };
}
