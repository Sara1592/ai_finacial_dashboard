"use client";
import {useState} from "react"
import Link from "next/link"

import {FaHome, FaWallet, FaChartPie, FaChartLine, FaRobot, FaCog} from "react-icons/fa"

const menu=[
    {name:"Dashboard", icon:FaHome, path:"/"},
    {name:"Transactions", icon:FaWallet, path:"/transactions"},
    {name:"Budget", icon:FaChartPie, path:"/budget"},
    {name:"Reports", icon:FaChartLine, path:"/reports"},
    {name:"AI Assistant", icon:FaRobot, path:"/ai-assistant"},
    {name:"Settings", icon:FaCog, path:"/settings"}
]

export default function Sidebar() {
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
    <aside
  className={`fixed md:static top-0 left-0 z-50 min-h-screen bg-slate-800
  text-white transition-all duration-300 ${
    isCollapsed ? "w-20 px-2 py-6" : "w-64 p-6"
  } ${
    isSidebarOpen
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0"
  }`}
>
        <h1 className="text-2xl font-bold mb-4 whitespace-nowrap overflow-hidden">
        {isCollapsed ? "💰" : "AI Finance"}
        </h1>
        <button onClick={()=>setIsCollapsed(!isCollapsed)}
        className="mb-4 px-4 py-2 bg-indigo-600  hover:bg-slate-600 transition">
            
             {isCollapsed ? "➡️" : "⬅️"}
            </button>
            <button
  onClick={() => setIsSidebarOpen(false)}
  className="md:hidden absolute top-4 right-4 text-xl"
>
  ✕
</button>
        <nav>
            <ul>
               {menu.map((item)=>{
                const Icon = item.icon
                return(
                  <Link href={item.path} key={item.name}>
                    <li key={item.name} 
                    onClick={()=>{
  setActiveMenu(item.name);
  setIsSidebarOpen(false);
}}
                    className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-3 rounded-lg cursor-pointer transition-all ${activeMenu === item.name ? "bg-indigo-600" : "hover:bg-slate-700"}
                    }`}>
                       <Icon className="mr-2"/>
                       {!isCollapsed && <span>{item.name}</span>}
                    </li> 
                    </Link>  
                )
               })}
                
                
              
            </ul>
        </nav>
        </aside>
        {isSidebarOpen && (
  <div
    onClick={() => setIsSidebarOpen(false)}
    className="fixed inset-0 z-40 bg-black/50 md:hidden"
  />
)}
         <main className="flex-1">

    {/* Mobile Menu Button */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="md:hidden m-4 p-2 bg-indigo-600 text-white rounded-lg"
    >
      ☰
    </button>
    </main>
        </div>
  )
}

