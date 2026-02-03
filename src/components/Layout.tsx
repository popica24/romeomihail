import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import logoAuriu from "../assets/logo-auriu.png";
import logoNegru from "../assets/logo-negru.png";
import Footer from "./Footer";
const Layout = () => {
  return (
    <>
      <Navbar
        logoScrolled={<img src={logoNegru} className="h-16 w-auto" />}
        logo={<img src={logoAuriu} className="h-16 w-auto" />}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
