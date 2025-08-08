import React, { useEffect, useState } from 'react';
import { Home, BedSingle, Utensils, Image, MessageCircle, CalendarDays, Newspaper, LogOut, Menu, X } from 'lucide-react';
import '../../styles/tailwind.css';

// Import ALL management components
import RoomManagement from '../../components/admin/RoomManagement.jsx';
import DiningManagement from '../../components/admin/DiningManagement.jsx'
import ReviewManagement from '../../components/admin/ReviewManagement.jsx'
import BookingManagement from '../../components/admin/BookingManagement.jsx'
import GalleryManagement from '../../components/admin/GalleryManagement.jsx'
import BlogManagement from '../../components/admin/BlogManagement.jsx'
import axiosClient from '../../axiosClient/axiosClient.jsx';
import { useStateContext } from '../../context/ContextProvider.jsx';
import { useNavigate } from 'react-router-dom';
import '../../styles/tailwind.css'

const Dashboard = () => {
    const [currentView, setCurrentView] = useState('overview'); // Default view
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
    const {setUser, setToken, token} = useStateContext();
    const navigate = useNavigate();

    // BOUNCE BACK USERS IF TOKEN IS NOT IN LOCALSTORAGE =========================================================================
    useEffect(()=>{
        if(!token){
            return navigate('/admin/signin');
        }
    }, []);
    // BOUNCE BACK USERS IF TOKEN IS NOT IN LOCALSTORAGE =========================================================================

    const NavItem = ({ icon, text, viewName }) => (
        <button
            style={{ backgroundColor: '#2563eb', color: 'white' }} 
            onClick={() => {
                setCurrentView(viewName);
                setIsSidebarOpen(false); // Close sidebar on item click for mobile
            }}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200
                        ${currentView === viewName ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                        font-body`}
        >
            {icon}
            <span className="ml-3">{text}</span>
        </button>
    );

    function handleLogout(e){
        axiosClient.post('/logout')
        .then((data)=>{
            setUser({});
            setToken(null);
            navigate('/admin/signin');
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div className="w-screen h-screen w-full h-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">
            {/* Mobile Header & Toggle */}
            <header className="bg-gray-800 dark:bg-gray-950 p-4 flex justify-between items-center md:hidden shadow-md">
                <h1 className="text-2xl font-extrabold text-blue-400 font-display">Admin Panel</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </header>

            {/* Sidebar Navigation (Desktop & Mobile Overlay) */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-gray-800 dark:bg-gray-950 text-white p-6 flex flex-col shadow-xl z-40
                           transform transition-transform duration-300 ease-in-out
                           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                           md:relative md:translate-x-0 md:flex`} // Always visible on desktop
            >
                <div className="mb-10 flex-shrink-0">
                    <h1 className="text-3xl font-extrabold text-blue-400 font-display">Admin Panel</h1>
                    <p className="text-xs text-gray-400 mt-1 truncate">Frontend Demo</p>
                </div>
                <nav className="flex-1 space-y-3 overflow-y-auto pb-4">
                    <NavItem icon={<Home size={20} />} text="Overview" viewName="overview" />
                    <NavItem icon={<BedSingle size={20} />} text="Rooms" viewName="rooms" />
                    <NavItem icon={<Utensils size={20} />} text="Dining & Bar" viewName="dining" />
                    <NavItem icon={<Image size={20} />} text="Gallery" viewName="gallery" />
                    <NavItem icon={<MessageCircle size={20} />} text="Guest Reviews" viewName="reviews" />
                    <NavItem icon={<CalendarDays size={20} />} text="Bookings" viewName="bookings" />
                    <NavItem icon={<Newspaper size={20} />} text="Blog" viewName="blog" />
                </nav>
                <div className="mt-auto pt-6 border-t border-gray-700 flex-shrink-0">
                    <button  style={{ backgroundColor: '#2563eb', color: 'white' }}  onClick={handleLogout} className="flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 shadow-md transform hover:scale-105 active:scale-95 font-body">
                        <LogOut size={20} />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-8 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
                {currentView === 'overview' && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl animate-fade-in">
                        <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 mb-4 font-display">Welcome, Administrator!</h2>
                        <p className="text-gray-700 dark:text-gray-300 font-body">
                            Select a section from the sidebar to manage your hotel's data.
                        </p>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Quick Access Cards */}
                            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02] transition-transform duration-200 cursor-pointer" onClick={() => setCurrentView('bookings')}>
                                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Manage Bookings</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">View, approve, or cancel reservations.</p>
                                <button style={{ backgroundColor: '#2563eb', color: 'white' }} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">Go to Bookings</button>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02] transition-transform duration-200 cursor-pointer" onClick={() => setCurrentView('rooms')}>
                                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Manage Rooms</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Update room availability and details.</p>
                                <button style={{ backgroundColor: '#2563eb', color: 'white' }} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">Go to Rooms</button>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02] transition-transform duration-200 cursor-pointer" onClick={() => setCurrentView('dining')}>
                                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Manage Menu</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Update food and drink offerings.</p>
                                <button style={{ backgroundColor: '#2563eb', color: 'white' }} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">Go to Menu</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Conditional Rendering for each management component */}
                {currentView === 'rooms' && <RoomManagement />}
                {currentView === 'dining' && <DiningManagement />}
                {currentView === 'reviews' && <ReviewManagement />}
                {currentView === 'bookings' && <BookingManagement />}
                {currentView === 'gallery' && <GalleryManagement />}
                {currentView === 'blog' && <BlogManagement />}

            </main>
        </div>
    );
};

export default Dashboard;
