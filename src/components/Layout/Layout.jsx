import Footer from "../Footer/Footer";
import NavBar from "../sections/NavBar/NavBar";
import "./Layout.css"

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
