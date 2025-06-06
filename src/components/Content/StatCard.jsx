const StatCard = ({ title, value }) => (
  <div className="bg-[#1e1e1e] border border-gray-700 p-4 rounded-xl text-center shadow-md animate-fade-in">
    <h3 className="text-gray-300 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default StatCard;

