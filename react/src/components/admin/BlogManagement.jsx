import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Newspaper, Calendar, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import ErrorsDisplay from '../../utlis/ErrorDisplay';

const BlogManagement = () => {
    // Initial dummy data===================================================================================================================================
    const [blogPosts, setBlogPosts] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedPosts = localStorage.getItem('adminBlogPosts');
            return savedPosts ? JSON.parse(savedPosts) : [
                { id: 'bp1', title: 'Top 5 Reasons to Stay at Oxbow Lake Hotel', date: '2025-06-20', excerpt: 'Discover why our guests keep coming back for more...', content: 'Full content of the first blog post goes here...', imageUrl: '' },
                { id: 'bp2', title: 'A Culinary Journey at Our Restaurants', date: '2025-06-15', excerpt: 'Explore the diverse flavors and exquisite dishes...', content: 'Full content of the second blog post goes here...', imageUrl: '' },
            ];
        }
        return [];
    });

    // ATTITUDE STATE VARIABLE ===============================================================================================================================
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    // FORM STATES ================================================================================================================================================
    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        date: '',
        imageUrl: ''
    });

    // Start editing a post===========================================================================================================================================
    const handleEditClick = (post) => {
        setCurrentPost(post.id);
        setIsEditing(true);
        setIsAdding(true); // Show the form for editing
    };


    // HANDLES CONTROLLED INPUT ===========================================================================================================================================
    function handleChange(e){
        const {name, value, files} = e.target;

        setForm((prev)=>{
            return {...prev, [name]:value}
        });
    }

    // CLEARS FORM ===========================================================================================================================================
    function clearForm(){
        setCurrentPost(null);
    }

    // USING FORM DATA INSTEAD ===============================================================================================================================
    // const formData = new FormData();
    // formData.append("title", )

    // Handle Add/Edit form submission===========================================================================================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // UPDATES A PARTICULAR POST ======================================================================================================================
        if(currentPost !==null && currentPost !== undefined && currentPost !== ''){

            axiosClient.put(`/admin/blog/update/${currentPost}`, form)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error)=>{
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
            // CREATES A NEW POST ============================================================================================================================
            axiosClient.post('/admin/blogs/store', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
                setIsEditing(false);
                setIsAdding(false);

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


    // FETCHES A PARTICULAR BLOW POST ===========================================================================================================================================
    useEffect(()=>{
        setLoading(true);
        
        axiosClient.get(`/admin/show/${currentPost}`)
        .then(({data})=>{
            console.log(data);
            setForm(data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setCurrentPost(null);
            // setIsEditing(false);
            // setIsAdding(false);
            setLoading(false);
        })
    }, [currentPost]);


    // FETCHES ALL AVAILABLE BLOG POST===========================================================================================================================================
    useEffect(()=>{
        axiosClient.get('/admin/blogs')
        .then(({data})=>{
            console.log(data);
            setBlogPosts(data);
        })
        .catch((error)=>{
            console.log(error);
            setCurrentPost(null);
        })
    }, []);


    // Delete a post===========================================================================================================================================
    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            setError('');
            setMessage('');
            setLoading(true);
            setCurrentPost(id);

            console.log(id);
            axiosClient.delete(`/admin/blog/${id}`)
            .then((data)=>{
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
        }
    };

    // RETURN FUNCTION ===========================================================================================================================================

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 font-display">Blog Management</h2>
                <button
                    onClick={() => { setIsAdding(true); setIsEditing(false); clearForm(); }}
                    className="btn-primary px-6 py-3 flex items-center text-lg group relative overflow-hidden magic-btn-hover"
                >
                    <PlusCircle size={20} className="mr-2" /> Create New Post
                </button>
            </div>

            <ErrorsDisplay errors={error} />

            {(isAdding || isEditing) && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 animate-slide-down">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-display">
                        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Our New Eco-Friendly Initiatives"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Publish Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="excerpt" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Excerpt (Short Summary)</label>
                            <textarea
                                name="excerpt"
                                value={form.excerpt}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y"
                                placeholder="A brief summary of the blog post..."
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Full Content</label>
                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y"
                                placeholder="Write the full blog post content here..."
                                rows="8"
                                required
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="imageUrl" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Image URL (Optional)</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., https://example.com/blog-image.jpg"
                            />
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
                                <span className="relative z-10">{isEditing ? 'Update Post' : 'Create Post'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin mr-2" /> Loading blog posts...
                </div>
            ) : blogPosts.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                    No blog posts found. Click "Create New Post" to get started!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead className="bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Excerpt</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {blogPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{post.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{post.excerpt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {post.imageUrl ? (
                                            <img src={post.imageUrl} alt={post.title} className="h-12 w-12 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src=''; }} />
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEditClick(post)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3 transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(post.id)}
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

export default BlogManagement;
