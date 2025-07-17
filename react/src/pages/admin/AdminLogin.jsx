import React, { useState } from 'react';
import '../../styles/tailwind.css';
import '../../styles/custom.css';
import ErrorsDisplay from '../../utlis/ErrorDisplay';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClient/axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';

const AdminLogin = ({ onLoginSuccess }) => {
    const {setToken, setUser} = useStateContext();
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
    });

    function handleChange(e){
        const {name, value} = e.target;

        setCredentials((prev)=>{
            return {...prev, [name]:value}
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(credentials);
        setIsLoading(true);

        axiosClient.post('/signin', credentials)
        .then(({data})=>{
            setIsLoading(false);
            console.log(data);
            setToken(data.token);
            setUser(data.user);
            navigate('/admin/dashboard');
        })
        .catch((error) => {
            setIsLoading(false);
            console.log(error);

            const response = error.response;

            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email: [response.data.message]
                    })
                }
            }else{
                setErrors({
                    email: [response.data.message]
                })
                toast('Invalid Credentials');
            }
        })
    };

    return (
        <div className="w-screen h-screen w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-950 text-white p-4">
            <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-700 animate-fade-in-up transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-400 mb-8 font-display leading-tight animate-text-wave-reveal">
                    Admin Login
                </h2>

                <p className="text-gray-300 text-center mb-8 text-lg font-body animate-slide-in-up delay-100">
                    Access your hotel management panel.
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-lg font-medium text-gray-200 mb-2 font-body">Email</label>
                        <input type="text" name="email" value={credentials.email} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-inner focus:shadow-lg focus:animate-input-glow" placeholder="Email" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-200 mb-2 font-body">Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-inner focus:shadow-lg focus:animate-input-glow" placeholder="password" required />
                    </div>

                    <ErrorsDisplay errors={errors} />

                    <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white' }} className="w-full bg-blue-600 text-white py-3 rounded-xl text-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center animate-pulse-button group relative overflow-hidden magic-btn-hover" disabled={isLoading}>
                        {isLoading ? (
                            <svg className="animate-spin h-6 w-6 text-white mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <span className="relative z-10">Login to Dashboard</span>
                        )}
                    </button>
                </form>
                <small>Create new Admin user <Link to='/admin/signup'>Here...</Link> </small>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AdminLogin;
