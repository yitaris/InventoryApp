import { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./SidebarData";
import { useAuth } from "../../contexts/AuthContext";
import { ChevronRight, LogOut, Moon, Settings } from "lucide-react";

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const { user, logout } = useAuth();

    return (
        <div className="h-screen fixed z-50 flex items-center">
            {/* Sidebar */}
            <div
                className={`h-5/6 flex flex-col bg-[#1e1e1e] text-white shadow-xl py-6 relative transition-all duration-500 ${expanded ? "w-[70px]" : "0px"}`}
            >
                {/* Expand Button */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#1e1e1e] p-2 cursor-pointer h-[60px] rounded-full"
                >
                    <ChevronRight
                        size={20}
                        className={`transition-transform text-white ${expanded ? "rotate-180" : ""}`}
                    />
                </button>

                {/* Profile Section */}
                <div
                    className="relative flex items-center justify-center cursor-pointer mt-4"
                    onMouseEnter={() => setDropDownMenu(true)}
                    onMouseLeave={() => setDropDownMenu(false)}
                >
                    <img
                        src={user?.avatar_url}
                        className="h-10 w-10 rounded-xl object-cover hover:scale-105 transition-all duration-300"
                        alt="Profil"
                    />

                    {/* Dropdown Menü */}
                    {dropDownMenu && (
                        <div className="absolute left-full ml-2 bg-[#1e1e1e] shadow-lg rounded-lg w-44 p-3 border border-gray-700">
                            <ul className="flex flex-col gap-2 text-sm">
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-[#2c2c2c] cursor-pointer rounded-md">
                                    <Settings size={16} /> Ayarlar
                                </li>
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-[#2c2c2c] cursor-pointer rounded-md">
                                    <Moon size={16} /> Karanlık Mod
                                </li>
                                <li
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#2c2c2c] cursor-pointer rounded-md text-red-400"
                                    onClick={logout}
                                >
                                    <LogOut size={16} /> Çıkış Yap
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Menü Iconları */}
                <nav className="flex flex-col items-center gap-6 mt-6">
                    {sidebarData.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:bg-[#272727]"
                        >
                            <div className="w-6 h-6 flex items-center justify-center text-gray-300">{item.icon}</div>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;