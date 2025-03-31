import Footer from "./Footer/Footer";


const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
