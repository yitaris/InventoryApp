import { 
    LayoutDashboard ,
    Archive,
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
    title: "Envanter",
    path: "/inventory",
    icon: <Archive  size={24}/>,
    cName: "nav-text",
    element: <Team />,
  },
  {
    title: "Paytr",
    path: "/paytr",
    icon: <Archive  size={24}/>,
    cName: "nav-text",
    element: <Team />,
  },
];