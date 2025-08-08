// src/admin/RoomManagement.jsx
import React, { useState, useEffect } from 'react';
// No Firebase imports for frontend-only version
import { PlusCircle, Edit, Trash2, Hotel, DollarSign, BedSingle, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import ErrorsDisplay from '../../utlis/ErrorDisplay';

const RoomManagement = () => {
    // STATE VARIABLES ===================================================================================================
    const [savedRooms, setSavedRooms] = useState(null);
    const [roomId, setRoomId] = useState(null);

    // FETCHES DATA WHEN EDIT BUTTON IS CLICKED=============================================================================
    function handleEditClick (id){
        setIsEditing(true);
        setIsAdding(true);
        setRoomId(id);
    }

    // FETCHES A PARTICULAR ROOM============================================================================================
    useEffect(()=>{
        axiosClient.get(`/admin/rooms/${roomId}`)
        .then((data)=>{
            setIsEditing(false);
            console.log(data);
            setAddNewRoom(data.data);
        })
        .catch((error) => {
            console.log(error);
            setIsEditing(false);
            setRoomId(null);
        })
    }, [roomId]);

    // FETCHES ALL ROOMS IN DATABASE=================================================================================================
    useEffect(()=>{
        setLoading(true);

        axiosClient.get('/admin/get-all-rooms')
        .then(({data})=>{
            console.log(data);
            setSavedRooms(data);
            setRooms(data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);

    // Initial dummy data for frontend-only =================================================================================================================
    const [rooms, setRooms] = useState(() => {
        return savedRooms ? JSON.parse(savedRooms) : [
            { id: '1', branch: 'Swali', type: 'Deluxe Room', price: 40000, available: 5, description: 'A cozy sanctuary with modern amenities.', image: 'https://placehold.co/100x100/FFCC80/2D3748?text=Deluxe', features: ['King-size bed', 'City view'] },
            { id: '2', branch: 'Gbarantoru', type: 'Luxury Suite', price: 80000, available: 2, description: 'Spacious elegance for discerning travelers.', image: 'https://placehold.co/100x100/AED6F1/2D3748?text=Luxury', features: ['Separate living area', 'Jacuzzi'] },
        ];
    });

    const [loading, setLoading] = useState(false); // No actual loading for frontend demo
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // FORM FIELD FOR ADDING NEW ROOM==========================================================================================================================
    const [addNewRoom, setAddNewRoom] = useState({
        branch: '',
        type: '',
        price: '',
        available: '',
        description: ''
    });

    // HANDLES CONTROLLED INPUT ===========================================================================================================================
    function handleChange(e){
        const {name, value} = e.target;
        setAddNewRoom((prev)=>{
            return {...prev, [name]:value}
        });
    }

    // Clear form fields====================================================================================================================================
    const clearForm = () => {
        setAddNewRoom({
            branch: '',
            type: '',
            price: '',
            available: '',
            description: '',
            imageUrl: '',
            imageUrl1: '',
            imageUrl2: '',
            imageUrl3: '',
            imageUrl4: '',
            features: '',
        });
    };

    // Handle Add/Edit form submission=========================================================================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAdding(true);

        if(roomId){
            // UPDATES A PARTICULAR ROOM BY ID==========================================================================================
            axiosClient.put(`/admin/rooms/${roomId}`, addNewRoom)
            .then((data)=>{
                setIsAdding(false);
                console.log(data)
                clearForm();
                window.location.reload();
                setRoomId(null);
            })
            .catch((error)=>{
                setIsAdding(false);
                console.log(error)
                clearForm();
                setRoomId(null);

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
            });
        }else{
            // CREATES A NEW ROOM ==================================================================================================================
            axiosClient.post('/admin/rooms', addNewRoom)
            .then((data)=>{
                setIsAdding(false);
                console.log(data)
                clearForm();
                window.location.reload();
            })
            .catch((error)=>{
                setIsAdding(false);
                console.log(error);
                clearForm();

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
            });
        }
    };



    // Delete a room===========================================================================================================================================
    const handleDeleteClick = async (id) => {
        const prompt = window.confirm('Do you want to delete room?');
        if(prompt){
            axiosClient.delete(`/admin/rooms/${id}`)
            .then((data)=>{
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    };

    // RETURN FUNCTION ==========================================================================================================================================

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 font-display">Room Management</h2>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(false); clearForm(); }}
                    className="btn-primary px-6 py-3 flex items-center text-lg group relative overflow-hidden magic-btn-hover"
                >
                    <PlusCircle size={20} className="mr-2" /> Add New Room
                </button>
            </div>

            <ErrorsDisplay errors={error} />

            {(isAdding || isEditing) && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 animate-slide-down">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-display">
                        {isEditing ? 'Edit Room Details' : 'Add New Room Type'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="branch" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Branch</label>
                            <select name="branch" value={addNewRoom.branch} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">Select Branch</option>
                                <option value="Swali">Swali</option>
                                <option value="Gbarantoru">Gbarantoru</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Room Type Name</label>
                            <input type="text" name="type" value={addNewRoom.type} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Deluxe Room, Luxury Suite" required/>
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={addNewRoom.imageUrl}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/blog-image.jpg"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl1" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL (Optional)</label>
                            <input
                                type="url"
                                name="imageUrl1"
                                value={addNewRoom.imageUrl1}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/blog-image.jpg"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl2" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL (Optional)</label>
                            <input
                                type="url"
                                name="imageUrl2"
                                value={addNewRoom.imageUrl2}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/blog-image.jpg"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl3" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL (Optional)</label>
                            <input
                                type="url"
                                name="imageUrl3"
                                value={addNewRoom.imageUrl3}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/blog-image.jpg"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl4" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL (Optional)</label>
                            <input
                                type="url"
                                name="imageUrl4"
                                value={addNewRoom.imageUrl4}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/blog-image.jpg"
                            />
                        </div>


                        <div>
                            <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Price (₦)</label>
                            <input type="number" name="price" value={addNewRoom.price} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 40000" required min="0" />
                        </div>
                        <div>
                            <label htmlFor="available" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Total Rooms Available</label>
                            <input type="number" name="available" value={addNewRoom.available} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 10" required min="0" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
                            <textarea name="description" value={addNewRoom.description} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y" placeholder="A brief description of the room type..." rows="3" required ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="features" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Features (Optional)</label>
                            <textarea name="features" value={addNewRoom.features} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y" placeholder="A brief description of the room type..." rows="3" ></textarea>
                        </div>

                        <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setIsEditing(false); clearForm(); }} className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-md font-semibold transition-colors duration-300" >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary px-8 py-3 group relative overflow-hidden magic-btn-hover">
                                <span className="relative z-10">{isEditing ? 'Update Room' : 'Add Room'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin mr-2" /> Loading rooms...
                </div>
            ) : rooms.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                    No rooms found. Click "Add New Room" to get started!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead className="bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Branch</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Room Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price (₦)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Available</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {rooms.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{room.branch}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">

                                        {room.imageUrl ? (
                                            <img src={room.imageUrl} alt={room.type} className="h-12 w-12 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src=''; }} />
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400">N/A</span>
                                        )}
                                        
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{room.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">₦{room.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{room.available}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{room.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(room.id)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3 transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(room.id)}
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

export default RoomManagement;
