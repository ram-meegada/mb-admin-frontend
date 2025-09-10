import SidebarMuiComp from "./MUI_COMPONENTS/sideBarComp";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarMuiComp />
      <main style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
