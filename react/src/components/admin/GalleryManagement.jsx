import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Image, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import ErrorsDisplay from '../../utlis/ErrorDisplay';
import {toast, ToastContainer} from 'react-toastify';

const GalleryManagement = () => {
    // Initial dummy data ================================================================================================================================
    const [images, setImages] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedImages = localStorage.getItem('adminGalleryImages');
            return savedImages ? JSON.parse(savedImages) : [
                { id: 'img1', url: 'https://placehold.co/400x300/FFCC80/2D3748?text=Hotel+Lobby', alt: 'Hotel Lobby', image:null },
                { id: 'img2', url: 'https://placehold.co/400x300/AED6F1/2D3748?text=Swimming+Pool', alt: 'Swimming Pool', image:null },
                { id: 'img3', url: 'https://placehold.co/400x300/D7BDE2/2D3748?text=Restaurant', alt: 'Hotel Restaurant', image:null },
                { id: 'img4', url: 'https://placehold.co/400x300/A2D9CE/2D3748?text=Deluxe+Room', alt: 'Deluxe Room Interior', image:null },
            ];
        }
        return [];
    });

    // STATE VARIABLES =====================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // GALLERY MANAGEMENT FORM DATA========================================================================================================================
    const [form, setForm] = useState({
        url: '',
        alt: '',
        image: null,
        branch: ''
    });

    // FUNCTION THAT HANDLES FORM INPUTS========================================================================================================================
    function handleChange(e){
        const {name, value, files } = e.target;
        setForm(prev => ({
            ...prev, [name] : files ? files[0] : value
        }));
    }

    // FETCHES ALL GALLERY IMAGES ========================================================================================================================
    useEffect(()=>{
        setLoading(true);

        axiosClient.get('/admin/gallery/index')
        .then(({data})=>{
            console.log(data);
            setImages(data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    }, [])

    // Persistence to local storage========================================================================================================================
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('adminGalleryImages', JSON.stringify(images));
        }
    }, [images]);

    // Clear form fields========================================================================================================================
    const clearForm = () => {
        setForm({
            url:"",
            alt:"",
        });
    };

    // Handle Add Image form submission========================================================================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        axiosClient.post('/admin/gallery/store', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((data) => {
            console.log(data);
            window.location.reload();
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);

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
    };

    // Delete an image========================================================================================================================
    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            axiosClient.delete(`/admin/gallery/delete/${id}`)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
            })
        }
    };

    // RETURN FUNCTION ========================================================================================================================

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 font-display">Gallery Management</h2>
                <button
                    onClick={() => { setIsAdding(true); clearForm(); }}
                    className="btn-primary px-6 py-3 flex items-center text-lg group relative overflow-hidden magic-btn-hover"
                >
                    <PlusCircle size={20} className="mr-2" /> Add New Image
                </button>
            </div>

            <ErrorsDisplay errors={error} />

            {isAdding && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 animate-slide-down">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-display">Add New Gallery Image</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="branch" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Branch</label>
                            <select
                                name="branch"
                                value={form.branch}
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
                            <label htmlFor="url" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL</label>
                            <input
                                type="url"
                                name="url"
                                value={form.url}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/new-image.jpg"
                            />
                        </div>

                        <div>
                            <label htmlFor="alt" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Alt Text (Optional)</label>
                            <input
                                type="text"
                                name="alt"
                                value={form.alt}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Beautiful hotel view"
                            />
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                type="button"
                                onClick={() => { setIsAdding(false); clearForm(); }}
                                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-md font-semibold transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary px-8 py-3 group relative overflow-hidden magic-btn-hover"
                            >
                                <span className="relative z-10">Add Image</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin mr-2" /> Loading images...
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                    No images in the gallery. Click "Add New Image" to get started!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="relative bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden group">
                            
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=Image+Error'; }} // Fallback for broken images
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => handleDeleteClick(image.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
                                    title="Delete Image"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                            <p className="p-3 text-sm text-gray-700 dark:text-gray-300 truncate">{image.alt}</p>
                        </div>
                    ))}
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default GalleryManagement;
