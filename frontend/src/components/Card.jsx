const Card = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-sm text-textSecondary">{title}</h3>
      <p className="text-2xl font-semibold mt-2 text-primary">{value}</p>
    </div>
  );
};

export default Card;
