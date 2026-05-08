import { useState } from 'react'
import "./App.css"
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Strategy from './pages/Strategy'
import LoanManager from './pages/LoanManager'
import Calender from './pages/Calender'
import MainLayout from './components/MainLayout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Support from './pages/Support'
import { authAPI } from './services/api'

const ProtectedRoute = ({ children }) => {
  const user = authAPI.getCurrentUser();
  return user ? children : <Navigate to="/signin" replace />;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/support' element={<Support/>}/>
        
        <Route element={
          <ProtectedRoute>
            <MainLayout 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/loan-manager" element={<LoanManager />} />
          <Route path="/calendar" element={<Calender />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
