import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Terminal } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <img
                src=".\src\assets\logo.svg"
                alt="Logo"
                className="w-10 h-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white leading-none font-mono">
                TODO_CORE
              </span>
              <span className="text-[10px] text-indigo-400 font-medium font-mono tracking-wider mt-0.5 uppercase">
                v1.0.0 // stable by FahhCLAN
              </span>
            </div>
          </div>

          {/* User info and Logout */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400">user:</span>
              <span className="font-semibold text-slate-200">{user.name}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 font-mono text-xs font-medium text-slate-400 hover:bg-red-950/20 hover:text-red-400 hover:border-red-950/50 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>logout()</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
