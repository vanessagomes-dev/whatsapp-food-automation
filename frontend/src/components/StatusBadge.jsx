export default function StatusBadge({ value, type = "default" }) {
  const styles = {
    origem: {
      scheduler: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      api: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    },
    modo: {
      mock: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      prod: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    },
    default: {
      default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    },
  };

  const badgeStyle = styles[type]?.[value] || styles.default.default;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${badgeStyle} transition-colors`}>
      {value}
    </span>
  );
}