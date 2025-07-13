// src/admin/AdminApp.jsx
import React from 'react';
import {useStateContext} from '../../context/ContextProvider';
import '../../styles/tailwind.css';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const {token} = useStateContext();
    const navigate = useNavigate();

    if(token){
        return navigate('/admin/dashboard');
    }else{
        return navigate('/admin/signin');
    }

    // if (loadingAuth) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    //             <p className="text-xl animate-pulse">Loading Admin Panel...</p>
    //         </div>
    //     );
    // }

    // return (
    //     <div className="admin-app">
    //         {token ? (
    //             <Dashboard onLogout={handleLogout} />
    //         ) : (
    //             <AdminLogin onLoginSuccess={handleLoginSuccess} />
    //         )}
    //     </div>
    // );
};

export default AdminLayout;
