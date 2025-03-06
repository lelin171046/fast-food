import { Outlet, useLocation } from "react-router-dom";
import Navber from "../Component/Navber";
import Footer from "../Component/Footer";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('sign-in') 
    return (
        <div>
        {/* Navbar */}
        {noHeaderFooter || <Navber />}
        {/* Outlet */}
        <div className='min-h-[calc(100vh-306px)]'>
          <Outlet />
        </div>
        {/* Footer */}
      {noHeaderFooter ||  <Footer />}
      </div>
    );
};

export default Main;