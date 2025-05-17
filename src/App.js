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
const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();
  if (!token.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
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
        <Route path="/" element={ <Home />} />
        {/* Protected routes */}
        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          }
        />
      <Route
          path="/instructions"
          element={
            <ProtectedRoute>
              <InstructionsPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/children"
          element={
            <ProtectedRoute>
             <ChildrenPage/>
            </ProtectedRoute>
          }
        />
        <Route path='/childDetails/:id' element={<ChildDetailsPage/>}/>
        <Route
          path="/addplayer"
          element={
            <ProtectedRoute>
              <AddPlayerForm />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect invalid paths to login */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        <Route path="/addplayer/evaluatedTests/:id" element={<ChildTestResultsPage/>} />
        <Route path="/addplayer/evaluatedTests/evaluatedCategories/:id" element={<ChildCategoriesResultsPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;