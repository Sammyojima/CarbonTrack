export default function EmissionResults({ results }) {
  if (!results) {
    return (
      <div className="p-6 bg-white shadow rounded-xl text-gray-600">
        No results yet. Enter process parameters to calculate emissions.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-xl font-bold text-primary mb-4">
        Emission Analysis Results
      </h2>

      <div className="space-y-2">
        <p><strong>Fuel Type:</strong> {results.fuel}</p>
        <p><strong>CO₂ Emission:</strong> {results.co2} kg/hr</p>
        <p><strong>CO Emission:</strong> {results.co} kg/hr</p>
        <p><strong>Combustion Efficiency:</strong> {results.efficiency}%</p>
        <p><strong>Excess Air:</strong> {results.excessAir}%</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-secondary">Recommendation:</h3>
        <p className="text-gray-700">{results.recommendation}</p>
      </div>
    </div>
  );
}
