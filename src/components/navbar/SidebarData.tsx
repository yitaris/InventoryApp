import { 
    LayoutDashboard ,
    Users,
} from "lucide-react"

import Branch from "../../pages/(tabs)/Branch";
import Team from "../../pages/(tabs)/Team";

export const titleStartBy = "Navbar - ";
export const sidebarData = [
  {
    title: "Panel",
    path: "/",
    icon: <LayoutDashboard size={24}/>,
    cName: "nav-text",
    element: <Branch />,
  },
  {
    title: "Takım",
    path: "/team",
    icon: <Users size={24}/>,
    cName: "nav-text",
    element: <Team />,
  },
];