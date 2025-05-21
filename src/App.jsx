import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPageFolder/SigninPage";
import SignupPage from "./pages/SignupPageFolder/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import PublishedPapers from "./pages/PublishedPapers/PublishedPapers";
import Journal_Information from "./pages/Journal_Information/Journal_Information";
import AboutReviewerPage from "./pages/AboutReviewer/AboutReviewerPage";
import JournalPolicies from "./pages/JournalPolicies/JournalPolicies";
import PublishingModels from "./pages/PublishingModels/PublishingModels";
import ReviewerPaperModal from "./ReviewerDashboard/ReviewerPaperView/ReviewerPaperModal";
import PaymentSuccessModal from "./components/PaymentSuccessModal/PaymentSuccessModal";
import CurrentVolume from "./pages/CurrentVolume/CurrentVolume";
import PaperSubmissionForm from "./pages/PaperSubmissionForm/PaperSubmissionForm";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Dashboard from "./AdminDashboard/Dashboard/Dashboard";
import ReviewersPage from "./AdminDashboard/ReviewersPage/ReviewersPage";
import BrowseVolumes from "./pages/BrowseVolumes/BrowseVolumes";
import Subjects from "./pages/Subjects/Subjects";
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
import PaperApprovedMain from "./AuthorDashboard/PaperApprovedMain/PaperApprovedMain";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import VolumesCreate from "./AdminDashboard/Volumes/VolumesCreate/VolumesCreate";
import Volumes from "./AdminDashboard/Volumes/Volumes";
import Papers from "./components/sections/Papers/Papers";
import ReviewerForm from "./pages/ReviewerForm/ReviewerForm";
import Layout from "./components/Layout/Layout";
import ContactUs from "./pages/ContactUs/ContactUs";

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
        path="/subjects"
        element={
          <Layout>
            <Subjects />
          </Layout>
        }
      />
      <Route
        path="/current-volume"
        element={
          <Layout>
            <CurrentVolume />
          </Layout>
        }
      />
      <Route path="/review-paper" element={<ReviewerPaperModal />} />
      <Route
        path="/payment-success"
        element={<PaymentSuccessModal isOpen={true} />}
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
        path="/contact-us"
        element={
          <Layout>
            <ContactUs />
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
      <Route
        path="/paper/:id"
        element={
          <Layout>
            {" "}
            <Papers />{" "}
          </Layout>
        }
      />

      <Route path="/adminPanel" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reviewerPage" element={<ReviewersPage />} />
        <Route path="authorInfo" element={<AuthorInfoMain />} />
        <Route path="paperDashboard" element={<PapersDashboard />} />
        <Route path="volumes" element={<Volumes />} />
        <Route path="volumes/create" element={<VolumesCreate />} />{" "}
        {/* Moved out */}
      </Route>

      <Route path="/reviewerDashboard" element={<ReviewerDashboard />}>
        <Route index element={<ReviewerDashboardSection />} />
        <Route path="dashboard" element={<ReviewerDashboardSection />} />
        <Route path="assignedPaper" element={<AssignedPapers />} />
        <Route path="reviewedPaper" element={<ReviewedDashboard />} />
      </Route>

      <Route path="/author" element={<AuthorDashboard />}>
        <Route index element={<AuthorDashboardSection />} />
        <Route path="authorDashboard" element={<AuthorDashboardSection />} />
        <Route path="paperSubmitted" element={<PaperSubmittedMain />} />
        <Route path="paperPublished" element={<PaperPublishedMain />} />
        <Route path="paperApproved" element={<PaperApprovedMain />} />
      </Route>
    </Routes>
  );
};

export default App;
