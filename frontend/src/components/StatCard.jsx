export default function StatCard({ title, value, color = "indigo" }) {
  
  const colorClasses = {
    indigo: "border-indigo-500 text-indigo-600 bg-indigo-50",
    green: "border-green-500 text-green-600 bg-green-50",
    blue: "border-blue-500 text-blue-600 bg-blue-50",
    orange: "border-orange-500 text-orange-600 bg-orange-50",
  };

  const selectedColor = colorClasses[color] || colorClasses.indigo;

  return (
    <div className={`p-6 rounded-2xl bg-white border-l-4 shadow-sm hover:shadow-md transition-all ${selectedColor.split(' ')[0]}`}>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}