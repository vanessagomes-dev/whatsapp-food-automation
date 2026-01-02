import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        WhatsApp Automation
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-green-600" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-green-600" : "hover:bg-gray-700"
            }`
          }
        >
          Histórico
        </NavLink>
      </nav>
    </aside>
  );
}
