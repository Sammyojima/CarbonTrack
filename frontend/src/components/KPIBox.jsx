export default function KPIBox({ title, value, color }) {
  return (
    <div className={`rounded-2xl p-6 shadow-md text-white ${color}`}>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
