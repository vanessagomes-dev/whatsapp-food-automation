export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <span className="text-sm text-gray-500">
        Modo: <strong className="text-green-600">Mock</strong>
      </span>
    </header>
  );
}
