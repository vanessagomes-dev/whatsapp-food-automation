export default function StatCard({ title, value, color = "indigo" }) {
  const colorClasses = {
    indigo: "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20",
    green: "border-green-500 text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20",
    blue: "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20",
    orange: "border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/20",
  };

  const selectedColor = colorClasses[color] || colorClasses.indigo;

  return (
    <div className={`p-6 rounded-2xl bg-white dark:bg-[#1e293b] border-l-4 shadow-sm hover:shadow-md transition-all duration-300 border-slate-100 dark:border-slate-800 ${selectedColor.split(' ')[0]}`}>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-800 dark:text-white transition-colors">{value}</p>
      </div>
    </div>
  );
}