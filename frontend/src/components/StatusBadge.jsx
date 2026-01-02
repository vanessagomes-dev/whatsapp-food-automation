export default function StatusBadge({ value, type = "default" }) {
  const styles = {
    origem: {
      scheduler: "bg-blue-100 text-blue-700",
      api: "bg-purple-100 text-purple-700",
    },
    modo: {
      mock: "bg-yellow-100 text-yellow-700",
      prod: "bg-green-100 text-green-700",
    },
    default: {
      default: "bg-gray-100 text-gray-700",
    },
  };

  const badgeStyle =
    styles[type]?.[value] || styles.default.default;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyle}`}
    >
      {value}
    </span>
  );
}
