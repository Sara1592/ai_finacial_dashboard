"use client";
import {useState} from "react"
import {FaSearch, FaBell, FaCog, FaUserCircle } from "react-icons/fa"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
      </div>
      
      
         <div className="flex items-center gap-6">
<div className="relative">
          <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="relative text-slate-600 hover:text-indigo-500 transition">
          <FaBell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
        </button>
        {isNotificationsOpen && (
          <div className="absolute right-0 top-10 z-50 w-64 rounded-xl border bg-white p-4 shadow-xl">
            <h3 className="font-semibold text-slate-800">
      Notifications
    </h3>

    <p className="mt-3 text-sm text-slate-600">
      💳 Payment received
    </p>

    <p className="mt-3 text-sm text-slate-600">
      📊 Budget exceeded
    </p>

    <p className="mt-3 text-sm text-slate-600">
      🤖 AI report ready
    </p>

          </div>

        )}
        </div>
           <button className="text-slate-600 hover:text-indigo-500 transition">
         <FaCog size={20} />
        </button>
         <div className="relative">
          <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 text-slate-700 hover:text-indigo-500 transition">
          <FaUserCircle size={28} />
          <span className="font-medium">Saranya</span>
        </button>
      

        {isProfileOpen && (
          <div className="absolute right-0 top-12 w-48 rounded-xl bg-white p-2 shadow-lg border border-gray-100">
            <button className="w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100">Profile</button>
            <button className="w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100">Settings</button>
            <button className="w-full rounded-lg px-4 py-2 text-left text-red-500 hover:bg-gray-100">Logout</button>
          </div>
        )}
      </div>
         </div>
       
       
        
        
    </header>
  );
}