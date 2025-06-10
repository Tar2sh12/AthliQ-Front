import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { getAuthToken } from './services/auth';

// Pages
import Home from './pages/Home';
import SignUp from './pages/SignupPage';
import SignIn from './pages/SignInPage';
import Pricing from './pages/PricingPage';
import Footer from './components/Footer/Footer';
import AddPlayerForm from './pages/parents/addPlayer';
import InstructionsPage from './pages/parents/InstructionsPage';
import ChildrenPage from './pages/parents/ChildrenPage';
import ChildTestResultsPage from './pages/parents/testsGrades.parent';
import ChildCategoriesResultsPage from './pages/parents/EvaluateChild';
import ChildDetailsPage from './pages/parents/childDetails.parent';
import AdminDashboard from './pages/Admin/dashboard';
import UserRegistrationAdmin from './pages/Admin/acceptOrRejectUsers.admin';
import AdminDashboardHome from './pages/Admin/home.admin';
import CategoryManagement from './pages/Admin/categoryManagement.admin';
import TestManagement from './pages/Admin/testManagement.admin';
import SportManagement from './pages/Admin/sportsManagement.admin';

// Role-based protection components
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, token } = getAuthToken();
  const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const userRole = user?.[roleClaim];

  // Check if user is authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if specific role is required
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on user's actual role
    if (userRole === 'Admin') {
      return <Navigate to="/adminHomePage" replace />;
    } else if (userRole === 'User') {
      return <Navigate to="/children" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

// Admin-only route wrapper
const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="Admin">
      {children}
    </ProtectedRoute>
  );
};

// User-only route wrapper
const UserRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="User">
      {children}
    </ProtectedRoute>
  );
};

// General authenticated route (any logged-in user)
const AuthenticatedRoute = ({ children }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        {/* User-only routes */}
        <Route
          path="/players"
          element={
            <UserRoute>
              <Pricing />
            </UserRoute>
          }
        />
        <Route
          path="/instructions"
          element={
            <UserRoute>
              <InstructionsPage />
            </UserRoute>
          }
        />
        <Route
          path="/children"
          element={
            <UserRoute>
              <ChildrenPage />
            </UserRoute>
          }
        />
        <Route
          path="/addplayer"
          element={
            <UserRoute>
              <AddPlayerForm />
            </UserRoute>
          }
        />

        {/* These routes might need role checking too - assuming User access for now */}
        <Route 
          path='/childDetails/:id' 
          element={
            <UserRoute>
              <ChildDetailsPage />
            </UserRoute>
          }
        />
        <Route 
          path="/addplayer/evaluatedTests/:id" 
          element={
            <UserRoute>
              <ChildTestResultsPage />
            </UserRoute>
          }
        />
        <Route 
          path="/addplayer/evaluatedTests/evaluatedCategories/:id" 
          element={
            <UserRoute>
              <ChildCategoriesResultsPage />
            </UserRoute>
          }
        />

        {/* Admin-only routes */}
        <Route 
          path="/admin/acceptOrRejectUsers" 
          element={
            <AdminRoute>
              <UserRegistrationAdmin />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/categories" 
          element={
            <AdminRoute>
              <CategoryManagement />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/tests" 
          element={
            <AdminRoute>
              <TestManagement />
            </AdminRoute>
          }
        />
        <Route 
          path="/adminHomePage" 
          element={
            <AdminRoute>
              <AdminDashboardHome />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/sports" 
          element={
            <AdminRoute>
              <SportManagement />
            </AdminRoute>
          }
        />

        {/* Catch-all route - redirect based on role or to login */}
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Component to handle role-based redirects for invalid routes
const RoleBasedRedirect = () => {
  const { user, token } = getAuthToken();
  const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const userRole = user?.[roleClaim];

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard based on role
  if (userRole === 'Admin') {
    return <Navigate to="/adminHomePage" replace />;
  } else if (userRole === 'User') {
    return <Navigate to="/children" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default App;