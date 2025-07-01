import SidebarLayout from "../components/SideBarLayout";
import { SIDEBAR_DASHBOARD } from "../utils/commonUtils";


const HomePage = () => {
  return (
    <>
        <SidebarLayout optionSelected={SIDEBAR_DASHBOARD}/>
    </>
  );
};

export default HomePage;
