export default function EmptyState({ message }) {
  return (
    <div className="text-center py-16 text-gray-500">
      <p className="text-lg font-medium">
        {message}
      </p>
      <p className="text-sm mt-2">
        Ajuste os filtros ou aguarde novos envios.
      </p>
    </div>
  );
}
