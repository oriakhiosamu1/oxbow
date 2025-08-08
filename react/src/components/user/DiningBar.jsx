// // src/components/DiningBar.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Utensils, Coffee, X, Hotel, Star, ChevronRight, ChevronLeft } from 'lucide-react'; // Added ChevronLeft
// import axiosClient from '../../axiosClient/axiosClient';

// // const diningMenuData = {
// //     food: {
// //         Swali: {
// //             'Protein': [
// //                 { name: 'Turkey', price: 8500 },
// //                 { name: 'Scale Fish', price: 8000 },
// //                 { name: 'Chicken', price: 6500 },
// //                 { name: 'Goat Meat', price: 6000 },
// //                 { name: 'Beef', price: 6000 },
// //                 { name: 'Gizzard', price: 5000 },
// //                 { name: 'Snail', price: 6000 },
// //                 { name: 'Catfish', price: 5000 },
// //             ],
// //             'Swallow': [
// //                 { name: 'Wheat', price: 2000 },
// //                 { name: 'Semo', price: 2000 },
// //                 { name: 'Poundo', price: 2000 },
// //                 { name: 'Garri', price: 1000 },
// //             ],
// //             'Soup': [
// //                 { name: 'Vegetable', price: 3000 },
// //                 { name: 'Afang', price: 3000 },
// //                 { name: 'Egusi', price: 2500 },
// //                 { name: 'Ogbono', price: 2500 },
// //                 { name: 'Okra', price: 2500 },
// //                 { name: 'Banga', price: 2500 },
// //                 { name: 'Native', price: 2500 },
// //             ],
// //             'Soup, Swallow & Protein': [
// //                 { name: 'Fisherman Soup', price: 20000 },
// //             ],
// //             'Rice & Noodles': [
// //                 { name: 'Fried Rice', price: 3500 },
// //                 { name: 'Jollof Rice', price: 3500 },
// //                 { name: 'Coconut Rice', price: 4000 },
// //                 { name: 'White Rice', price: 2500 },
// //                 { name: 'Noodles & Egg', price: 5000 },
// //                 { name: 'Jollof Pasta', price: 4000 },
// //             ],
// //             'Breakfast': [
// //                 { name: 'English Breakfast', price: 10000 },
// //                 { name: 'Bread, Omellet & Tea', price: 5500 },
// //                 { name: 'Bread, Oat & Omellet', price: 5500 },
// //                 { name: 'Sardine Omellet', price: 3500 },
// //                 { name: 'Scrambled Egg', price: 2500 },
// //                 { name: 'Omellet', price: 2000 },
// //                 { name: 'Egg Sauce', price: 4000 },
// //             ],
// //             'National Dishes': [
// //                 { name: 'Yam/Plantain Porridge', price: 5000 },
// //                 { name: 'Goat Meat Pepper Soup', price: 7000 },
// //                 { name: 'Isi Ewu', price: 12000 },
// //                 { name: 'Yam Pepper Soup', price: 4000 },
// //                 { name: 'Turkey Pepper Soup', price: 9000 },
// //                 { name: 'Chicken Pepper Soup', price: 7000 },
// //                 { name: 'Scale Fish Pepper Soup', price: 9000 },
// //                 { name: 'Catfish Pepper Soup', price: 6000 },
// //                 { name: 'Full Catfish Pepper Soup', price: 15000 },
// //                 { name: 'Fried Plantain/Yam', price: 2000 },
// //             ],
// //             'Special Dishes': [
// //                 { name: 'Chinese Fried Rice', price: 6000 },
// //                 { name: 'Special Fried Rice', price: 5000 },
// //             ],
// //         },
// //         Gbarantoru: {
// //             'Protein': [
// //                 { name: 'Grilled Prawns', price: 10000 },
// //                 { name: 'Lamb Chops', price: 15000 },
// //                 { name: 'Spicy Beef Stir-fry', price: 7500 },
// //                 { name: 'Smoked Catfish', price: 6500 },
// //             ],
// //             'Swallow': [
// //                 { name: 'Amala', price: 2200 },
// //                 { name: 'Eba', price: 1800 },
// //                 { name: 'Fufu', price: 2100 },
// //             ],
// //             'Soup': [
// //                 { name: 'Seafood Okro', price: 4500 },
// //                 { name: 'Bitterleaf Soup', price: 3800 },
// //                 { name: 'Oha Soup', price: 4000 },
// //             ],
// //             'Rice & Noodles': [
// //                 { name: 'Seafood Paella', price: 6000 },
// //                 { name: 'Vegetable Noodles', price: 3000 },
// //                 { name: 'Thai Green Curry Rice', price: 5500 },
// //             ],
// //             'Breakfast': [
// //                 { name: 'Continental Breakfast', price: 9000 },
// //                 { name: 'Pancakes with Syrup', price: 4000 },
// //                 { name: 'Fruit Platter', price: 3500 },
// //             ],
// //             'National Dishes': [
// //                 { name: 'Abacha (African Salad)', price: 5500 },
// //                 { name: 'Nkwobi', price: 11000 },
// //                 { name: 'Ofe Nsala', price: 8000 },
// //             ],
// //             'Special Dishes': [
// //                 { name: 'Chef\'s Special Pasta', price: 7000 },
// //                 { name: 'Grilled Salmon', price: 18000 },
// //                 { name: 'Lobster Thermidor', price: 25000 },
// //             ],
// //         }
// //     },
// //     drinks: {
// //         Swali: {
// //             'Soft Drinks': [
// //                 { name: 'Coke', price: 1000 },
// //                 { name: 'Fanta', price: 1000 },
// //                 { name: 'Sprite', price: 1000 },
// //                 { name: 'Pepsi', price: 1000 },
// //                 { name: 'Schweppes', price: 1200 },
// //             ],
// //             'Beers': [
// //                 { name: 'Star', price: 1500 },
// //                 { name: 'Gulder', price: 1500 },
// //                 { name: 'Heineken', price: 2000 },
// //                 { name: 'Guinness Stout', price: 2000 },
// //                 { name: 'Budweiser', price: 1800 },
// //             ],
// //             'Wines': [
// //                 { name: '4th Street (Red)', price: 15000 },
// //                 { name: 'Carlo Rossi (White)', price: 18000 },
// //                 { name: 'Non-Alcoholic Wine', price: 8000 },
// //                 { name: 'Moet & Chandon', price: 80000 },
// //             ],
// //             'Juices': [
// //                 { name: 'Orange Juice', price: 1200 },
// //                 { name: 'Pineapple Juice', price: 1200 },
// //                 { name: 'Mango Juice', price: 1200 },
// //                 { name: 'Fresh Watermelon Juice', price: 1500 },
// //             ],
// //             'Cocktails': [
// //                 { name: 'Mojito', price: 4500 },
// //                 { name: 'Margarita', price: 5000 },
// //                 { name: 'Pina Colada', price: 4800 },
// //                 { name: 'Long Island Iced Tea', price: 6000 },
// //             ],
// //             'Spirits': [
// //                 { name: 'Whiskey (Local)', price: 3000 },
// //                 { name: 'Vodka (Premium)', price: 6000 },
// //                 { name: 'Gin (Dry)', price: 3500 },
// //                 { name: 'Rum (Dark)', price: 4000 },
// //             ]
// //         },
// //         Gbarantoru: {
// //             'Soft Drinks': [
// //                 { name: 'Coke Zero', price: 1100 },
// //                 { name: 'Lemonade', price: 1300 },
// //                 { name: 'Ginger Ale', price: 1200 },
// //             ],
// //             'Beers': [
// //                 { name: 'Tusker Lager', price: 1700 },
// //                 { name: 'Castle Lite', price: 1600 },
// //                 { name: 'Local Craft Beer', price: 2500 },
// //             ],
// //             'Wines': [
// //                 { name: 'Merlot (House)', price: 16000 },
// //                 { name: 'Chardonnay (Premium)', price: 22000 },
// //                 { name: 'Sparkling Wine', price: 28000 },
// //             ],
// //             'Juices': [
// //                 { name: 'Apple Juice', price: 1250 },
// //                 { name: 'Grape Juice', price: 1300 },
// //                 { name: 'Berry Blend Smoothie', price: 2000 },
// //             ],
// //             'Cocktails': [
// //                 { name: 'Cosmopolitan', price: 5200 },
// //                 { name: 'Old Fashioned', price: 5500 },
// //             ],
// //             'Spirits': [
// //                 { name: 'Scotch (Single Malt)', price: 8000 },
// //                 { name: 'Tequila (Reposado)', price: 7000 },
// //                 { name: 'Cognac (VSOP)', price: 12000 },
// //             ]
// //         }
// //     }
// // };

// const DiningBar = () => {
//     const [selectedCategory, setSelectedCategory] = useState(null); // 'food' or 'drinks'
//     const [selectedBranch, setSelectedBranch] = useState(null); // 'Swali' or 'Gbarantoru'
//     const [showMenuModal, setShowMenuModal] = useState(false); // Controls modal visibility

//     const sectionRef = useRef(null);
//     const [inView, setInView] = useState(false);
//     const [diningMenuData, setDiningMenuData] = useState([]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setInView(true);
//                     observer.disconnect();
//                 }
//             },
//             { threshold: 0.1 }
//         );

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current);
//         }

//         return () => {
//             if (sectionRef.current) {
//                 observer.unobserve(sectionRef.current);
//             }
//         };
//     }, []);

//     // Function to handle initial category selection
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//         setSelectedBranch(null); // Reset branch when category changes
//         setShowMenuModal(false); // Ensure modal is closed
//     };

//     // Function to open the modal with specific content
//     const openMenuModal = (branch) => {
//         setSelectedBranch(branch);
//         setShowMenuModal(true);
//         document.body.style.overflow = 'hidden'; // Prevent scrolling background
//     };

//     const closeMenuModal = () => {
//         setShowMenuModal(false);
//         document.body.style.overflow = ''; // Restore scrolling
//         setSelectedCategory(null); // Reset category and branch when modal closes
//         setSelectedBranch(null);
//     };

//     useEffect(()=>{
//         axiosClient.get(`/menu/branch/${selectedBranch}/category/${selectedCategory}`)
//         .then(({data})=>{
//             console.log(data);
//             setDiningMenuData(data);
//         })
//         .catch((error)=>{
//             console.log(error);
//         });
//     }, [selectedBranch, selectedCategory]);

//     const currentMenu = diningMenuData || {};
//     // const currentMenu = diningMenuData[selectedCategory]?.[selectedBranch] || {};

//     const categories = Object.keys(currentMenu);

//     return (
//         <section id="dining" ref={sectionRef} className="py-16 md:py-32 px-4 bg-gradient-to-br from-gray-50 to-gray-200 transition-colors duration-500 relative overflow-hidden">
//             {/* Dynamic Background Patterns */}
//             <div className="absolute inset-0 z-0 opacity-10 animate-star-trail"></div>
//             <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div>

//             <div className="container mx-auto text-center relative z-10">
//                 {/* Hotel Logo and Title */}
//                 <div className={`mb-8 sm:mb-12 ${inView ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
//                     <Hotel size={64} sm:size={80} className="mx-auto text-blue-600 animate-bounce-subtle" />
//                     <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 mt-3 sm:mt-4 font-display">
//                         Oxbow Lake Dining
//                     </h2>
//                     <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-1 sm:mt-2 font-body">
//                         A Culinary Journey Awaits You
//                     </p>
//                 </div>

//                 {/* Step 1: Main Food/Drinks Category Selection */}
//                 {!selectedCategory && (
//                     <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 max-w-4xl mx-auto ${inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
//                         {/* Food Card */}
//                         <div
//                             onClick={() => handleCategorySelect('food')}
//                             className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-xl border-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
//                                 bg-white text-gray-800 border-gray-200 hover:bg-blue-50
//                                 flex flex-col items-center justify-center card-magic-hover-alt`}
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
//                             <Utensils size={56} sm:size={64} className="mb-3 sm:mb-4 text-blue-600 animate-bounce-icon-small relative z-10" />
//                             <h3 className="text-2xl sm:text-3xl font-bold font-display relative z-10">Exquisite Food</h3>
//                             <p className="text-base sm:text-lg mt-1 sm:mt-2 font-body relative z-10 text-gray-600">Savor a world of flavors.</p>
//                             <ChevronRight size={28} sm:size={32} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse-right" />
//                         </div>

//                         {/* Drinks Card */}
//                         <div
//                             onClick={() => handleCategorySelect('drinks')}
//                             className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-xl border-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
//                                 bg-white text-gray-800 border-gray-200 hover:bg-blue-50
//                                 flex flex-col items-center justify-center card-magic-hover-alt`}
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
//                             <Coffee size={56} sm:size={64} className="mb-3 sm:mb-4 text-blue-600 animate-bounce-icon-small relative z-10" />
//                             <h3 className="text-2xl sm:text-3xl font-bold font-display relative z-10">Refreshing Drinks</h3>
//                             <p className="text-base sm:text-lg mt-1 sm:mt-2 font-body relative z-10 text-gray-600">Quench your thirst with our finest.</p>
//                             <ChevronRight size={28} sm:size={32} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse-right" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Step 2: Branch Selection Buttons - only show if a category is selected */}
//                 {selectedCategory && !selectedBranch && (
//                     <div className={`flex flex-col items-center animate-fade-in delay-100`}>
//                         <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 font-display">
//                             Select a Branch for {selectedCategory === 'food' ? 'Food' : 'Drinks'}
//                         </h3>
//                         <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl w-full">
//                             {/* Swali Branch Card */}
//                             <button
//                                 onClick={() => openMenuModal('Swali')}
//                                 className="group relative overflow-hidden p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-purple-300 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
//                                     bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto min-w-[180px] magic-btn-hover text-lg sm:text-xl font-semibold font-body"
//                             >
//                                 <span className="relative z-10">Swali Branch</span>
//                                 <ChevronRight size={20} sm:size={24} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
//                             </button>

//                             {/* Gbarantoru Branch Card */}
//                             <button
//                                 onClick={() => openMenuModal('Gbarantoru')}
//                                 className="group relative overflow-hidden p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-purple-300 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
//                                     bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto min-w-[180px] magic-btn-hover text-lg sm:text-xl font-semibold font-body"
//                             >
//                                 <span className="relative z-10">Gbarantoru Branch</span>
//                                 <ChevronRight size={20} sm:size={24} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
//                             </button>
//                         </div>
//                         <button
//                             onClick={() => setSelectedCategory(null)} // Go back to category selection
//                             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 text-sm sm:text-base"
//                         >
//                             <ChevronLeft size={16} className="inline mr-2" /> Back to Categories
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Menu Modal */}
//             {showMenuModal && selectedCategory && selectedBranch && (
//                 <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in-fast p-4 sm:p-6">
//                     <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-xl md:max-w-4xl max-h-[95vh] overflow-y-auto relative border-4 border-blue-500 animate-scale-in-bounce">
//                         <button
//                             onClick={closeMenuModal}
//                             className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-red-500 transition-colors duration-200 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-50"
//                             title="Close Menu"
//                         >
//                             <X size={24} sm:size={28} />
//                         </button>

//                         {/* Modal Header */}
//                         <div className="mb-6 sm:mb-8 text-center relative pb-3 sm:pb-4 border-b border-gray-200">
//                             <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 font-display animate-text-reveal-gradient">
//                                 {selectedCategory === 'food' ? 'Food Menu' : 'Drinks Menu'}
//                             </h3>
//                             <p className="text-lg sm:text-xl text-gray-700 mt-1 sm:mt-2 font-body">
//                                 {selectedBranch} Branch
//                             </p>
//                         </div>

//                         {categories.length === 0 ? (
//                             <p className="text-base sm:text-xl text-gray-600 py-8 sm:py-10 font-body text-center">
//                                 No items found for this selection.
//                             </p>
//                         ) : (
//                             <div className="space-y-8 sm:space-y-10">
//                                 {categories.map((categoryName, catIndex) => (
//                                     <div key={categoryName} className="animate-slide-in-up" style={{ animationDelay: `${0.1 + catIndex * 0.05}s` }}>
//                                         <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 font-display text-left flex items-center">
//                                             <Star size={20} sm:size={24} className="mr-2 sm:mr-3 text-yellow-500 fill-current animate-bounce-icon-small" /> {categoryName}
//                                         </h4>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
//                                             {currentMenu[categoryName].map((item, itemIndex) => (
//                                                 <div
//                                                     key={itemIndex}
//                                                     className="flex justify-between items-baseline p-3 sm:p-4 rounded-lg bg-gray-50 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md border border-gray-100 animate-pop-in-bounce"
//                                                     style={{ animationDelay: `${0.2 + catIndex * 0.05 + itemIndex * 0.02}s` }}
//                                                 >
//                                                     <span className="text-base sm:text-lg font-medium text-gray-700 font-body text-left">{item.name}</span>
//                                                     <span className="text-lg sm:text-xl font-bold text-green-700 font-display">₦{item.price.toLocaleString()}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default DiningBar;































// src/components/DiningBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Coffee, X, Hotel, Star, ChevronRight, ChevronLeft } from 'lucide-react'; // Added ChevronLeft

const diningMenuData = {
    food: {
        Swali: {
            'Protein': [
                { name: 'Turkey', price: 8500 },
                { name: 'Scale Fish', price: 8000 },
                { name: 'Chicken', price: 6500 },
                { name: 'Goat Meat', price: 6000 },
                { name: 'Beef', price: 6000 },
                { name: 'Gizzard', price: 5000 },
                { name: 'Snail', price: 6000 },
                { name: 'Catfish', price: 5000 },
            ],
            'Swallow': [
                { name: 'Wheat', price: 2000 },
                { name: 'Semo', price: 2000 },
                { name: 'Poundo', price: 2000 },
                { name: 'Garri', price: 1000 },
            ],
            'Soup': [
                { name: 'Vegetable', price: 3000 },
                { name: 'Afang', price: 3000 },
                { name: 'Egusi', price: 2500 },
                { name: 'Ogbono', price: 2500 },
                { name: 'Okra', price: 2500 },
                { name: 'Banga', price: 2500 },
                { name: 'Native', price: 2500 },
            ],
            'Soup, Swallow & Protein': [
                { name: 'Fisherman Soup', price: 20000 },
            ],
            'Rice & Noodles': [
                { name: 'Fried Rice', price: 3500 },
                { name: 'Jollof Rice', price: 3500 },
                { name: 'Coconut Rice', price: 4000 },
                { name: 'White Rice', price: 2500 },
                { name: 'Noodles & Egg', price: 5000 },
                { name: 'Jollof Pasta', price: 4000 },
            ],
            'Breakfast': [
                { name: 'English Breakfast', price: 10000 },
                { name: 'Bread, Omellet & Tea', price: 5500 },
                { name: 'Bread, Oat & Omellet', price: 5500 },
                { name: 'Sardine Omellet', price: 3500 },
                { name: 'Scrambled Egg', price: 2500 },
                { name: 'Omellet', price: 2000 },
                { name: 'Egg Sauce', price: 4000 },
            ],
            'National Dishes': [
                { name: 'Yam/Plantain Porridge', price: 5000 },
                { name: 'Goat Meat Pepper Soup', price: 7000 },
                { name: 'Isi Ewu', price: 12000 },
                { name: 'Yam Pepper Soup', price: 4000 },
                { name: 'Turkey Pepper Soup', price: 9000 },
                { name: 'Chicken Pepper Soup', price: 7000 },
                { name: 'Scale Fish Pepper Soup', price: 9000 },
                { name: 'Catfish Pepper Soup', price: 6000 },
                { name: 'Full Catfish Pepper Soup', price: 15000 },
                { name: 'Fried Plantain/Yam', price: 2000 },
            ],
            'Special Dishes': [
                { name: 'Chinese Fried Rice', price: 6000 },
                { name: 'Special Fried Rice', price: 5000 },
            ],
        },
        Gbarantoru: {
            'Protein': [
                { name: 'Turkey', price: 8500 },
                { name: 'Scale Fish', price: 8000 },
                { name: 'Chicken', price: 6500 },
                { name: 'Goat Meat', price: 6000 },
                { name: 'Beef', price: 6000 },
                { name: 'Gizzard', price: 5000 },
                { name: 'Snail', price: 6000 },
                { name: 'Catfish', price: 5000 },
            ],
            'Swallow': [
                { name: 'Wheat', price: 2000 },
                { name: 'Semo', price: 2000 },
                { name: 'Poundo', price: 2000 },
                { name: 'Garri', price: 1000 },
            ],
            'Soup': [
                { name: 'Vegetable', price: 3000 },
                { name: 'Afang', price: 3000 },
                { name: 'Egusi', price: 2500 },
                { name: 'Ogbono', price: 2500 },
                { name: 'Okra', price: 2500 },
                { name: 'Banga', price: 2500 },
                { name: 'Native', price: 2500 },
            ],
            'Soup, Swallow & Protein': [
                { name: 'Fisherman Soup', price: 20000 },
            ],
            'Rice & Noodles': [
                { name: 'Fried Rice', price: 3500 },
                { name: 'Jollof Rice', price: 3500 },
                { name: 'Coconut Rice', price: 4000 },
                { name: 'White Rice', price: 2500 },
                { name: 'Noodles & Egg', price: 5000 },
                { name: 'Jollof Pasta', price: 4000 },
            ],
            'Breakfast': [
                { name: 'English Breakfast', price: 10000 },
                { name: 'Bread, Omellet & Tea', price: 5500 },
                { name: 'Bread, Oat & Omellet', price: 5500 },
                { name: 'Sardine Omellet', price: 3500 },
                { name: 'Scrambled Egg', price: 2500 },
                { name: 'Omellet', price: 2000 },
                { name: 'Egg Sauce', price: 4000 },
            ],
            'National Dishes': [
                { name: 'Yam/Plantain Porridge', price: 5000 },
                { name: 'Goat Meat Pepper Soup', price: 7000 },
                { name: 'Isi Ewu', price: 12000 },
                { name: 'Yam Pepper Soup', price: 4000 },
                { name: 'Turkey Pepper Soup', price: 9000 },
                { name: 'Chicken Pepper Soup', price: 7000 },
                { name: 'Scale Fish Pepper Soup', price: 9000 },
                { name: 'Catfish Pepper Soup', price: 6000 },
                { name: 'Full Catfish Pepper Soup', price: 15000 },
                { name: 'Fried Plantain/Yam', price: 2000 },
            ],
            'Special Dishes': [
                { name: 'Chinese Fried Rice', price: 6000 },
                { name: 'Special Fried Rice', price: 5000 },
            ],
        }
    },
    drinks: {
        Swali: {
'SOFT DRINKS': [
    { name: 'Water', price: 500 },
    { name: 'Coke', price: 1000 },
    { name: 'Fanta', price: 1000 },
    { name: 'Sprite', price: 1000 },
    { name: 'Fayrouz', price: 1000 },
    { name: 'Maltina', price: 1500 },
    { name: 'Can Pure Heaven', price: 3000 },
    { name: 'Exotic', price: 3000 },
    { name: 'Active', price: 3000 },
    { name: 'Vita-Milk', price: 3500 },
    { name: 'Hollandia', price: 3500 },
    { name: 'V-smatic/Mr Bean', price: 3500 },
],
'BEERS': [
    { name: 'Star/Gulder', price: 1500 },
    { name: 'Star Raddler', price: 1500 },
    { name: 'Desperado', price: 1500 },
    { name: 'Legend Twist', price: 1500 },
    { name: 'Hero/Life', price: 1500 },
    { name: 'Trophy', price: 1500 },
    { name: '3’3 Export', price: 1500 },
    { name: 'Legend', price: 2000 },
    { name: 'Smirnoff Ice', price: 1500 },
    { name: 'Medium Stout', price: 2000 },
    { name: 'Budweiser', price: 2000 },
    { name: 'Heineken', price: 2000 },
],
'ENERGY DRINKS': [
    { name: 'Fearless', price: 1000 },
    { name: 'Predator', price: 1000 },
    { name: 'Blue Bullet', price: 2000 },
    { name: 'Monster', price: 2000 },
    { name: 'Black Bullet', price: 3000 },
],
'GIN/VODKA/RUM/TEQUILA': [
    { name: 'Small Smirnoff Vodka/Magic Moment', price: 5000 },
    { name: 'Gordons (Small)', price: 5000 },
    { name: 'Gordons (Big)', price: 12000 },
    { name: 'Big Smirnoff Vodka', price: 12000 },
    { name: 'Big Magic Moment', price: 12000 },
    { name: 'Bazooka', price: 12000 },
    { name: 'J.J. Whitley Gold', price: 15000 },
    { name: 'Tequila Shot', price: 3000 },
],
'CREAM': [
    { name: 'Best (Small)', price: 5000 },
    { name: 'Best (Big)', price: 15000 },
    { name: 'Cream Caffe', price: 15000 },
    { name: 'Baileys (Big)', price: 30000 },
],
'BITTERS': [
    { name: 'Orijin/Action/Odogwu Bitters (Small)', price: 2000 },
    { name: 'Action Bitters (Big)', price: 7000 },
    { name: 'Campari (Small)', price: 12000 },
    { name: 'Campari (Midium)', price: 30000 },
    { name: 'Campari (Big)', price: 40000 },
],
'WINES': [
    { name: 'Martinellis (Small)', price: 7000 },
    { name: '4th Street', price: 15000 },
    { name: 'Martinellis (Big)', price: 15000 },
    { name: 'Sweet Lips/Kiss', price: 15000 },
    { name: 'Explore Wine', price: 15000 },
    { name: 'Carlo Rossi', price: 20000 },
    { name: 'Four Cousins', price: 20000 },
    { name: 'Andre Rose', price: 25000 },
    { name: 'Rubis', price: 30000 },
],
'WHISKEY/LIQUOR': [
    { name: 'Small Imperial Blue', price: 4000 },
    { name: 'Captain Jack (Big)', price: 7000 },
    { name: 'Big Imperial Blue', price: 10000 },
    { name: '8 PM', price: 12000 },
    { name: 'All Seasons', price: 10000 },
    { name: 'William Lawson', price: 25000 },
    { name: 'American Honey', price: 40000 },
    { name: 'Red Label', price: 35000 },
    { name: 'Jameson Green', price: 40000 },
    { name: 'Black Label', price: 55000 },
    { name: 'Jameson Black', price: 70000 },
    { name: 'Glenfiddich 12 years', price: 80000 },
    { name: 'Gold Label', price: 80000 },
    { name: 'Singleton 12 years', price: 90000 },
    { name: 'Hennessy V.S', price: 100000 },
    { name: 'Glenfiddich 15 years', price: 100000 },
    { name: 'Martel V.S', price: 100000 },
    { name: 'Glenfiddich 18 years', price: 150000 },
    { name: 'Hennessy V.S.O.P', price: 150000 },
    { name: 'Martel V.S.O.P', price: 150000 },
],

        },
        Gbarantoru: {
            'SOFT DRINKS': [
    { name: 'Water', price: 500 },
    { name: 'Coke', price: 1000 },
    { name: 'Fanta', price: 1000 },
    { name: 'Sprite', price: 1000 },
    { name: 'Fayrouz', price: 1000 },
    { name: 'Maltina', price: 1500 },
    { name: 'Can Pure Heaven', price: 3000 },
    { name: 'Exotic', price: 3000 },
    { name: 'Active', price: 3000 },
    { name: 'Vita-Milk', price: 3500 },
    { name: 'Hollandia', price: 3500 },
    { name: 'V-smatic/Mr Bean', price: 3500 },
],
'BEERS': [
    { name: 'Star/Gulder', price: 1500 },
    { name: 'Star Raddler', price: 1500 },
    { name: 'Desperado', price: 1500 },
    { name: 'Legend Twist', price: 1500 },
    { name: 'Hero/Life', price: 1500 },
    { name: 'Trophy', price: 1500 },
    { name: '3’3 Export', price: 1500 },
    { name: 'Legend', price: 2000 },
    { name: 'Smirnoff Ice', price: 1500 },
    { name: 'Medium Stout', price: 2000 },
    { name: 'Budweiser', price: 2000 },
    { name: 'Heineken', price: 2000 },
],
'ENERGY DRINKS': [
    { name: 'Fearless', price: 1000 },
    { name: 'Predator', price: 1000 },
    { name: 'Blue Bullet', price: 2000 },
    { name: 'Monster', price: 2000 },
    { name: 'Black Bullet', price: 3000 },
],
'GIN/VODKA/RUM/TEQUILA': [
    { name: 'Small Smirnoff Vodka/Magic Moment', price: 5000 },
    { name: 'Gordons (Small)', price: 5000 },
    { name: 'Gordons (Big)', price: 12000 },
    { name: 'Big Smirnoff Vodka', price: 12000 },
    { name: 'Big Magic Moment', price: 12000 },
    { name: 'Bazooka', price: 12000 },
    { name: 'J.J. Whitley Gold', price: 15000 },
    { name: 'Tequila Shot', price: 3000 },
],
'CREAM': [
    { name: 'Best (Small)', price: 5000 },
    { name: 'Best (Big)', price: 15000 },
    { name: 'Cream Caffe', price: 15000 },
    { name: 'Baileys (Big)', price: 30000 },
],
'BITTERS': [
    { name: 'Orijin/Action/Odogwu Bitters (Small)', price: 2000 },
    { name: 'Action Bitters (Big)', price: 7000 },
    { name: 'Campari (Small)', price: 12000 },
    { name: 'Campari (Midium)', price: 30000 },
    { name: 'Campari (Big)', price: 40000 },
],
'WINES': [
    { name: 'Martinellis (Small)', price: 7000 },
    { name: '4th Street', price: 15000 },
    { name: 'Martinellis (Big)', price: 15000 },
    { name: 'Sweet Lips/Kiss', price: 15000 },
    { name: 'Explore Wine', price: 15000 },
    { name: 'Carlo Rossi', price: 20000 },
    { name: 'Four Cousins', price: 20000 },
    { name: 'Andre Rose', price: 25000 },
    { name: 'Rubis', price: 30000 },
],
'WHISKEY/LIQUOR': [
    { name: 'Small Imperial Blue', price: 4000 },
    { name: 'Captain Jack (Big)', price: 7000 },
    { name: 'Big Imperial Blue', price: 10000 },
    { name: '8 PM', price: 12000 },
    { name: 'All Seasons', price: 10000 },
    { name: 'William Lawson', price: 25000 },
    { name: 'American Honey', price: 40000 },
    { name: 'Red Label', price: 35000 },
    { name: 'Jameson Green', price: 40000 },
    { name: 'Black Label', price: 55000 },
    { name: 'Jameson Black', price: 70000 },
    { name: 'Glenfiddich 12 years', price: 80000 },
    { name: 'Gold Label', price: 80000 },
    { name: 'Singleton 12 years', price: 90000 },
    { name: 'Hennessy V.S', price: 100000 },
    { name: 'Glenfiddich 15 years', price: 100000 },
    { name: 'Martel V.S', price: 100000 },
    { name: 'Glenfiddich 18 years', price: 150000 },
    { name: 'Hennessy V.S.O.P', price: 150000 },
    { name: 'Martel V.S.O.P', price: 150000 },
],
        }
    }
};

const DiningBar = () => {
    const [selectedCategory, setSelectedCategory] = useState(null); // 'food' or 'drinks'
    const [selectedBranch, setSelectedBranch] = useState(null); // 'Swali' or 'Gbarantoru'
    const [showMenuModal, setShowMenuModal] = useState(false); // Controls modal visibility

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

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

    // Function to handle initial category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedBranch(null); // Reset branch when category changes
        setShowMenuModal(false); // Ensure modal is closed
    };

    // Function to open the modal with specific content
    const openMenuModal = (branch) => {
        setSelectedBranch(branch);
        setShowMenuModal(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    const closeMenuModal = () => {
        setShowMenuModal(false);
        document.body.style.overflow = ''; // Restore scrolling
        setSelectedCategory(null); // Reset category and branch when modal closes
        setSelectedBranch(null);
    };

    const currentMenu = diningMenuData[selectedCategory]?.[selectedBranch] || {};
    const categories = Object.keys(currentMenu);

    return (
        <section id="dining" ref={sectionRef} className="py-16 md:py-32 px-4 bg-gradient-to-br from-gray-50 to-gray-200 transition-colors duration-500 relative overflow-hidden">
            {/* Dynamic Background Patterns */}
            <div className="absolute inset-0 z-0 opacity-10 animate-star-trail"></div>
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div>

            <div className="container mx-auto text-center relative z-10">
                {/* Hotel Logo and Title */}
                <div className={`mb-8 sm:mb-12 ${inView ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
                    <Hotel size={64} sm:size={80} className="mx-auto text-blue-600 animate-bounce-subtle" />
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 mt-3 sm:mt-4 font-display">
                        Oxbow Lake Dining
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-1 sm:mt-2 font-body">
                        A Culinary Journey Awaits You
                    </p>
                </div>

                {/* Step 1: Main Food/Drinks Category Selection */}
                {!selectedCategory && (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 max-w-4xl mx-auto ${inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
                        {/* Food Card */}
                        <div
                            onClick={() => handleCategorySelect('food')}
                            className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-xl border-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
                                bg-white text-gray-800 border-gray-200 hover:bg-blue-50
                                flex flex-col items-center justify-center card-magic-hover-alt`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
                            <Utensils size={56} sm:size={64} className="mb-3 sm:mb-4 text-blue-600 animate-bounce-icon-small relative z-10" />
                            <h3 className="text-2xl sm:text-3xl font-bold font-display relative z-10">Exquisite Food</h3>
                            <p className="text-base sm:text-lg mt-1 sm:mt-2 font-body relative z-10 text-gray-600">Savor a world of flavors.</p>
                            <ChevronRight size={28} sm:size={32} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse-right" />
                        </div>

                        {/* Drinks Card */}
                        <div
                            onClick={() => handleCategorySelect('drinks')}
                            className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-xl border-4 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl
                                bg-white text-gray-800 border-gray-200 hover:bg-blue-50
                                flex flex-col items-center justify-center card-magic-hover-alt`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
                            <Coffee size={56} sm:size={64} className="mb-3 sm:mb-4 text-blue-600 animate-bounce-icon-small relative z-10" />
                            <h3 className="text-2xl sm:text-3xl font-bold font-display relative z-10">Refreshing Drinks</h3>
                            <p className="text-base sm:text-lg mt-1 sm:mt-2 font-body relative z-10 text-gray-600">Quench your thirst with our finest.</p>
                            <ChevronRight size={28} sm:size={32} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse-right" />
                        </div>
                    </div>
                )}

                {/* Step 2: Branch Selection Buttons - only show if a category is selected */}
                {selectedCategory && !selectedBranch && (
                    <div className={`flex flex-col items-center animate-fade-in delay-100`}>
                        <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 font-display">
                            Select a Branch for {selectedCategory === 'food' ? 'Food' : 'Drinks'}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl w-full">
                            {/* Swali Branch Card */}
                            <button
                                onClick={() => openMenuModal('Swali')}
                                className="group relative overflow-hidden p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-purple-300 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
                                    bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto min-w-[180px] magic-btn-hover text-lg sm:text-xl font-semibold font-body"
                            >
                                <span className="relative z-10">Oxbow Lake Hotel</span>
                                <ChevronRight size={20} sm:size={24} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                            {/* Gbarantoru Branch Card */}
                            <button
                                onClick={() => openMenuModal('Gbarantoru')}
                                className="group relative overflow-hidden p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-purple-300 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
                                    bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto min-w-[180px] magic-btn-hover text-lg sm:text-xl font-semibold font-body"
                            >
                                <span className="relative z-10">Oxbow Apartments Gbarantoru</span>
                                <ChevronRight size={20} sm:size={24} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                        <button
                            onClick={() => setSelectedCategory(null)} // Go back to category selection
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 text-sm sm:text-base"
                        >
                            <ChevronLeft size={16} className="inline mr-2" /> Back to Categories
                        </button>
                    </div>
                )}
            </div>

            {/* Menu Modal */}
            {showMenuModal && selectedCategory && selectedBranch && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in-fast p-4 sm:p-6">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-xl md:max-w-4xl max-h-[95vh] overflow-y-auto relative border-4 border-blue-500 animate-scale-in-bounce">
                        <button
                            onClick={closeMenuModal}
                            style={{ backgroundColor: '#2563eb', color: 'white' }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-red-500 transition-colors duration-200 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-50"
                            title="Close Menu"
                        >
                            <X size={24} sm:size={28} />
                        </button>

                        {/* Modal Header */}
                        <div className="mb-6 sm:mb-8 text-center relative pb-3 sm:pb-4 border-b border-gray-200">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 font-display animate-text-reveal-gradient">
                                {selectedCategory === 'food' ? 'Food Menu' : 'Drinks Menu'}
                            </h3>
                            <p className="text-lg sm:text-xl text-gray-700 mt-1 sm:mt-2 font-body">
                                {selectedBranch == 'Swali' ? 'Oxbow Lake Hotel' : 'Oxbow Apartments Gbarantoru'}
                            </p>
                        </div>

                        {categories.length === 0 ? (
                            <p className="text-base sm:text-xl text-gray-600 py-8 sm:py-10 font-body text-center">
                                No items found for this selection.
                            </p>
                        ) : (
                            <div className="space-y-8 sm:space-y-10">
                                {categories.map((categoryName, catIndex) => (
                                    <div key={categoryName} className="animate-slide-in-up" style={{ animationDelay: `${0.1 + catIndex * 0.05}s` }}>
                                        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 font-display text-left flex items-center">
                                            <Star size={20} sm:size={24} className="mr-2 sm:mr-3 text-yellow-500 fill-current animate-bounce-icon-small" /> {categoryName}
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                                            {currentMenu[categoryName].map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex justify-between items-baseline p-3 sm:p-4 rounded-lg bg-gray-50 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md border border-gray-100 animate-pop-in-bounce"
                                                    style={{ animationDelay: `${0.2 + catIndex * 0.05 + itemIndex * 0.02}s` }}
                                                >
                                                    <span className="text-base sm:text-lg font-medium text-gray-700 font-body text-left">{item.name}</span>
                                                    <span className="text-lg sm:text-xl font-bold text-green-700 font-display">₦{item.price.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default DiningBar;
