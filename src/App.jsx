import { Routes, Route } from "react-router-dom";
import SigninPage from "./SigninPageFolder/SigninPage";
import SignupPage from "./SignupPageFolder/SignupPage";
import HomePage from "./HomePage/HomePage";
import PublishedPapers from "./components/sections/PublishedPapers/PublishedPapers";
import ReviewerForm from "./components/sections/ReviewerForm/ReviewerForm";
import AuthorForm from "./components/sections/AuthorForm/AuthorForm";
import Journal_Information from "./components/sections/Journal_Information/Journal_Information";
import Layout from "./Layout";
import AboutReviewerPage from "./components/sections/AboutReviewer/AboutReviewerPage";
import JournalPolicies from "./components/sections/JournalPolicies/JournalPolicies";
import PublishingModels from "./components/sections/PublishingModels/PublishingModels";
import PaperSubmissionForm from "./components/sections/PaperSubmissionForm/PaperSubmissionForm";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Dashboard from "./AdminDashboard/Dashboard/Dashboard";
import ReviewersPage from "./AdminDashboard/ReviewersPage/ReviewersPage";
import BrowseVolumes from "./components/sections/BrowseVolumes/BrowseVolumes";
import Subjects from "./components/sections/Subjects/Subjects";
import AuthorInfoMain from "./AdminDashboard/AuthorInfo/AuthorInfoMain";
import PapersDashboard from "./AdminDashboard/PapersDashboard/PapersDashboard";
import ReviewerDashboard from "./ReviewerDashboard/ReviewerDashboard";
import ReviewerDashboardSection from "./ReviewerDashboard/ReviewerDashboardSection/ReviewerDashboardSection";
import ReviewedDashboard from "./ReviewerDashboard/ReviewedDashboard/ReviewedDashboard";
import AssignedPapers from "./ReviewerDashboard/AssignedPapers/AssignedPapers";
import AuthorDashboard from "./AuthorDashboard/AuthorDashboard";
import AuthorDashboardSection from "./AuthorDashboard/AuthorDashboardSection/AuthorDashboardSection";
import PaperSubmittedMain from "./AuthorDashboard/PaperSubmittedMain/PaperSubmittedMain";
import PaperPublishedMain from "./AuthorDashboard/PaperPublishedMain/PaperPublishedMain";

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
      <Route path="/SigninPage" element={<SigninPage />} />
      <Route path="/SignupPage" element={<SignupPage />} />
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
        path="/subjects"
        element={
          <Layout>
            <Subjects />
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
        path="/journal-policies"
        element={
          <Layout>
            <JournalPolicies />
          </Layout>
        }
      />
      <Route
        path="/publishing-models"
        element={
          <Layout>
            <PublishingModels />
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

      {/* Admin */}
      <Route path="/adminPanel" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reviewerPage" element={<ReviewersPage />} />
        <Route path="authorInfo" element={<AuthorInfoMain />} />
        <Route path="paperDashboard" element={<PapersDashboard />} />
      </Route>

      {/* Reviewer */}
      <Route path="/reviewerDashboard" element={<ReviewerDashboard />}>
        <Route index element={<ReviewerDashboardSection />} />
        <Route path="dashboard" element={<ReviewerDashboardSection />} />
        <Route path="assignedPaper" element={<AssignedPapers />} />
        <Route path="reviewedPaper" element={<ReviewedDashboard />} />
      </Route>

      {/* Author */}
      <Route path="/author" element={<AuthorDashboard />}>
        <Route index element={<AuthorDashboardSection />} />
        <Route path="authorDashboard" element={<AuthorDashboardSection />} />
        <Route path="paperSubmitted" element={<PaperSubmittedMain />} />
        <Route path="paperPublished" element={<PaperPublishedMain />} />
      </Route>
    </Routes>
  );
};

export default App;
