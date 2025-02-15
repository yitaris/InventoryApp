import { useState, useRef, } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { sidebarData } from "./SidebarData";
import { useAuth } from "../../contexts/AuthContext";
import {
    Settings2,
    LogOut,
    Users,
} from "lucide-react";

const Sidebar: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const { user, session, logout } = useAuth();
    const navigate = useNavigate();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const isDragging = useRef(false);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
        isDragging.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchmove", handleMouseMove);
        document.addEventListener("touchend", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging.current) return;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - startX.current;
        if (deltaX > 50) {
            setExpanded(true);
        } else if (deltaX < -50) {
            setExpanded(false);
            setProfileMenu(false);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleMouseMove);
        document.removeEventListener("touchend", handleMouseUp);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="h-screen fixed z-50 flex items-center select-none">
            <div
                ref={sidebarRef}
                className={`h-5/6 w-18 flex flex-col bg-[#1e1e1e] text-white shadow-xl rounded-r-xl p-2 relative transition-transform duration-300 ${expanded ? "translate-x-0" : "-translate-x-18"}`}
            >
                <div
                    className="absolute top-1/2 -right-5 w-6 h-18 -translate-y-1/2 bg-[#1e1e1e] rounded-r-md flex items-center justify-center cursor-pointer"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                >
                    <div className="w-1 h-8 bg-gray-400 rounded"></div>
                </div>
                <div className="relative flex items-center justify-center cursor-pointer mt-4">
                    <img
                        src={user?.avatar_url}
                        onClick={() => setProfileMenu(!profileMenu)}
                        className="h-10 w-10 rounded-xl object-cover hover:scale-105 transition-all duration-300"
                        alt="Profil"
                    />
                </div>
                {profileMenu && expanded && (
                    <div className="absolute -right-60 w-55 h-auto top-0 rounded-xl flex flex-col bg-[#1e1e1e] p-2 text-white shadow-lg">
                        {/* Profil Bilgileri */}
                        <div className="flex gap-2 border-b border-[#ffffff50] pb-2">
                            <img src={user?.avatar_url} className="w-10 h-10 object-cover rounded-xl" />
                            <div>
                                <h1 className="text-md font-bold">{user?.name}</h1>
                                <h3 className="text-xs font-normal">{session?.user.email}</h3>
                            </div>
                        </div>

                        {/* Menü Seçenekleri */}
                        <div className="mt-2 w-full h-full flex flex-col gap-2">
                            <Link 
                                to={"/setting"}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-[#272727] rounded-lg transition-all"
                            >
                                <Settings2 size={20} /> Ayarlar
                            </Link>
                            <Link 
                                to={"/team"}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-[#272727] rounded-lg transition-all"
                            >
                                <Users size={20} /> Takımım
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-[#272727] rounded-lg transition-all"
                            >
                                <LogOut size={20} /> Çıkış Yap
                            </button>
                        </div>
                    </div>
                )}

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