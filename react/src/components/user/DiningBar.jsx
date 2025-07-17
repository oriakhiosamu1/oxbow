    // src/components/DiningBar.jsx
    import React, { useState, useEffect, useRef } from 'react';
    import { Utensils, Coffee, X, Hotel, Star, ChevronRight } from 'lucide-react';
    import axiosClient from '../../axiosClient/axiosClient';
    import {toast, ToastContainer} from 'react-toastify';

    // const diningMenuData = {
    //     food: {
    //         Swali: {
    //             'Protein': [
    //                 { name: 'Turkey', price: 8500 },
    //                 { name: 'Scale Fish', price: 8000 },
    //                 { name: 'Chicken', price: 6500 },
    //                 { name: 'Goat Meat', price: 6000 },
    //                 { name: 'Beef', price: 6000 },
    //                 { name: 'Gizzard', price: 5000 },
    //                 { name: 'Snail', price: 6000 },
    //                 { name: 'Catfish', price: 5000 },
    //             ],
    //             'Swallow': [
    //                 { name: 'Wheat', price: 2000 },
    //                 { name: 'Semo', price: 2000 },
    //                 { name: 'Poundo', price: 2000 },
    //                 { name: 'Garri', price: 1000 },
    //             ],
    //             'Soup': [
    //                 { name: 'Vegetable', price: 3000 },
    //                 { name: 'Afang', price: 3000 },
    //                 { name: 'Egusi', price: 2500 },
    //                 { name: 'Ogbono', price: 2500 },
    //                 { name: 'Okra', price: 2500 },
    //                 { name: 'Banga', price: 2500 },
    //                 { name: 'Native', price: 2500 },
    //             ],
    //             'Soup, Swallow & Protein': [
    //                 { name: 'Fisherman Soup', price: 20000 },
    //             ],
    //             'Rice & Noodles': [
    //                 { name: 'Fried Rice', price: 3500 },
    //                 { name: 'Jollof Rice', price: 3500 },
    //                 { name: 'Coconut Rice', price: 4000 },
    //                 { name: 'White Rice', price: 2500 },
    //                 { name: 'Noodles & Egg', price: 5000 },
    //                 { name: 'Jollof Pasta', price: 4000 },
    //             ],
    //             'Breakfast': [
    //                 { name: 'English Breakfast', price: 10000 },
    //                 { name: 'Bread, Omellet & Tea', price: 5500 },
    //                 { name: 'Bread, Oat & Omellet', price: 5500 },
    //                 { name: 'Sardine Omellet', price: 3500 },
    //                 { name: 'Scrambled Egg', price: 2500 },
    //                 { name: 'Omellet', price: 2000 },
    //                 { name: 'Egg Sauce', price: 4000 },
    //             ],
    //             'National Dishes': [
    //                 { name: 'Yam/Plantain Porridge', price: 5000 },
    //                 { name: 'Goat Meat Pepper Soup', price: 7000 },
    //                 { name: 'Isi Ewu', price: 12000 },
    //                 { name: 'Yam Pepper Soup', price: 4000 },
    //                 { name: 'Turkey Pepper Soup', price: 9000 },
    //                 { name: 'Chicken Pepper Soup', price: 7000 },
    //                 { name: 'Scale Fish Pepper Soup', price: 9000 },
    //                 { name: 'Catfish Pepper Soup', price: 6000 },
    //                 { name: 'Full Catfish Pepper Soup', price: 15000 },
    //                 { name: 'Fried Plantain/Yam', price: 2000 },
    //             ],
    //             'Special Dishes': [
    //                 { name: 'Chinese Fried Rice', price: 6000 },
    //                 { name: 'Special Fried Rice', price: 5000 },
    //             ],
    //         },
    //         Gbarantoru: {
    //             'Protein': [
    //                 { name: 'Grilled Prawns', price: 10000 },
    //                 { name: 'Lamb Chops', price: 15000 },
    //                 { name: 'Spicy Beef Stir-fry', price: 7500 },
    //                 { name: 'Smoked Catfish', price: 6500 },
    //             ],
    //             'Swallow': [
    //                 { name: 'Amala', price: 2200 },
    //                 { name: 'Eba', price: 1800 },
    //                 { name: 'Fufu', price: 2100 },
    //             ],
    //             'Soup': [
    //                 { name: 'Seafood Okro', price: 4500 },
    //                 { name: 'Bitterleaf Soup', price: 3800 },
    //                 { name: 'Oha Soup', price: 4000 },
    //             ],
    //             'Rice & Noodles': [
    //                 { name: 'Seafood Paella', price: 6000 },
    //                 { name: 'Vegetable Noodles', price: 3000 },
    //                 { name: 'Thai Green Curry Rice', price: 5500 },
    //             ],
    //             'Breakfast': [
    //                 { name: 'Continental Breakfast', price: 9000 },
    //                 { name: 'Pancakes with Syrup', price: 4000 },
    //                 { name: 'Fruit Platter', price: 3500 },
    //             ],
    //             'National Dishes': [
    //                 { name: 'Abacha (African Salad)', price: 5500 },
    //                 { name: 'Nkwobi', price: 11000 },
    //                 { name: 'Ofe Nsala', price: 8000 },
    //             ],
    //             'Special Dishes': [
    //                 { name: 'Chef\'s Special Pasta', price: 7000 },
    //                 { name: 'Grilled Salmon', price: 18000 },
    //                 { name: 'Lobster Thermidor', price: 25000 },
    //             ],
    //         }
    //     },
    //     drinks: {
    //         Swali: {
    //             'Soft Drinks': [
    //                 { name: 'Coke', price: 1000 },
    //                 { name: 'Fanta', price: 1000 },
    //                 { name: 'Sprite', price: 1000 },
    //                 { name: 'Pepsi', price: 1000 },
    //                 { name: 'Schweppes', price: 1200 },
    //             ],
    //             'Beers': [
    //                 { name: 'Star', price: 1500 },
    //                 { name: 'Gulder', price: 1500 },
    //                 { name: 'Heineken', price: 2000 },
    //                 { name: 'Guinness Stout', price: 2000 },
    //                 { name: 'Budweiser', price: 1800 },
    //             ],
    //             'Wines': [
    //                 { name: '4th Street (Red)', price: 15000 },
    //                 { name: 'Carlo Rossi (White)', price: 18000 },
    //                 { name: 'Non-Alcoholic Wine', price: 8000 },
    //                 { name: 'Moet & Chandon', price: 80000 },
    //             ],
    //             'Juices': [
    //                 { name: 'Orange Juice', price: 1200 },
    //                 { name: 'Pineapple Juice', price: 1200 },
    //                 { name: 'Mango Juice', price: 1200 },
    //                 { name: 'Fresh Watermelon Juice', price: 1500 },
    //             ],
    //             'Cocktails': [
    //                 { name: 'Mojito', price: 4500 },
    //                 { name: 'Margarita', price: 5000 },
    //                 { name: 'Pina Colada', price: 4800 },
    //                 { name: 'Long Island Iced Tea', price: 6000 },
    //             ],
    //             'Spirits': [
    //                 { name: 'Whiskey (Local)', price: 3000 },
    //                 { name: 'Vodka (Premium)', price: 6000 },
    //                 { name: 'Gin (Dry)', price: 3500 },
    //                 { name: 'Rum (Dark)', price: 4000 },
    //             ]
    //         },
    //         Gbarantoru: {
    //             'Soft Drinks': [
    //                 { name: 'Coke Zero', price: 1100 },
    //                 { name: 'Lemonade', price: 1300 },
    //                 { name: 'Ginger Ale', price: 1200 },
    //             ],
    //             'Beers': [
    //                 { name: 'Tusker Lager', price: 1700 },
    //                 { name: 'Castle Lite', price: 1600 },
    //                 { name: 'Local Craft Beer', price: 2500 },
    //             ],
    //             'Wines': [
    //                 { name: 'Merlot (House)', price: 16000 },
    //                 { name: 'Chardonnay (Premium)', price: 22000 },
    //                 { name: 'Sparkling Wine', price: 28000 },
    //             ],
    //             'Juices': [
    //                 { name: 'Apple Juice', price: 1250 },
    //                 { name: 'Grape Juice', price: 1300 },
    //                 { name: 'Berry Blend Smoothie', price: 2000 },
    //             ],
    //             'Cocktails': [
    //                 { name: 'Cosmopolitan', price: 5200 },
    //                 { name: 'Old Fashioned', price: 5500 },
    //             ],
    //             'Spirits': [
    //                 { name: 'Scotch (Single Malt)', price: 8000 },
    //                 { name: 'Tequila (Reposado)', price: 7000 },
    //                 { name: 'Cognac (VSOP)', price: 12000 },
    //             ]
    //         }
    //     }
    // };

    const DiningBar = () => { // Component name is DiningBar
        const [selectedCategory, setSelectedCategory] = useState('Food'); // 'food' or 'drinks'
        const [selectedBranch, setSelectedBranch] = useState('Swali'); // 'Swali' or 'Gbarantoru'
        const [showMenuModal, setShowMenuModal] = useState(false); // Controls modal visibility

        const sectionRef = useRef(null);
        const [inView, setInView] = useState(false);

        const [diningMenuData, setDiningMenuData] = useState([]);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );

            if (sectionRef.current) {
                observer.observe(sectionRef.current);
            }

            return () => {
                if (sectionRef.current) {
                    observer.unobserve(sectionRef.current);
                }
            };
        }, []);

        useEffect(()=>{
            axiosClient.get(`/menu/branch/${selectedBranch}/category/${selectedCategory}`)
            .then(({data})=>{
                console.log(data);
                setDiningMenuData(data);
            })
            .catch((error) =>{
                console.log(error);
                const response = error.response;
                toast(response.data.message);
            })
        }, [selectedBranch, selectedCategory])

        // Function to open the modal with specific content
        const openMenuModal = (category, branch) => {
            setSelectedCategory(category);
            setSelectedBranch(branch);
            setShowMenuModal(true);
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        };

        const closeMenuModal = () => {
            setShowMenuModal(false);
            document.body.style.overflow = ''; // Restore scrolling
            // Optionally reset category/branch after closing if desired, or keep for re-opening
            // setSelectedCategory(null);
            // setSelectedBranch(null);
        };

        // const currentMenu = diningMenuData[selectedCategory]?.[selectedBranch] || {};
        // const categories = Object.keys(currentMenu);

        return (
            <section id="dining" ref={sectionRef} className="py-20 md:py-32 px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-800 transition-colors duration-500 relative overflow-hidden">
                {/* Dynamic Background Patterns */}
                <div className="absolute inset-0 z-0 opacity-10 animate-star-trail"></div>
                <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div>

                <div className="container mx-auto text-center relative z-10">
                    {/* Hotel Logo and Title */}
                    <div className={`mb-12 ${inView ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
                        <Hotel size={80} className="mx-auto text-blue-600 dark:text-blue-400 animate-bounce-subtle" />
                        <h2 className="text-5xl md:text-6xl font-extrabold text-blue-800 dark:text-blue-400 mt-4 font-display">
                            Oxbow Lake Dining
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-2 font-body">
                            A Culinary Journey Awaits You
                        </p>
                    </div>

                    {/* Main Food/Drinks Category Selection */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto ${inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
                        {/* Food Card */}
                        <div
                            onClick={() => setSelectedCategory('food')}
                            className={`group relative overflow-hidden p-8 rounded-3xl shadow-xl border-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
                                ${selectedCategory === 'food'
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white border-blue-400 animate-pulse-button'
                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}
                                flex flex-col items-center justify-center card-magic-hover-alt`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
                            <Utensils size={64} className={`mb-4 transition-colors duration-300 ${selectedCategory === 'food' ? 'text-white' : 'text-blue-600 dark:text-blue-400'} animate-bounce-icon-small relative z-10`} />
                            <h3 className="text-3xl font-bold font-display relative z-10">Exquisite Food</h3>
                            <p className={`text-lg mt-2 font-body relative z-10 ${selectedCategory === 'food' ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>Savor a world of flavors.</p>
                            {selectedCategory === 'food' && <ChevronRight size={32} className="absolute right-6 top-1/2 -translate-y-1/2 text-white animate-pulse-right" />}
                        </div>

                        {/* Drinks Card */}
                        <div
                            onClick={() => setSelectedCategory('drinks')}
                            className={`group relative overflow-hidden p-8 rounded-3xl shadow-xl border-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
                                ${selectedCategory === 'drinks'
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white border-blue-400 animate-pulse-button'
                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}
                            flex flex-col items-center justify-center card-magic-hover-alt`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
                            <Coffee size={64} className={`mb-4 transition-colors duration-300 ${selectedCategory === 'drinks' ? 'text-white' : 'text-blue-600 dark:text-blue-400'} animate-bounce-icon-small relative z-10`} />
                            <h3 className="text-3xl font-bold font-display relative z-10">Refreshing Drinks</h3>
                            <p className={`text-lg mt-2 font-body relative z-10 ${selectedCategory === 'drinks' ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>Quench your thirst with our finest.</p>
                            {selectedCategory === 'drinks' && <ChevronRight size={32} className="absolute right-6 top-1/2 -translate-y-1/2 text-white animate-pulse-right" />}
                        </div>
                    </div>

                    {/* Branch Selection Buttons - only show if a category is selected */}
                    {selectedCategory && (
                        <div className={`flex flex-wrap justify-center gap-6 mb-12 animate-fade-in delay-300`}>
                            {/* Swali Branch Card */}
                            <div
                                onClick={() => openMenuModal(selectedCategory, 'Swali')}
                                className="group relative overflow-hidden p-6 rounded-2xl shadow-lg border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
                                    bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center space-x-3 w-full sm:w-auto min-w-[200px] magic-btn-hover"
                            >
                                <span className="relative z-10 text-xl font-semibold font-body">Swali Branch</span>
                                <ChevronRight size={24} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>

                            {/* Gbarantoru Branch Card */}
                            <div
                                onClick={() => openMenuModal(selectedCategory, 'Gbarantoru')}
                                className="group relative overflow-hidden p-6 rounded-2xl shadow-lg border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
                                    bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center space-x-3 w-full sm:w-auto min-w-[200px] magic-btn-hover"
                            >
                                <span className="relative z-10 text-xl font-semibold font-body">Gbarantoru Branch</span>
                                <ChevronRight size={24} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Menu Modal */}
                {showMenuModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in-fast p-4 sm:p-6">
                        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative border-4 border-blue-500 dark:border-blue-700 animate-scale-in-bounce">
                            <button
                                onClick={closeMenuModal}
                                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 z-50"
                                title="Close Menu"
                            >
                                <X size={28} />
                            </button>

                            {/* Modal Header */}
                            <div className="mb-8 text-center relative pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-400 font-display animate-text-reveal-gradient">
                                    {selectedCategory === 'food' ? 'Food Menu' : 'Drinks Menu'}
                                </h3>
                                <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mt-2 font-body">
                                    {selectedBranch} Branch
                                </p>
                            </div>

                            {/* {categories.length === 0 ? (
                                <p className="text-xl text-gray-600 dark:text-gray-400 py-10 font-body text-center">
                                    No items found for this selection.
                                </p>
                            ) : (
                                <div className="space-y-10">
                                    {categories.map((categoryName, catIndex) => (
                                        <div key={categoryName} className="animate-slide-in-up" style={{ animationDelay: `${0.1 + catIndex * 0.05}s` }}>
                                            <h4 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 font-display text-left flex items-center">
                                                <Star size={24} className="mr-3 text-yellow-500 fill-current animate-bounce-icon-small" /> {categoryName}
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                                {currentMenu[categoryName].map((item, itemIndex) => (
                                                    <div
                                                        key={itemIndex}
                                                        className="flex justify-between items-baseline p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md border border-gray-100 dark:border-gray-700 animate-pop-in-bounce"
                                                        style={{ animationDelay: `${0.2 + catIndex * 0.05 + itemIndex * 0.02}s` }}
                                                    >
                                                        <span className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 font-body text-left">{item.name}</span>
                                                        <span className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400 font-display">₦{item.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )} */}

                            {diningMenuData.length === 0 ? (
                                <p className="text-xl text-gray-600 dark:text-gray-400 py-10 font-body text-center">
                                    No items found for this selection.
                                </p>
                            ) : (
                                <div className="space-y-10">
                                    <div className="animate-slide-in-up" style={{ animationDelay: `${0.1}s` }}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                            {diningMenuData.map((categoryName, catIndex) => (
                                                <div key={catIndex} className="flex justify-between items-baseline p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md border border-gray-100 dark:border-gray-700 animate-pop-in-bounce" style={{ animationDelay: `${0.2 + catIndex * 0.05}s` }}>
                                                    <span className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 font-body text-left">{categoryName.name}</span>
                                                    <span className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400 font-display">₦{categoryName.price.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <ToastContainer />
            </section>
        );
    };

    export default DiningBar; // Export as DiningBar
    