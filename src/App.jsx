import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SigninPage from "./SigninPageFolder/SigninPage";
import Author from "./Author Page/Author";
import HomePage from "./HomePage/HomePage";
import Footer from "./Footer/Footer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route path="/Author" element={<Author />} />
        <Route path="/SigninPage" element={<SigninPage />} />
        <Route path="/author" element={<Author />} />
      </Routes>
    </Router>
  );
};

export default App;
