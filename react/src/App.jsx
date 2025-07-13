import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './layout/admin/AdminLayout';
import AdminRegister from './pages/admin/AdminRegister';

function App() {

  return (
    <Router>
      <Routes>
        {/* ADMIN ROUTES STARTS HERE */}
        <Route path='/admin/signin' element={<AdminLogin />} />
        <Route path='/admin/signup' element={<AdminRegister />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminLayout />} />
      </Routes>
    </Router>
  )
}

export default App
