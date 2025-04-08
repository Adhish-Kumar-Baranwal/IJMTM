import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./SigninPageFolder/SigninPage";
import Author from "./Author Page/Author";
import HomePage from "./HomePage/HomePage";
import PublishedPapers from "./components/sections/PublishedPapers/PublishedPapers";
import ReviewerForm from "./components/sections/ReviewerForm/ReviewerForm";
import AuthorForm from "./components/sections/AuthorForm/AuthorForm";
import Journal_Information from "./components/sections/Journal_Information/Journal_Information";
import Layout from "./Layout";
import AboutReviewerPage from "./components/sections/AboutReviewer/AboutReviewerPage";
import PaperSubmissionForm from "./components/sections/PaperSubmissionForm/PaperSubmissionForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Layout>
                <HomePage />
              </Layout>
            </>
          }
        />
        <Route
          path="/Author"
          element={
            <Layout>
              <Author />
            </Layout>
          }
        />
        <Route path="/SigninPage" element={<SigninPage />} />
        <Route
          path="/PublishedPapers"
          element={
            <Layout>
              <PublishedPapers />
            </Layout>
          }
        />
        <Route
          path="/apply-for-reviewer"
          element={
            <Layout>
              <ReviewerForm />
            </Layout>
          }
        />
        <Route
          path="/apply-as-author"
          element={
            <Layout>
              <AuthorForm />
            </Layout>
          }
        />
        <Route
          path="/journal-information"
          element={
            <Layout>
              <Journal_Information />
            </Layout>
          }
        />
        <Route
          path="/about-reviewer"
          element={
            <Layout>
              <AboutReviewerPage />
            </Layout>
          }
        />
        <Route path="/paper-submit" element={<PaperSubmissionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
