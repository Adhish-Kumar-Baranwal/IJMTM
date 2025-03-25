import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./SigninPageFolder/SigninPage";
import Author from "./Author Page/Author";
import HomePage from "./HomePage/HomePage";
import PublishedPapers from "./components/sections/PublishedPapers/PublishedPapers";

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
        <Route path="/PublishedPapers" element={<PublishedPapers />} />
      </Routes>
    </Router>
  );
};

export default App;
