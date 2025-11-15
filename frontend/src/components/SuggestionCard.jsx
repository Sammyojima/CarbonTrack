export default function SuggestionCard({ suggestion }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h4 className="font-semibold text-blue-600 mb-2">Tip</h4>
      <p>{suggestion}</p>
    </div>
  );
}
