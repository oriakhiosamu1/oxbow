import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search, Filter, CalendarDays, User, BedSingle, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import ErrorsDisplay from '../../utlis/ErrorDisplay';

const BookingManagement = () => {
    // Initial dummy data==========================================================================================================================================
    const [bookings, setBookings] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedBookings = localStorage.getItem('adminBookings');
            return savedBookings ? JSON.parse(savedBookings) : [
                { id: 'b1', name: 'John Doe', type: 'Deluxe Room', check_in: '2025-07-10', check_out: '2025-07-15', status: 'Confirmed', requests: 'Extra pillows', branch: 'Swali' },
                { id: 'b2', name: 'Jane Smith', type: 'Luxury Suite', check_in: '2025-07-05', check_out: '2025-07-08', status: 'Checked-Out', requests: '', branch: 'Gbarantoru' },
                { id: 'b3', name: 'Peter Jones', type: 'Standard Room', check_in: '2025-07-20', check_out: '2025-07-22', status: 'Pending', requests: 'Late check-in', branch: 'Swali' },
                { id: 'b4', name: 'Maria Garcia', type: 'Executive Room', check_in: '2025-07-01', check_out: '2025-07-03', status: 'Checked-In', requests: 'Quiet room', branch: 'Gbarantoru' },
            ];
        }
        return [];
    });

    // STATE VARIABLES ===========================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [bookingId, setBookingId] = useState(null);

    // FORM STATES ==============================================================================================================================================
    const [newBooking, setNewBooking] = useState({
        name : '',
        type: '',
        branch: '',
        check_in: '',
        check_out: '',
        request: '',
        email: '',
        status: '',
        room_id: '',
    });


    // HANDLES CONTROLLED INPUT =====================================================================================================================================
    function handleChange(e){
        const {name, value} = e.target;

        setNewBooking((prev) => {
            return {...prev, [name]:value}
        });
    }

    // FETCHES ALL BOOKINGS FROM DATA BASE ==========================================================================================================================
    useEffect(()=>{
        setLoading(true);

        axiosClient.get('/admin/get-bookings')
        .then(({data})=>{
            console.log(data);
            setBookings(data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // FETCHES A SINGLE BOOKING=====================================================================================================================================
    useEffect(()=>{
        axiosClient.get(`/admin/show-booking/${bookingId}`)
        .then((data)=>{
            console.log(data);
            setNewBooking(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [bookingId]);


    // Filter states===============================================================================================================================================
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterBranch, setFilterBranch] = useState('');
    const [filterRoomType, setFilterRoomType] = useState('');


    // Clear form fields==========================================================================================================================================
    const clearForm = () => {
        setNewBooking({
            name : '',
            type: '',
            branch: '',
            check_in: '',
            check_out: '',
            request: '',
            email: '',
            status: '',
            room_id: '',
        })
        // setCurrentBooking(null);
        setBookingId(null);
    };

    // Handle Add/Edit form submission================================================================================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // UPDATES A PARTICULAR POST =====================================================================================================================
        if(bookingId !== null && bookingId !== undefined && bookingId !== ''){

            console.log(bookingId)
            axiosClient.put(`/admin/booking/update/${bookingId}`, newBooking)
            .then(({data})=>{
                console.log(data);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
                clearForm();
                setIsAdding(false);
                setIsEditing(false);

                const response = error.response;

                if(response && response.status === 422){
                    if(response.data.errors){
                        setError(response.data.errors);
                    }else{
                        setError({
                            email: [response.data.message]
                        })
                    }
                }else{
                    setError({
                        email: [response.data.message]
                    })
                }
            })
        }else{
            // CREATES A NEW POST ===========================================================================================================================
            axiosClient.post('/admin/create-booking', newBooking)
            .then(({data})=>{
                console.log(data);
                clearForm();
                setLoading(false);
                setIsAdding(false);
                setIsEditing(false);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
                clearForm();
                setIsAdding(false);
                setIsEditing(false);

                const response = error.response;

                if(response && response.status === 422){
                    if(response.data.errors){
                        setError(response.data.errors);
                    }else{
                        setError({
                            email: [response.data.message]
                        })
                    }
                }else{
                    setError({
                        email: [response.data.message]
                    })
                }
            })
        }
    };

    // Start editing a booking======================================================================================================================================
    const handleEditClick = (booking) => {
        setBookingId(booking.id);
        // setCurrentBooking(id)
        setIsEditing(true);
        setIsAdding(true); // Show the form for editing
    };

    // Delete a booking============================================================================================================================================
    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            axiosClient.delete(`/admin/delete-booking/${id}`)
            .then((data)=>{
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    };



    // Filtered and searched bookings for display===============================================================================================================
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = searchTerm === '' ||
            booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.request.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === '' || booking.status === filterStatus;
        const matchesBranch = filterBranch === '' || booking.branch === filterBranch;
        const matchesRoomType = filterRoomType === '' || booking.type === filterRoomType;

        return matchesSearch && matchesStatus && matchesBranch && matchesRoomType;
    });

    // Extract unique room types and branches for filters===============================================================================================================
    const uniqueRoomTypes = [...new Set(bookings.map(b => b.type))];
    const uniqueBranches = [...new Set(bookings.map(b => b.branch))];


    // RETURN FUNCTION =================================================================================================================================================
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 font-display">Bookings Management</h2>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(false); clearForm(); }}
                    className="btn-primary px-6 py-3 flex items-center text-lg group relative overflow-hidden magic-btn-hover"
                >
                    <PlusCircle size={20} className="mr-2" /> Add New Booking
                </button>
            </div>

            <ErrorsDisplay errors={error} />

            {(isAdding || isEditing) && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 animate-slide-down">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-display">
                        {isEditing ? 'Edit Booking Details' : 'Add New Booking'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Guest Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newBooking.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Guest Email</label>
                            <input
                                type="email"
                                name="email"
                                value={newBooking.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Johndoe@gmail.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="branch" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Branch</label>
                            <select
                                name="branch"
                                value={newBooking.branch}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Branch</option>
                                <option value="Swali">Swali</option>
                                <option value="Gbarantoru">Gbarantoru</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Room Type</label>
                            <input
                                type="text"
                                name="type"
                                value={newBooking.type}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Deluxe Room"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Status</label>
                            <select
                                name="status"
                                value={newBooking.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Checked-In">Checked-In</option>
                                <option value="Checked-Out">Checked-Out</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="checkIn" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Check-in Date</label>
                            <input
                                type="datetime-local"
                                name="check_in"
                                value={newBooking.check_in}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="check_out" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Check-out Date</label>
                            <input
                                type="datetime-local"
                                name="check_out"
                                value={newBooking.check_out}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="request" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Special Requests</label>
                            <textarea
                                name="request"
                                value={newBooking.request}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y"
                                placeholder="e.g., Non-smoking room, early check-in"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                            <button
                                type="button"
                                onClick={() => { setIsAdding(false); setIsEditing(false); clearForm(); }}
                                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-md font-semibold transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary px-8 py-3 group relative overflow-hidden magic-btn-hover"
                            >
                                <span className="relative z-10">{isEditing ? 'Update Booking' : 'Add Booking'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters and Search */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label htmlFor="search" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search by guest, room, or request..."
                        />
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="min-w-[150px]">
                    <label htmlFor="filterStatus" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Status</label>
                    <select
                        id="filterStatus"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Checked-In">Checked-In</option>
                        <option value="Checked-Out">Checked-Out</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="min-w-[150px]">
                    <label htmlFor="filterBranch" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Branch</label>
                    <select
                        id="filterBranch"
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Branches</option>
                        {uniqueBranches.map(branchName => (
                            <option key={branchName} value={branchName}>{branchName}</option>
                        ))}
                    </select>
                </div>

                <div className="min-w-[150px]">
                    <label htmlFor="filterRoomType" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Room Type</label>
                    <select
                        id="filterRoomType"
                        value={filterRoomType}
                        onChange={(e) => setFilterRoomType(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Room Types</option>
                        {uniqueRoomTypes.map(roomTypeName => (
                            <option key={roomTypeName} value={roomTypeName}>{roomTypeName}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin mr-2" /> Loading bookings...
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                    No bookings found matching your criteria.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead className="bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Guest Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Room Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Branch</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check-in</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check-out</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Requests</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Number of Days</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount Paid</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{booking.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{booking.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{booking.branch}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{booking.check_in}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{booking.check_out}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                              booking.status === 'Checked-In' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                                              booking.status === 'Checked-Out' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100' :
                                              'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{booking.request || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{booking.number_of_days || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{booking.amount_paid || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(booking)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3 transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(booking.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-200"
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
