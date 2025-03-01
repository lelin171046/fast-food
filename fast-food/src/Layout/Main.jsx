import { Outlet } from "react-router-dom";
import Navber from "../Component/Navber";
import Footer from "../Component/Footer";

const Main = () => {
    return (
        <div>
        {/* Navbar */}
        <Navber />
        {/* Outlet */}
        <div className='min-h-[calc(100vh-306px)]'>
          <Outlet />
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );
};

export default Main;