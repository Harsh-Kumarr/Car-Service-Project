const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color || "from-blue-500 to-indigo-500"} rounded-full -translate-y-6 translate-x-6 opacity-20 group-hover:opacity-30 transition-opacity`}></div>
      <span className="text-3xl">{icon || "📊"}</span>
      <p className="text-sm text-gray-500 font-medium mt-3">{title}</p>
      <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
    </div>
  );
};

export default StatCard;