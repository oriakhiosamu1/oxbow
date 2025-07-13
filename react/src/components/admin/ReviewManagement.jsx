// src/admin/ReviewManagement.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Star, User, MessageCircle, Calendar, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import ErrorsDisplay from '../../utlis/ErrorDisplay';

const ReviewManagement = () => {
    // Initial dummy data for frontend-only, loaded from local storage==============================================================================================
    const [reviews, setReviews] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedReviews = localStorage.getItem('adminReviews');
            return savedReviews ? JSON.parse(savedReviews) : [
                { id: 'r1', guestName: 'Alice Johnson', rating: 5, comment: 'Absolutely wonderful stay! The staff were incredibly attentive.', date: '2025-06-25' },
                { id: 'r2', guestName: 'Bob Williams', rating: 4, comment: 'Good experience overall, but the Wi-Fi was a bit slow at times.', date: '2025-06-20' },
                { id: 'r3', guestName: 'Carol Davis', rating: 5, comment: 'Luxurious rooms and delicious dining. Highly recommend!', date: '2025-06-18' },
            ];
        }
        return [];
    });

    // STATE VARIABLES ==========================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    // Form states=================================================================================================================================================
    const [reviewFormField, setReviewsFormField] = useState({
        guestName: '',
        rating: '',
        comment: '',
        date: ''
    });

    // HANDLES CONTROLLED INPUT =================================================================================================================================
    function handleChange(e){
        const {name, value} = e.target;

        setReviewsFormField((prev)=>{
            return {...prev, [name]:value}
        });
    }

    // FETCHES ALL REVIEWS FROM DATABASE===========================================================================================================================
    useEffect(()=>{
        setLoading(true);

        axiosClient.get('/admin/reviews/index')
        .then(({data})=>{
            console.log(data);
            setReviews(data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    }, []);


    // FETCHES A PARTICULAR REVIEW ================================================================================================================================
    useEffect(()=>{
        axiosClient.get(`/admin/reviews/show/${currentReview}`)
        .then(({data})=>{
            console.log(data);
            setReviewsFormField(data);
        })
        .catch((error)=>{
            console.log(error);
            setCurrentReview(null);
            setLoading(false);
        })
    }, [currentReview])


    // Persistence to local storage===========================================================================================================================
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('adminReviews', JSON.stringify(reviews));
        }
    }, [reviews]);

    // Clear form fields==================================================================================================================================
    const clearForm = () => {
        setReviewsFormField({
            guestName: '',
            rating: '',
            comment: '',
            date: ''
        });
        setCurrentReview(null);
    };

    // Handle Add/Edit form submission==========================================================================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        if(currentReview !== null && currentReview !== undefined && currentReview !== ''){
            // UPDATES A PARTICULAR REVIEW ====================================================================================================================
            axiosClient.put(`/admin/reviews/update/${currentReview}`, reviewFormField)
            .then(({data})=>{
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
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
            // CREATES A NEW REVIEW ==========================================================================================================================
            axiosClient.post('/admin/reviews/store', reviewFormField)
            .then(({data})=>{
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
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

    // Start editing a review====================================================================================================================================
    const handleEditClick = (review) => {
        setCurrentReview(review.id);
        console.log(review);
        setIsEditing(true);
        setIsAdding(true); // Show the form for editing
    };

    // Delete a review======================================================================================================================================
    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            axiosClient.delete(`/admin/reviews/destroy/${id}`)
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

    // RETURN FUNCTION ===========================================================================================================================================

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 font-display">Guest Review Management</h2>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(false); clearForm(); }}
                    className="btn-primary px-6 py-3 flex items-center text-lg group relative overflow-hidden magic-btn-hover"
                >
                    <PlusCircle size={20} className="mr-2" /> Add New Review
                </button>
            </div>

            <ErrorsDisplay errors={error} />

            {(isAdding || isEditing) && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 animate-slide-down">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-display">
                        {isEditing ? 'Edit Guest Review' : 'Add New Guest Review'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="guestName" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Guest Name</label>
                            <input
                                type="text"
                                name="guestName"
                                value={reviewFormField.guestName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Jane Doe"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Review Date</label>
                            <input
                                type="date"
                                name="date"
                                value={reviewFormField.date}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* <div className="md:col-span-2">
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Rating</label>
                            <div className="flex space-x-1 justify-center md:justify-start">
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <Star
                                        key={starValue}
                                        size={32}
                                        className={`cursor-pointer transition-colors duration-200 ${starValue <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'} hover:scale-110 transform`}
                                        // onClick={() => setRating(starValue)}
                                        onClick={() => setRating(starValue)}
                                    />
                                ))}
                            </div>
                        </div> */}

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Rating</label>
                            <div className="flex space-x-1 justify-center md:justify-start">
                                <select name="rating" value={reviewFormField.rating} onChange={handleChange} className='w-full border p-2 rounded' id="">
                                    {[5,4,3,2,1].map(num => (
                                        <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="comment" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Comment</label>
                            <textarea
                                name="comment"
                                value={reviewFormField.comment}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y"
                                placeholder="Enter guest's review comment..."
                                rows="4"
                                required
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
                                <span className="relative z-10">{isEditing ? 'Update Review' : 'Add Review'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin mr-2" /> Loading reviews...
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                    No reviews found. Click "Add New Review" to get started!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead className="bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Guest Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Comment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {reviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{review.guestName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{review.comment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{review.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(review)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3 transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(review.id)}
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

export default ReviewManagement;
