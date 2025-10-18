import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  Package,
  Users,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

  const NavItem = ({ icon, text, to, alert }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 py-2 px-4 rounded-lg font-medium transition-all
          ${
            isActive
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-400 hover:bg-gray-700 hover:text-white"
          }`
        }
      >
        {icon}
        <span>{text}</span>
        {alert && (
          <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
            !
          </span>
        )}
      </NavLink>
    </li>
  );

  return (
    <>
      {/* === Mobile Button === */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-700 md:hidden transition"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* === Overlay (mobile only) === */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* === Sidebar === */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 shadow-xl
        transform transition-transform duration-300 ease-in-out z-40
        w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-lg font-bold text-white tracking-wide">
              AdminPanel
            </h1>
          </div>

          {/* Menu */}
          <ul className="flex-1 px-3 mt-3 space-y-1">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              to="/"
            />
            <NavItem icon={<Wrench size={20} />} text="Task" to="/task" alert />
            <NavItem
              icon={<Package size={20} />}
              text="Equipment"
              to="/equipment"
            />
            <NavItem icon={<Users size={20} />} text="Users" to="/users" />
            <hr className="my-3 border-gray-800" />
            <NavItem
              icon={<Settings size={20} />}
              text="Settings"
              to="/settings"
            />
          </ul>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4 flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt="User Avatar"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="leading-4">
              <h4 className="font-semibold text-white text-sm">John Doe</h4>
              <span className="text-xs text-gray-400">johndoe@gmail.com</span>
            </div>
            <LogOut
              size={20}
              className="ml-auto text-gray-400 hover:text-red-500 cursor-pointer"
            />
          </div>
        </nav>
      </aside>
    </>
  );
};
