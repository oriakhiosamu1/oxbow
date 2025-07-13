// src/admin/DiningManagement.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Utensils, DollarSign, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import ErrorsDisplay from '../../utlis/ErrorDisplay';

const DiningManagement = () => {
    // Initial dummy data for frontend-only, loaded from local storage========================================================================================================================
    const [menuItems, setMenuItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMenu = localStorage.getItem('adminMenu');
            return savedMenu ? JSON.parse(savedMenu) : [
                // Default Food Items
                { id: 'f1', branch: 'Swali', category: 'food', subCategory: 'protein', name: 'Turkey', price: 8000 },
                { id: 'f2', branch: 'Swali', category: 'food', subCategory: 'rice-noodles', name: 'Jollof Rice', price: 3500 },
                { id: 'f3', branch: 'Gbarantoru', category: 'food', subCategory: 'national-dishes', name: 'Isi Ewu', price: 12000 },
                // Default Drink Items
                { id: 'd1', branch: 'Swali', category: 'drinks', subCategory: 'soft-drinks', name: 'Coke', price: 1000 },
                { id: 'd2', branch: 'Swali', category: 'drinks', subCategory: 'beers', name: 'Star', price: 1500 },
                { id: 'd3', branch: 'Gbarantoru', category: 'drinks', subCategory: 'wines', name: '4th Street', price: 15000 },
            ];
        }
        return [];
    });

    // STATE VARIABLES ========================================================================================================================
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState(null);

    // FORM FIELDS ========================================================================================================================
    const [menu, setMenu] = useState({
        branch: '',
        category: '',
        subCategory: '',
        name: '',
        price: '',
    });


    // HANDLES CONTROLLED INPUT ========================================================================================================================
    function handleChange(e){
        const {name, value} = e.target;
        setMenu((prev)=>{
            return {...prev, [name]:value}
        });
    }

    // Clear form fields========================================================================================================================
    const clearForm = () => {
        setMenu({
            branch: '',
            category: '',
            subCategory: '',
            name: '',
            price: '',
        });
        setCurrentMenuItem(null);
    };

    // Sub-category options based on main category========================================================================================================================
    const getSubCategoryOptions = (mainCategory) => {
        if (mainCategory === 'food') {
            return [
                { value: 'protein', label: 'Protein' },
                { value: 'swallow', label: 'Swallow' },
                { value: 'soup', label: 'Soup' },
                { value: 'soup-swallow-protein', label: 'Soup, Swallow & Protein' },
                { value: 'rice-noodles', label: 'Rice & Noodles' },
                { value: 'breakfast', label: 'Breakfast' },
                { value: 'national-dishes', label: 'National Dishes' },
                { value: 'special-dishes', label: 'Special Dishes' },
            ];
        } else if (mainCategory === 'drinks') {
            return [
                { value: 'soft-drinks', label: 'Soft Drinks' },
                { value: 'beers', label: 'Beers' },
                { value: 'energy-drinks', label: 'Energy Drinks' },
                { value: 'gin-vodka-rum-tequila', label: 'Gin/Vodka/Rum/Tequila' },
                { value: 'cream', label: 'Cream' },
                { value: 'bitters', label: 'Bitters' },
                { value: 'wines', label: 'Wines' },
                { value: 'whiskey-liquor', label: 'Whiskey/Liquor' },
            ];
        }
        return [];
    };

    // Handle Add/Edit form submission========================================================================================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(currentMenuItem !== null){
            // UPDATES A PARTICULAR POST ========================================================================================================================
            axiosClient.put(`/admin/menu/update/${currentMenuItem}`, menu)
            .then((data)=>{
                console.log(data);
                clearForm();
                setLoading(false);
                setIsAdding(false);
                setIsEditing(false);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
                clearForm();
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
            // CREATES A NEW MENU ITEM========================================================================================================================
            axiosClient.post('/admin/menu/store', menu)
            .then((data)=>{
                console.log(data);
                clearForm();
                setLoading(false);
                setIsAdding(false);
                setIsEditing(false);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
                clearForm();
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

    // FETCH ALL MENU ITEM FROM DATABASE========================================================================================================================
    useEffect(()=>{
        setLoading(true);

        axiosClient.get('/admin/menu/index')
        .then(({data})=>{
            console.log(data);
            setMenuItems(data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    }, []);

    // FETCHES A PARTICULAR MENU ITEM ========================================================================================================================
    useEffect(()=>{
        axiosClient.get(`/admin/menu/show/${currentMenuItem}`)
        .then((data)=>{
            console.log(data);
            setMenu(data.data);
        })
        .catch((error)=>{
            console.log(error);
            setCurrentMenuItem(null)
        })
    }, [currentMenuItem])

    // Start editing a menu item========================================================================================================================
    const handleEditClick = (id) => {
        setCurrentMenuItem(id);
        setIsEditing(true);
        setIsAdding(true);
    };
    console.log(currentMenuItem);

    // Delete a menu item========================================================================================================================
    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            axiosClient.delete(`/admin/menu/delete/${id}`)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    };

    // Filtered items for display========================================================================================================================
    const filteredItems = menuItems.filter(item =>
        (menu.branch === '' || item.branch === menu.branch) &&
        (menu.category === '' || item.category === menu.category) &&
        (menu.subCategory === '' || item.subCategory === menu.subCategory)
    );

    // RETURN FUNCTION ========================================================================================================================
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 font-display">Dining & Bar Management</h2>
                <button onClick={() => { setIsAdding(true); setIsEditing(false); clearForm(); }} className="btn-primary px-6 py-3 flex items-center text-lg group relative overflow-hidden magic-btn-hover">
                    <PlusCircle size={20} className="mr-2" /> Add New Item
                </button>
            </div>

            <ErrorsDisplay errors={error} />

            {(isAdding || isEditing) && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 animate-slide-down">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 font-display">
                        {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="branch" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Branch</label>
                            <select name="branch" value={menu.branch} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">Select Branch</option>
                                <option value="Swali">Swali</option>
                                <option value="Gbarantoru">Gbarantoru</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category</label>
                            <select name="category" value={menu.category} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">Select Category</option>
                                <option value="food">Food</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subCategory" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Sub-Category</label>
                            <select name="subCategory" value={menu.subCategory}  onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" required disabled={!menu.category} >
                                <option value="">Select Sub-Category</option>
                                    {getSubCategoryOptions(menu.category).map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Item Name</label>
                            <input type="text" name="name" value={menu.name} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Spicy Jollof Rice" required />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Price (₦)</label>
                            <input type="number" name="price" value={menu.price} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 2500" required min="0" />
                        </div>
                        <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                            <button type="button" onClick={() => { setIsAdding(false); setIsEditing(false); clearForm(); }} className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-md font-semibold transition-colors duration-300" >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary px-8 py-3 group relative overflow-hidden magic-btn-hover" >
                                <span className="relative z-10">{isEditing ? 'Update Item' : 'Add Item'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600 flex flex-wrap gap-4">
                <select name='branch' value={menu.branch} onChange={handleChange} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100" >
                    <option value="">All Branches</option>
                    <option value="Swali">Swali</option>
                    <option value="Gbarantoru">Gbarantoru</option>
                </select>
                <select name='category' value={menu.category} onChange={handleChange} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100" >
                    <option value="">All Categories</option>
                    <option value="food">Food</option>
                    <option value="drinks">Drinks</option>
                </select>
                <select name='subCategory' value={menu.subCategory} onChange={handleChange} className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100" disabled={!menu.category} >
                    <option value="">All Sub-Categories</option>
                    {getSubCategoryOptions(menu.category).map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin mr-2" /> Loading menu items...
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-10 text-gray-600 dark:text-gray-400">
                    No menu items found for the current filters.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead className="bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Branch</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sub-Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price (₦)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{item.branch}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 capitalize">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 capitalize">{item.subCategory.replace(/-/g, ' ')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs overflow-hidden text-ellipsis">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">₦{item.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEditClick(item.id)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 mr-3 transition-colors duration-200" title="Edit" >
                                            <Edit size={20} />
                                        </button>
                                        <button onClick={() => handleDeleteClick(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 transition-colors duration-200" title="Delete" >
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

export default DiningManagement;
