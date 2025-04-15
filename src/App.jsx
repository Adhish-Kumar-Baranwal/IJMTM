import { Routes, Route } from "react-router-dom";
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
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Dashboard from "./AdminDashboard/Dashboard/Dashboard";
import ReviewersPage from "./AdminDashboard/ReviewersPage/ReviewersPage";
import BrowseVolumes from "./components/sections/BrowseVolumes/BrowseVolumes";

const App = () => {
  return (
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
        path="/published-papers"
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
      <Route
        path="/browse-volumes"
        element={
          <Layout>
            <BrowseVolumes />
          </Layout>
        }
      />
      <Route
        path="/paper-submit"
        element={
          <Layout>
            {" "}
            <PaperSubmissionForm />{" "}
          </Layout>
        }
      />
      <Route path="/admin-panel" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reviewer-page" element={<ReviewersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
