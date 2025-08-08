import SidebarLayout from "../components/SideBarLayout";
import { SIDEBAR_DASHBOARD } from "../utils/commonUtils";


const HomePage = () => {
  return (
    <>
        <SidebarLayout mainOptionSelected = {SIDEBAR_DASHBOARD} optionSelected={SIDEBAR_DASHBOARD}/>
    </>
  );
};

export default HomePage;
