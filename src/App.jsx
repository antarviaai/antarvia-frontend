// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import './App.css';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPasswordPage from './pages/ResetPasswordPage';

// --- NEW LAYOUT IMPORT ---
// (Assuming you created this file in this location)
import GuardLayout from './components/layout/GuardLayout'; 

// --- NEW DASHBOARD SYSTEM IMPORTS ---
import DashboardRedirectPage from './pages/DashboardRedirectPage';
import ResidentDashboardPage from './pages/ResidentDashboardPage';
import ManagementDashboardPage from './pages/ManagementDashboardPage';
import CleanerDashboardPage from './pages/CleanerDashboardPage'; // Moved up

// --- RESIDENT FEATURE IMPORTS ---
import MaintenanceRequestPage from './pages/MaintenanceRequestPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import OnlinePaymentsPage from './pages/OnlinePaymentsPage';
import VisitorPassPage from './pages/VisitorPassPage'; // This is the RESIDENT's page
import PackagePickupPage from './pages/PackagePickupPage';
import ProfilePage from './pages/ProfilePage';
import BuildingChatPage from './pages/BuildingChatPage';
import MarketplacePage from './pages/MarketplacePage';
import PollsAndSurveysPage from './pages/PollsAndSurveysPage';

// --- ADMIN FEATURE IMPORTS ---
import AnnouncementsHubPage from './pages/AnnouncementsHubPage';
import MaintenanceHubPage from './pages/MaintenanceHubPage';
import AntModePage from './pages/AntModePage';
import GuardActivityPage from './pages/GuardActivityPage';
import ViolationTrackingPage from './pages/ViolationTrackingPage';
import AntReportsPage from './pages/AntReportsPage';
import FinancialPage from './pages/FinancialPage';
import MailboxPage from './pages/MailboxPage';
import UserManagementPage from './pages/UserManagementPage';
import EVotingPage from './pages/EVotingPage';
import DocumentLibraryPage from './pages/DocumentLibraryPage';
import ArchitecturalRequestPage from './pages/ArchitecturalRequestPage';
import VendorManagementPage from './pages/VendorManagementPage';
import StoreManagementPage from './pages/StoreManagementPage';

// --- GUARD FEATURE IMPORTS (EXISTING) ---
import GuardDashboardPage from './pages/GuardDashboardPage';
import GuardAntModePage from './pages/GuardAntModePage';
import GuardPackagesPage from './pages/GuardPackagesPage';
import UnitLookupPage from './pages/UnitLookupPage';
import GuardShiftLogPage from './pages/GuardShiftLogPage';
import GuardFireModePage from './pages/GuardFireModePage';
import GuardIncidentReportPage from './pages/GuardIncidentReportPage';
import GuardIncidentHistoryPage from './pages/GuardIncidentHistoryPage';
import GuardResponderInterviewPage from './pages/GuardResponderInterviewPage';
import GuardMessagePMPage from './pages/GuardMessagePMPage';
import GuardTasksPage from './pages/GuardTasksPage';
import GuardLostAndFoundPage from './pages/GuardLostAndFoundPage';
import GuardContractorSignInPage from './pages/GuardContractorSignInPage';
import GuardKeyAssetPage from './pages/GuardKeyAssetPage';

// --- NEW GUARD FEATURE IMPORTS (PLACEHOLDERS) ---
// You will need to create these new page components
import GuardVisitorPassPage from './pages/GuardVisitorPassPage';
import GuardViolationNoticePage from './pages/GuardViolationNoticePage';
import GuardPatrolModePage from './pages/GuardPatrolModePage';
import GuardAmenityManagementPage from "./pages/GuardAmenityManagementPage";
import GuardMaintenanceRequestPage from './pages/GuardMaintenanceRequestPage.jsx';
import GuardAnnouncementsPage from './pages/GuardAnnouncementsPage';
import GuardDocumentLibraryPage from './pages/GuardDocumentLibraryPage';
import GuardMailboxPage from './pages/GuardMailboxPage';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        
        {/* --- NEW ROUTING LOGIC --- */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirectPage /></ProtectedRoute>} />
        
        {/* Specific Dashboard Routes */}
        <Route path="/resident/dashboard" element={<ProtectedRoute><ResidentDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><ManagementDashboardPage /></ProtectedRoute>} />
        
        {/* Protected Resident Feature Routes */}
        <Route path="/maintenance" element={<ProtectedRoute><MaintenanceRequestPage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/online-payments" element={<ProtectedRoute><OnlinePaymentsPage /></ProtectedRoute>} />
        <Route path="/visitor-passes" element={<ProtectedRoute><VisitorPassPage /></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute><PackagePickupPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/building-chat" element={<ProtectedRoute><BuildingChatPage /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
        <Route path="/polls-and-surveys" element={<ProtectedRoute><PollsAndSurveysPage /></ProtectedRoute>} />

        {/* Protected Admin Feature Routes */}
        <Route path="/admin/announcements" element={<ProtectedRoute><AnnouncementsHubPage /></ProtectedRoute>} />
        <Route path="/admin/maintenance" element={<ProtectedRoute><MaintenanceHubPage /></ProtectedRoute>} />
        <Route path="/admin/ant-mode" element={<ProtectedRoute><AntModePage /></ProtectedRoute>} />
        <Route path="/admin/guard-activity" element={<ProtectedRoute><GuardActivityPage /></ProtectedRoute>} />
        <Route path="/admin/violations" element={<ProtectedRoute><ViolationTrackingPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><AntReportsPage /></ProtectedRoute>} />
        <Route path="/admin/financials" element={<ProtectedRoute><FinancialPage /></ProtectedRoute>} />
        <Route path="/admin/mailbox" element={<ProtectedRoute><MailboxPage /></ProtectedRoute>} />
        <Route path="/admin/user-management" element={<ProtectedRoute><UserManagementPage /></ProtectedRoute>} />
        <Route path="/admin/e-voting" element={<ProtectedRoute><EVotingPage /></ProtectedRoute>} />
        <Route path="/admin/document-library" element={<ProtectedRoute><DocumentLibraryPage /></ProtectedRoute>} />
        <Route path="/admin/architectural-requests" element={<ProtectedRoute><ArchitecturalRequestPage /></ProtectedRoute>} />
        <Route path="/admin/vendor-management" element={<ProtectedRoute><VendorManagementPage /></ProtectedRoute>} />
        <Route path="/admin/store" element={<ProtectedRoute><StoreManagementPage /></ProtectedRoute>} />

        {/* --- NEW GUARD PORTAL NESTED ROUTES --- */}
        {/* All Guard routes are now children of GuardLayout */}
        {/* The Layout is protected, so all children are protected automatically */}
        <Route path="/guard" element={<ProtectedRoute><GuardLayout /></ProtectedRoute>}>
          
          {/* /guard will redirect to /guard/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} /> 

          {/* --- Existing Pages --- */}
          <Route path="dashboard" element={<GuardDashboardPage />} />
          <Route path="ant-mode" element={<GuardAntModePage />} />
          <Route path="packages" element={<GuardPackagesPage />} />
          <Route path="unit-lookup" element={<UnitLookupPage />} />
          <Route path="shift-log" element={<GuardShiftLogPage />} />
          <Route path="fire-mode" element={<GuardFireModePage />} />
          <Route path="incident-report" element={<GuardIncidentReportPage />} />
          <Route path="incident-history" element={<GuardIncidentHistoryPage />} />
          <Route path="responder-interview" element={<GuardResponderInterviewPage />} />
          <Route path="message-pm" element={<GuardMessagePMPage />} />
          <Route path="tasks" element={<GuardTasksPage />} />
          <Route path="lost-and-found" element={<GuardLostAndFoundPage />} />
          <Route path="contractor-signin" element={<GuardContractorSignInPage />} />
          <Route path="key-asset-management" element={<GuardKeyAssetPage />} />

          {/* --- New Pages (from our sidebar plan) --- */}
          <Route path="visitor-pass" element={<GuardVisitorPassPage />} />
          <Route path="violation-notice" element={<GuardViolationNoticePage />} />
          <Route path="patrol-mode" element={<GuardPatrolModePage />} />
          <Route path="amenity-management" element={<GuardAmenityManagementPage />} />
          <Route path="maintenance-request" element={<GuardMaintenanceRequestPage />} />
          <Route path="announcements" element={<GuardAnnouncementsPage />} />
          <Route path="document-library" element={<GuardDocumentLibraryPage />} />
          <Route path="mailbox" element={<GuardMailboxPage />} />

        </Route>

        {/* --- CLEANER PORTAL ROUTE --- */}
        <Route path="/cleaner/dashboard" element={<ProtectedRoute><CleanerDashboardPage /></ProtectedRoute>} />


      </Routes>
    </div>
  );
}

export default App;