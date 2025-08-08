import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Home, Info, Hotel, Utensils, Image, MessageCircle, Phone, Mail, MapPin, Calendar, Users,
    ChevronLeft, ChevronRight, Moon, Sun, Star, Newspaper, Linkedin, Facebook, Rss,
    ShoppingCart, BedSingle, LocateFixed, Car, Train, User, Plane, X
} from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import {toast, ToastContainer} from 'react-toastify';

// Preloader Component================================================================================================================================================
// export const Preloader = () => {
//     return (
//         <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-950 dark:from-gray-950 dark:to-black flex flex-col items-center justify-center z-50 transition-all duration-700">
//             <div className="relative w-40 h-40 mb-12 animate-preloader-container">
//                 <div className="absolute inset-0 border-4 border-blue-400 dark:border-blue-700 rounded-full animate-spin-slow-preloader opacity-80"></div>
//                 <div className="absolute inset-10 bg-blue-700 dark:bg-blue-800 rounded-full flex items-center justify-center shadow-2xl animate-pulse-scale">
//                     <Hotel size={64} className="text-white transform scale-110 animate-bounce-subtle" />
//                 </div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-24 h-24 rounded-full bg-blue-500 opacity-0 animate-preloader-ripple delay-500"></div>
//                     <div className="w-24 h-24 rounded-full bg-blue-500 opacity-0 animate-preloader-ripple delay-1000"></div>
//                 </div>
//             </div>
//             <h1 className="text-white text-6xl sm:text-7xl font-extrabold animate-pulse-fade drop-shadow-lg tracking-wider font-display">Oxbow Lake Hotel</h1>
//             <p className="text-blue-200 dark:text-blue-400 mt-5 text-xl sm:text-2xl font-medium animate-slide-in-up delay-400 font-body">Unveiling your luxurious escape...</p>
//         </div>
//     );
// };
// PRELOADER COMPONENT ================================================================================================================================================



// Hotel Locations Map Component: Creative, animated journey visualization================================================================================================================================================
export const HotelLocationsMap = ({ onSkipToMain }) => {
    const [animationActive, setAnimationActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationActive(true);
        }, 500); // Activate animations after a short delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center z-40 transition-all duration-700 p-4 sm:p-8 md:p-12 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-5xl w-full text-center border border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-8 leading-tight animate-slide-in-up font-display">
                    Your Journey to Oxbow Hotel
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto animate-slide-in-up delay-200 font-body">
                    Experience seamless travel to our magnificent branches.
                </p>

                {/* Animated Journey Visualization */}
                <div className="relative w-full max-w-2xl aspect-video mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl overflow-hidden shadow-inner mb-10 border-4 border-blue-200 dark:border-blue-700">
                    {/* Pulsating Nodes for Branches */}
                    <div className={`absolute top-[20%] left-[25%] flex flex-col items-center z-10 text-white ${animationActive ? 'animate-glow-pulse' : 'opacity-0'}`}>
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-xl transform scale-0 animate-pop-in-bounce delay-500">
                            <Hotel size={32} className="text-white" />
                        </div>
                        <span className="text-xl font-bold bg-black bg-opacity-70 rounded-md px-3 py-1 mt-2 animate-fade-in delay-600 font-body">Swali Branch</span>
                    </div>

                    <div className={`absolute bottom-[20%] right-[25%] flex flex-col items-center z-10 text-white ${animationActive ? 'animate-glow-pulse delay-200' : 'opacity-0'}`}>
                        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-xl transform scale-0 animate-pop-in-bounce delay-700">
                            <Hotel size={32} className="text-white" />
                        </div>
                        <span className="text-xl font-bold bg-black bg-opacity-70 rounded-md px-3 py-1 mt-2 animate-fade-in delay-800 font-body">Gbarantoru Branch</span>
                    </div>

                    {/* Animated Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 28 25 C 40 10, 60 90, 72 75"
                            stroke="url(#gradientLine)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="1000"
                            className={`${animationActive ? 'animate-draw-path' : 'opacity-0'}`}
                        />
                        <defs>
                            <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3B82F6" /> {/* Blue */}
                                <stop offset="50%" stopColor="#8B5CF6" /> {/* Purple */}
                                <stop offset="100%" stopColor="#EC4899" /> {/* Pink */}
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Travel Icons moving along paths */}
                    <div className={`absolute top-[40%] left-[40%] text-white text-sm font-semibold animate-move-icon-1 delay-1000 ${animationActive ? 'opacity-100' : 'opacity-0'}`}><Car size={36} className="text-green-400" /></div>
                    <div className={`absolute top-[50%] left-[50%] text-white text-sm font-semibold animate-move-icon-2 delay-1500 ${animationActive ? 'opacity-100' : 'opacity-0'}`}><Train size={36} className="text-yellow-400" /></div>
                    <div className={`absolute top-[60%] left-[60%] text-white text-sm font-semibold animate-move-icon-3 delay-2000 ${animationActive ? 'opacity-100' : 'opacity-0'}`}><Plane size={36} className="text-blue-400" /></div>

                </div>

                <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 mb-8 animate-slide-in-up delay-1100 font-body">
                    We ensure a comfortable journey. For detailed directions and transport information, please visit our Contact page.
                </p>

                <button
                    onClick={onSkipToMain}
                    className="btn-primary px-10 py-4 text-xl sm:text-2xl font-bold animate-pulse-button animate-slide-in-up delay-1200 group relative overflow-hidden magic-btn-hover"
                >
                    <span className="relative z-10">Enter Oxbow Lake Hotel Experience</span>
                </button>
            </div>
        </div>
    );
};
// HOTEL LOCATION MAP COMPONENT ================================================================================================================================================



// Hero Section with Image Carousel================================================================================================================================================
export const Hero = ({ scrollToSection }) => {
    const sliderImages = [
        'https://i.postimg.cc/fW7LPfsS/IMG-8630-HEIC.jpg',
        'https://i.postimg.cc/xC071Qk2/IMG-8621-HEIC.jpg',
        'https://i.postimg.cc/tR5YvNdv/IMG-8627-HEIC.jpg'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroRef = useRef(null);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    // Handle mouse movement for parallax
    // const handleMouseMove = useCallback((e) => {
    //     if (!heroRef.current) return;
    //     const { clientX, clientY } = e;
    //     const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    //     const x = (clientX - (left + width / 2)) / (width / 2);
    //     const y = (clientY - (top + height / 2)) / (height / 2);
    //     setMouseOffset({ x, y });
    // }, []);

    // // Add and remove mouse move listener
    // useEffect(() => {
    //     const currentHeroRef = heroRef.current;
    //     if (currentHeroRef) {
    //         currentHeroRef.addEventListener('mousemove', handleMouseMove);
    //     }
    //     return () => {
    //         if (currentHeroRef) {
    //             currentHeroRef.removeEventListener('mousemove', handleMouseMove);
    //         }
    //     };
    // }, [handleMouseMove]);

    // Auto-slide images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
        }, 6000); // Change every 6 seconds
        return () => clearInterval(interval);
    }, []);

    // Manual navigation
    const goToPrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    };

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative h-screen flex items-center justify-center text-center p-4 overflow-hidden"
        >
            {/* Background Image (Slider) */}
            <img
                src={sliderImages[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/1920x1080/CCCCCC/333333?text=Image+Error';
                }}
            />

            {/* Gradient and overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-pink-900/60"></div>
            <div className="absolute inset-0 z-0 opacity-20 animate-bg-sparkle"></div>
            <div className="absolute inset-0 z-0 opacity-10 animate-star-trail"></div>

            {/* Navigation Arrows */}
            <button
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                onClick={goToPrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full shadow-md"
                aria-label="Previous Image"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={goToNextImage}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full shadow-md"
                aria-label="Next Image"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Text Content Overlay */}
            <div
                className="relative z-10 max-w-full sm:max-w-5xl mx-auto px-4"
                style={{
                    transform: `translate(${mouseOffset.x * 20}px, ${mouseOffset.y * 20}px)`
                }}
            >
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg font-display"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                >
                    Welcome to Oxbow Lake Hotels & Oxbow Apartments Gbarantoru
                </h1>
                <p className="text-lg sm:text-2xl md:text-3xl mb-8 sm:mb-10 text-gray-200 animate-slide-in-up delay-200 font-body"
                    style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}
                >
                    Where Hospitality Meets Professionalism.
                </p>
                <button
                    onClick={() => scrollToSection('booking')}
                    className="btn-primary px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl animate-scale-up delay-400 group relative overflow-hidden magic-btn-hover"
                >
                    <span className="relative z-10">Book Your Dream Stay</span>
                </button>
            </div>
        </section>
    );
};
// HERO SECTION ================================================================================================================================================



// About Card Component================================================================================================================================================
const AboutCard = ({ icon, title, description, inView, delay }) => (
    <div className={`p-6 sm:p-8 md:p-10 bg-blue-50/70 dark:bg-gray-800/70 rounded-2xl shadow-xl text-blue-800 dark:text-blue-300 flex flex-col items-center transform transition duration-300 group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${delay}` : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
        <div className="mb-4 sm:mb-5 text-blue-600 dark:text-blue-400 relative z-10 animate-bounce-icon">
            {/* Using larger icon sizes as previously defined for better visual impact */}
            {React.cloneElement(icon, { size: 48, className: icon.props.className + ' sm:size-56' })}
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white text-center font-display relative z-10">{title}</h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 text-center font-body relative z-10">{description}</p>
    </div>
);
// ABOUT CARD COMPONENT ================================================================================================================================================



// About Us Section================================================================================================================================================
export const AboutUs = () => {
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
            { threshold: 0.2 }
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

    return (
        <section id="about" ref={sectionRef} className="py-16 md:py-32 px-4 bg-white dark:bg-gray-900 transition-colors duration-500 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div>
            <div className="container mx-auto text-center max-w-6xl"> {/* Adjusted to max-w-6xl as per your snippet */}
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 section-header text-blue-800 dark:text-blue-400 ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    About Oxbow Lake Hotel & Apartments Gbarantoru
                </h2>
                <p className={`text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 ${inView ? 'animate-slide-in-up delay-200' : 'opacity-0'} font-body`}>
                    <span className="font-bold text-blue-700 dark:text-blue-400">Oxbow Lake Hotel</span><br/>
                    Situated in the heart of Yenagoa, Oxbow Lake Hotel is a premium hospitality destination designed for comfort, class, and convenience. The hotel blends modern architecture with warm Bayelsan charm to deliver an exceptional guest experience.
                    Whether you’re in town for business, travel, or celebration, our hotel offers fully equipped luxurious rooms, fine dining options, meeting spaces, and personalized services. From sunrise to sunsets, every moment is tailored to leave a lasting impression.
                </p>
                <p className={`text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 ${inView ? 'animate-slide-in-up delay-300' : 'opacity-0'} font-body`}>
                    <span className="font-bold text-blue-700 dark:text-blue-400">Oxbow Lake Apartments Gbarantoru</span><br/>
                    Just a few minutes from the hotel, nestled in the serene neighborhood of Gbarantoru, you’ll find Oxbow Apartments, a perfect long-stay retreat for guests who desire home-style living with hotel-level service.
                    Each apartment is thoughtfully furnished with modern décor, private kitchens, spacious living areas, and 24/7 concierge support. Ideal for business travelers, families, and guests seeking extended stays, Oxbow Apartments offer a quiet and secure environment that feels just like home — only better.
                </p>
                <p className={`text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-10 sm:mb-12 ${inView ? 'animate-slide-in-up delay-400' : 'opacity-0'} font-body`}>
                    <span className="font-bold text-blue-700 dark:text-blue-400">Two Locations, One Standard of Excellence</span><br/>
                    Whether you stay at our hotel or in our fully serviced apartments, you’re guaranteed unmatched comfort, outstanding hospitality, and a taste of Yenagoa’s finest.
                </p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-800 dark:text-blue-400 mb-10 sm:mb-12 ${inView ? 'animate-slide-in-up delay-500' : 'opacity-0'} font-display`}>
                    Where Hospitality Meets Professionalism.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mt-12 sm:mt-16"> {/* Increased gap and top margin for better separation */}
                </div>
            </div>
        </section>
    );
};
// ABOUT SECTION ================================================================================================================================================



// Booking Form Section================================================================================================================================================
export const BookingForm = ({ onSubmitBooking }) => { // Added onSubmitBooking prop
    const [branch, setBranch] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomNumber, setRoomNumber] = useState(''); // Added roomNumber state
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [paymentData, setPaymentData] = useState({});

    const [availabilityCheck, setAvailabilityCheck] = useState({
        name: '',
        email: '',
        check_in: '',
        check_out: '',
        branch: '',
        type: ''
    });

    function handleChange(e){
        const {name, value} = e.target;

        setAvailabilityCheck((prev) =>{
            return {...prev, [name]:value}
        });
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
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

    // Define room types available for each branch
    const branchRoomTypes = {
        Swali: [
            { value: 'Standard', label: 'Standard Room' },
            { value: 'Deluxe', label: 'Deluxe Room' },
            { value: 'Premium', label: 'Premium Suite' },
            { value: 'Luxury Suite', label: 'Luxury Suite' },
        ],
        Gbarantoru: [
            { value: 'Apartment', label: 'Apartment' },
            { value: 'Suites', label: 'Suite' },
            { value: 'Executive Room', label: 'Executive Room' },
            { value: 'Standard', label: 'Standard' },
        ],
    };

    // Filtered room types based on selected branch
    const availableRoomTypes = availabilityCheck.branch ? branchRoomTypes[availabilityCheck.branch] : [];

    // Reset roomType and roomNumber when branch changes
    useEffect(() => {
        setRoomType('');
        setRoomNumber('');
    }, [availabilityCheck.branch]);


    const handleCheckAvailability = (e) => {
        e.preventDefault();
        if (!availabilityCheck.branch || !availabilityCheck.type || !availabilityCheck.check_in || !availabilityCheck.check_out || !availabilityCheck.name || !availabilityCheck.email) {
            setMessage('Please fill in all booking details to check availability.');
            setMessageType('error');
            setShowConfetti(false);
            return;
        }

        axiosClient.post('/check/room/availability', availabilityCheck)
        .then(({data})=>{
            console.log(data);
            setMessage(`Thank you! We've checked availability for ${availabilityCheck.type} at ${availabilityCheck.branch} from ${availabilityCheck.check_in} to ${availabilityCheck.check_out} is available.`);
            setMessageType('success');
            setShowConfetti(true); // Trigger confetti on success

            localStorage.setItem('availabilityCheckResult', JSON.stringify(data));
            setPaymentData(data);

            if (onSubmitBooking) {
                onSubmitBooking(paymentData);
            }

            setTimeout(() => {
                setMessage('');
                setShowConfetti(false); // Hide confetti
            }, 3000); // Increased time for message and confetti
        })
        .catch((error) => {
            console.log(error);
            const err = error.response;

            toast(err.data.message);
        })
    };

    return (
        <section id="booking" ref={sectionRef} className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div>
            <div className={`max-w-4xl mx-auto bg-white/80 dark:bg-gray-900/80 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 style={{ color: '#2563eb' }} className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-blue-800 dark:text-blue-400 font-display">Seamlessly Book Your Stay</h2>
                <form onSubmit={handleCheckAvailability} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-end">
                    {/* Branch select */}
                    <div className={inView ? 'animate-slide-in-up delay-200' : 'opacity-0'}>
                        <label htmlFor="branch" className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium font-body">
                            <LocateFixed className="mr-2" size={16} />
                            Select Branch
                        </label>
                        <select
                            name="branch"
                            value={availabilityCheck.branch}
                            onChange={handleChange}
                            className="w-full px-4 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-sm font-body"
                            required
                        >
                            <option value="">Choose Your Preferred Location</option>
                            <option value="Swali">Oxbow Lake Hotel</option>
                            <option value="Gbarantoru">Oxbow Apartments Gbarantoru</option>
                        </select>
                    </div>
                    {/* Room Type select */}
                    <div className={inView ? 'animate-slide-in-up delay-300' : 'opacity-0'}>
                        <label htmlFor="type" className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium font-body">
                            <BedSingle className="mr-2" size={16} />
                            Select Room Type
                        </label>
                        <select
                            name="type"
                            value={availabilityCheck.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-sm font-body"
                            required
                            disabled={!availabilityCheck.branch}
                        >
                            <option value="">Choose Your Desired Accommodation</option>
                            {availableRoomTypes.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Check-in date */}
                    <div className={inView ? 'animate-slide-in-up delay-400' : 'opacity-0'}>
                        <label htmlFor="check_in" className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium font-body">
                            <Calendar className="mr-2" size={16} />
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            name="check_in"
                            value={availabilityCheck.check_in}
                            onChange={handleChange}
                            className="w-full px-4 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-sm font-body"
                            required
                        />
                    </div>
                    {/* Check-out date */}
                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="check_out" className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium font-body">
                            <Calendar className="mr-2" size={16} />
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            name="check_out"
                            value={availabilityCheck.check_out}
                            onChange={handleChange}
                            className="w-full px-4 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-sm font-body"
                            required
                        />
                    </div>

                    {/* NAME */}
                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="name" className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium font-body">
                            <User size={20} className="mr-2" />
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={availabilityCheck.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-sm font-body"
                            required
                        />
                    </div>

                    {/* EMAIL */}
                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="email" className="flex items-center mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium font-body">
                            <Mail size={20} className="mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={availabilityCheck.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-sm font-body"
                            required
                        />
                    </div>
                    
                    {/* Submit button */}
                    <div className={`md:col-span-2 flex justify-center mt-4 ${inView ? 'animate-slide-in-up delay-600' : 'opacity-0'}`}>
                        <button
                            type="submit"
                            style={{ backgroundColor: '#2563eb', color: 'white' }}
                            className="w-full md:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 active:scale-95"
                        >
                            Check Availability
                        </button>
                    </div>
                </form>
                {message && (
                    <div className={`mt-6 p-4 sm:p-6 rounded-lg text-center font-medium ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                        {showConfetti && <div className="absolute inset-0 z-20 animate-confetti-burst"></div>}
                    </div>
                )}
            </div>
        </section>
    );
};
// BOOKING SECTION ================================================================================================================================================




// Room Card Component ==================================================================================================================================================================================================================================================================================================================
// const RoomCard = ({ room, inView, delay, openRoomModal  }) => (
//     <div className={`card bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl text-blue-800 dark:text-blue-300 flex flex-col transform transition duration-300 group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${delay}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
//         <div className="overflow-hidden rounded-t-xl">
//             <img src={room.imageUrl} alt={room.type} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl" />
//         </div>
//         <div className="p-8 text-left relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
//             <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 font-display relative z-10">{room.type}</h3>
//             <p className="text-gray-600 dark:text-gray-300 mb-5 text-md leading-relaxed font-body relative z-10">{room.description}</p>
//             <div className="flex justify-between items-center mb-6 relative z-10">
//                 <p className="text-blue-600 dark:text-blue-400 text-2xl font-extrabold font-display">₦{room.price.toLocaleString()}</p>
//             </div>
//             <button  onClick={() => openRoomModal(room)} className="btn-primary text-lg w-full py-3 group relative overflow-hidden magic-btn-hover">
//                 <span className="relative z-10">Explore Room</span>
//             </button>
//         </div>
//     </div>
// );
// ROOM CARD COMPONENT ENDS HERE ============================================================================================================================================================================================================================================================================================================================


// NEW ROOMS COMPONENT PLACED BETWEEN=======================================================================================================================================
// NEW ROOMS COMPONENT PLACED BETWEEN=======================================================================================================================================
export const Rooms = ({ openRoomModal }) => { // openRoomModal is a prop from App.jsx
    const [selectedBranch, setSelectedBranch] = useState('');
    const [showRooms, setShowRooms] = useState(false);
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    useEffect(()=>{
        axiosClient.get(`/rooms/branch/${selectedBranch}`)
        .then(({data})=>{
            console.log(data);
            setRoomData(data);
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [selectedBranch])

    const handleBranchChange = (e) => {
        const branch = e.target.value;
        setSelectedBranch(branch);
        setShowRooms(!!branch);
    };

    const sortedRooms = selectedBranch ? roomData : [];

    const RoomCard = ({ room, inView, delay }) => {
        return (
            <div
                className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl ${inView ? `animate-fade-in delay-${delay}` : 'opacity-0'}`}
            >
                <div className="relative overflow-hidden h-56 sm:h-64">
                    <img
                        src={room.imageUrl}
                        alt={room.type}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/E5E7EB/9CA3AF?text=Image+Not+Found"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <span className="text-white text-lg sm:text-xl font-bold font-display">
                            ₦{room.price.toLocaleString()} / night
                        </span>
                    </div>
                </div>
                <div className="p-6 sm:p-8 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-400 mb-2 font-display">{room.type}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base font-body mb-4">{room.description}</p>
                    <button
                        className="btn-primary text-base sm:text-lg w-full group relative overflow-hidden magic-btn-hover"
                        onClick={() => openRoomModal(room)} // This button opens the modal!
                    >
                        <span className="relative z-10">Explore Room</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section
            id="rooms"
            ref={sectionRef}
            className="py-16 md:py-32 px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div>
            <div className="container mx-auto text-center max-w-7xl">
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 text-blue-800 dark:text-blue-400 ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    Our Exquisite Rooms & Suites
                </h2>
                <div className={`flex justify-center mb-8 sm:mb-12 ${inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
                    <label htmlFor="branch-select" className="sr-only">Select Branch</label>
                    <select
                        id="branch-select"
                        value={selectedBranch}
                        onChange={handleBranchChange}
                        className="px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-semibold bg-blue-600 text-white shadow-xl ring-2 ring-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:ring-blue-500 dark:hover:bg-blue-800 font-body"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%23ffffff' class='w-6 h-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.5em',
                            paddingRight: '3rem',
                        }}
                    >
                        <option value="">Select a Branch to View Rooms</option>
                        <option value="Swali">Oxbow Lake Hotel</option>
                        <option value="Gbarantoru">Oxbow Apartments Gbarantoru</option>
                    </select>
                </div>

                {showRooms && selectedBranch ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 animate-fade-in">
                        {sortedRooms.map((room, index) => (
                            <RoomCard key={room.name} room={room} inView={inView} delay={index * 100} openRoomModal={openRoomModal} />
                        ))}
                    </div>
                ) : (
                    <div className={`mt-10 p-8 bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700 dark:text-blue-300 font-display">
                            Please select a branch from the dropdown above to explore our exquisite rooms and suites.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 font-body">
                            Each location offers a unique experience tailored to your comfort.
                        </p>
                    </div>
                )}

                {/* {showRooms && selectedBranch && (
                    <div className={`mt-12 sm:mt-16 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'}`}>
                        <button className="btn-primary text-base sm:text-lg md:text-xl group relative overflow-hidden magic-btn-hover">
                            <span className="relative z-10">View All Accommodations</span>
                        </button>
                    </div>
                )} */}

            </div>
        </section>
    );
};
// NEW ROOMS COMPONENT PLACED BETWEEN=======================================================================================================================================
// NEW ROOMS COMPONENT PLACED BETWEEN=======================================================================================================================================


// Rooms Section=============================================================================================================
// export const Rooms = () => {

//     const [selectedBranch, setSelectedBranch] = useState(''); // Initialize as empty
//     const [showRooms, setShowRooms] = useState(false); // New state to control visibility
//     const sectionRef = useRef(null);
//     const [inView, setInView] = useState(false);
//     const [roomData, setRoomData] = useState([]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(([entry]) => {
//             if (entry.isIntersecting) {
//                 setInView(true);
//                 observer.disconnect();
//             }
//         }, { threshold: 0.1 });
//         if (sectionRef.current) observer.observe(sectionRef.current);
//         return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
//     }, []);

//     useEffect(()=>{
//         axiosClient.get(`/rooms/branch/${selectedBranch}`)
//         .then(({data})=>{
//             console.log(data);
//             setRoomData(data);
//         })
//         .catch((error) =>{
//             console.log(error);
//         })
//     }, [selectedBranch])

//     // Handle dropdown change
//     const handleBranchChange = (e) => {
//         const branch = e.target.value;
//         setSelectedBranch(branch);
//         if (branch) { // Only show rooms if a branch is actually selected
//             setShowRooms(true);
//         } else {
//             setShowRooms(false); // Hide rooms if "Select a branch" is chosen (the initial empty option)
//         }
//     };

//     // Sort rooms by price
//     // const sortedRooms = selectedBranch
//     //     ? [...roomData[selectedBranch]].sort((a, b) => a.price - b.price)
//     //     : []; // Return empty array if no branch is selected

//     const sortedRooms = selectedBranch ? roomData : []; // Return empty array if no branch is selected

//     return (
//         <section
//             id="rooms"
//             ref={sectionRef}
//             className="py-16 md:py-32 px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden"
//         >
//             <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div>
//             <div className="container mx-auto text-center max-w-7xl">
//                 <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 text-blue-800 dark:text-blue-400 ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
//                     Our Exquisite Rooms & Suites
//                 </h2>
//                 {/* Dropdown for Branch Selection */}
//                 <div className={`flex justify-center mb-8 sm:mb-12 ${inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
//                     <label htmlFor="branch-select" className="sr-only">Select Branch</label>

//                     <select
//                         id="branch-select"
//                         value={selectedBranch}
//                         onChange={handleBranchChange}
//                         className="px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-semibold bg-blue-600 text-white shadow-xl ring-2 ring-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:ring-blue-500 dark:hover:bg-blue-800 font-body"
//                         style={{
//                             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%23ffffff' class='w-6 h-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
//                             backgroundRepeat: 'no-repeat',
//                             backgroundPosition: 'right 1rem center',
//                             backgroundSize: '1.5em',
//                             paddingRight: '3rem', // Make space for the custom arrow
//                         }}
//                     >
//                         <option value="">Select a Branch to View Rooms</option> {/* Initial empty option */}
//                         <option value="Swali">Oxbow Lake Hotel</option>
//                         <option value="Gbarantoru">Oxbow Apartments Gbarantoru</option>
//                     </select>
//                 </div>

//                 {/* Conditional rendering for rooms or introductory message */}
//                 {showRooms && selectedBranch ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 animate-fade-in"> {/* Added animate-fade-in */}
//                         {sortedRooms.map((room, index) => (
//                             <RoomCard key={room.name} room={room} inView={inView} delay={index * 100} /> // Using room.name as key
//                         ))}
//                     </div>
//                 ) : (
//                     <div className={`mt-10 p-8 bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
//                         <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700 dark:text-blue-300 font-display">
//                             Please select a branch from the dropdown above to explore our exquisite rooms and suites.
//                         </p>
//                         <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 font-body">
//                             Each location offers a unique experience tailored to your comfort.
//                         </p>
//                     </div>
//                 )}

//                 {/* View all button (conditionally rendered only if rooms are shown) */}
//                 {showRooms && selectedBranch && (
//                     <div className={`mt-12 sm:mt-16 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'}`}>
//                         <button className="btn-primary text-base sm:text-lg md:text-xl group relative overflow-hidden magic-btn-hover">
//                             <span className="relative z-10">View All Accommodations</span>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };
// END OF ROOM SECTION =========================================================================================================================================



// NEW GALLERY SECTION ==========================================================================================================================================
// export const Gallery = () => {
//   const sectionRef = useRef(null);
//   const [inView, setInView] = useState(false);
//   const [viewMode, setViewMode] = useState("initial");
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [selectedBranchImages, setSelectedBranchImages] = useState([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [currentBranchName, setCurrentBranchName] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Intersection Observer Animation Trigger
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Fetch images from Laravel backend
//   const fetchGallery = async (branch) => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get(`/user/gallery/${branch}`);
//       setSelectedBranchImages(data); // Backend should return [{ src, alt }]
//       setCurrentBranchName(branch);
//       setViewMode("image_grid");
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching gallery images");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openLightbox = (index) => {
//     setSelectedImageIndex(index);
//     setLightboxOpen(true);
//     setViewMode("lightbox");
//     document.body.style.overflow = "hidden";
//   };

//   const closeLightbox = () => {
//     setLightboxOpen(false);
//     setViewMode("branch_selection");
//     document.body.style.overflow = "";
//   };

//   const navigateLightbox = (direction) => {
//     const totalImages = selectedBranchImages.length;
//     if (totalImages === 0) return;
//     const newIndex = (selectedImageIndex + direction + totalImages) % totalImages;
//     setSelectedImageIndex(newIndex);
//   };

//   return (
//     <section
//       id="gallery"
//       ref={sectionRef}
//       className="py-16 md:py-32 px-4 bg-white transition-colors duration-500 relative overflow-hidden"
//     >
//       <div className="container mx-auto text-center max-w-5xl">
//         <h2
//           className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-blue-800 dark:text-blue-400 font-display"
//         >
//           Gallery
//         </h2>

//         {viewMode === "initial" && (
//           <div className={inView ? "animate-fade-in delay-200" : "opacity-0"}>
//             <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 sm:mb-12">
//               Explore the visual journey through our exquisite properties.
//             </p>
//             <button
//               onClick={() => setViewMode("branch_selection")}
//               className="btn-primary mt-4 sm:mt-6 text-base sm:text-lg md:text-xl"
//             >
//               View Our Gallery
//             </button>
//           </div>
//         )}

//         {viewMode === "branch_selection" && (
//           <div
//             className={`flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 ${
//               inView ? "animate-fade-in delay-200" : "opacity-0"
//             }`}
//           >
//             <button
//               onClick={() => fetchGallery("Swali")}
//               className="btn-primary flex-1 px-8 py-4 text-base sm:text-lg md:text-xl"
//             >
//               Oxbow Lake Hotel Swali
//             </button>
//             <button
//               onClick={() => fetchGallery("Gbarantoru")}
//               className="btn-primary flex-1 px-8 py-4 text-base sm:text-lg md:text-xl"
//             >
//               Oxbow Apartments Gbarantoru
//             </button>
//             <button
//               onClick={() => setViewMode("initial")}
//               style={{ backgroundColor: '#2563eb', color: 'white' }}
//               className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full"
//             >
//               <X size={16} className="inline mr-2" /> Exit Gallery
//             </button>
//           </div>
//         )}

//         {viewMode === "image_grid" && (
//           <>
//             {loading ? (
//               <p className="text-gray-500">Loading images...</p>
//             ) : (
//               <div
//                 className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 ${
//                   inView ? "animate-fade-in delay-300" : "opacity-0"
//                 }`}
//               >
//                 {selectedBranchImages.map((img, i) => (
//                   <div
//                     key={i}
//                     className="bg-gray-200 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
//                     onClick={() => openLightbox(i)}
//                   >
//                     <img
//                       src={img.url}
//                       alt={img.alt}
//                       className="w-full h-32 sm:h-40 md:h-48 object-cover"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "https://placehold.co/400x300/CCCCCC/333333?text=Image+Error";
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 onClick={() => setViewMode("branch_selection")}
//                 style={{ backgroundColor: '#2563eb', color: 'white' }}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-full"
//               >
//                 <ChevronLeft size={16} className="inline mr-2" /> Back
//               </button>
//               <button
//                 onClick={() => setViewMode("initial")}
//                 style={{ backgroundColor: '#2563eb', color: 'white' }}
//                 className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full"
//               >
//                 <X size={16} className="inline mr-2" /> Exit Gallery
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Lightbox */}
//       {lightboxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//           <button
//             onClick={closeLightbox}
//             className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50"
//           >
//             <X size={32} />
//           </button>
//           <button
//             onClick={() => navigateLightbox(-1)}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50"
//           >
//             <ChevronLeft size={32} />
//           </button>
//           <button
//             onClick={() => navigateLightbox(1)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50"
//           >
//             <ChevronRight size={32} />
//           </button>
//           <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center">
//             <img
//               key={selectedBranchImages[selectedImageIndex]?.src}
//               src={selectedBranchImages[selectedImageIndex]?.url}
//               alt={selectedBranchImages[selectedImageIndex]?.alt}
//               className="max-w-full max-h-[85vh] object-contain rounded-lg"
//             />
//             <p className="absolute bottom-4 bg-black/70 text-white px-4 py-2 rounded-md">
//               {selectedBranchImages[selectedImageIndex]?.alt}
//             </p>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

export const Gallery = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [viewMode, setViewMode] = useState("initial");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedBranchImages, setSelectedBranchImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Intersection Observer Animation Trigger
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Fetch images from Laravel backend
  const fetchGallery = async (branch) => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get(`/user/gallery/${branch}`);
      setSelectedBranchImages(data); // backend returns [{ url, alt }]
      setViewMode("image_grid");
    } catch (error) {
      console.error(error);
      alert("Error fetching gallery images");
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    setViewMode("lightbox");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setViewMode("branch_selection");
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction) => {
    const totalImages = selectedBranchImages.length;
    if (totalImages === 0) return;
    setSelectedImageIndex(
      (selectedImageIndex + direction + totalImages) % totalImages
    );
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 md:py-32 px-4 bg-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="container mx-auto text-center max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-blue-800 dark:text-blue-400 font-display">
          Gallery
        </h2>

        {/* Initial View */}
        {viewMode === "initial" && (
          <div className={inView ? "animate-fade-in delay-200" : "opacity-0"}>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 sm:mb-12">
              Explore the visual journey through our exquisite properties.
            </p>
            <button
              onClick={() => setViewMode("branch_selection")}
              className="btn-primary mt-4 sm:mt-6 text-base sm:text-lg md:text-xl"
            >
              View Our Gallery
            </button>
          </div>
        )}

        {/* Branch Selection */}
        {viewMode === "branch_selection" && (
          <div
            className={`flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 ${
              inView ? "animate-fade-in delay-200" : "opacity-0"
            }`}
          >
            <button
              onClick={() => fetchGallery("Swali")}
              className="btn-primary flex-1 px-8 py-4 text-base sm:text-lg md:text-xl"
            >
              Oxbow Lake Hotel
            </button>
            <button
              onClick={() => fetchGallery("Gbarantoru")}
              className="btn-primary flex-1 px-8 py-4 text-base sm:text-lg md:text-xl"
            >
              Oxbow Apartments Gbarantoru
            </button>
            <button
              onClick={() => setViewMode("initial")}
              style={{ backgroundColor: '#2563eb', color: 'white' }}
              className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full flex items-center justify-center"
            >
              <X size={16} className="mr-2" /> Exit Gallery
            </button>
          </div>
        )}

        {/* Image Grid */}
        {viewMode === "image_grid" && (
          <>
            {loading ? (
              <p className="text-gray-500">Loading images...</p>
            ) : (
              <div
                className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 ${
                  inView ? "animate-fade-in delay-300" : "opacity-0"
                }`}
              >
                {selectedBranchImages.map((img, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x300/CCCCCC/333333?text=Image+Error";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setViewMode("branch_selection")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-full flex items-center"
              >
                <ChevronLeft size={16} className="mr-2" /> Back
              </button>
              <button
                onClick={() => setViewMode("initial")}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full flex items-center"
              >
                <X size={16} className="mr-2" /> Exit Gallery
              </button>
            </div>
          </>
        )}
      </div>

      {/* Lightbox with Next/Prev always visible */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ backgroundColor: '#2563eb', color: 'white' }}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
          >
            <X size={32} />
          </button>

          {/* Prev */}
          <button
            onClick={() => navigateLightbox(-1)}
            style={{ backgroundColor: '#2563eb', color: 'white' }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center">
            <img
              src={selectedBranchImages[selectedImageIndex]?.url}
              alt={selectedBranchImages[selectedImageIndex]?.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <p className="absolute bottom-4 bg-black/70 text-white px-4 py-2 rounded-md">
              {selectedBranchImages[selectedImageIndex]?.alt}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={() => navigateLightbox(1)}
            style={{ backgroundColor: '#2563eb', color: 'white' }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
};

// END OF NEW GALLERY SECTION =====================================================================================================================================





// Blog Section==============================================================================================================================================
export const Blog = () => {
    const blogPost = [
        {
            title: 'Top 5 Reasons to Stay at Oxbow Lake Hotel',
            date: 'June 20, 2025',
            excerpt: 'Discover why our guests keep coming back for more. From luxurious amenities to unparalleled service, we offer an experience like no other.',
            image: 'https://i.postimg.cc/fW7LPfsS/IMG-8630-HEIC.jpgtext=Hotel+Insights',
            link: '#'
        },
        {
            title: 'A Culinary Journey at Our Restaurants',
            date: 'June 15, 2025',
            excerpt: 'Explore the diverse flavors and exquisite dishes crafted by our award-winning chefs. A true gastronomic delight awaits you.',
            image: 'https://i.postimg.cc/6qTGw7tG/IMG-8578-HEIC.jpg',
            link: '#'
        },
        {
            title: 'Cool and Pure Swimming pool',
            date: 'June 10, 2025',
            excerpt: 'Indulge in a world of relaxation and rejuvenation. Our swimming pool treatments are designed to soothe your mind, body, and soul.',
            image: 'https://i.postimg.cc/1zrQRJ3L/IMG-8598-HEIC.jpg',
            link: '#'
        },
        {
            title: 'Adventure Awaits: Exploring Oxbow Lake',
            date: 'June 5, 2025',
            excerpt: 'Beyond the hotel, discover thrilling activities and serene natural beauty around Oxbow Lake. Perfect for nature lovers.',
            image: 'https://i.postimg.cc/FFPRmsfh/IMG-8585-HEIC.jpg',
            link: '#'
        },
    ];

    const [blogPosts, setBlogPosts] = useState(blogPost);

    useEffect(()=>{
        axiosClient.get('/user/blogs/index')
        .then(({data})=>{
            setBlogPosts(data)
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [])

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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

    return (
        <section id="blog" ref={sectionRef} className="py-12 md:py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-500 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
                <div className="container mx-auto text-center max-w-6xl">
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-8 md:mb-12 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                        From Our Blog: Latest Insights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {blogPosts.map((post, index) => (
                            <div key={index} className={`card bg-gray-50/70 dark:bg-gray-800/70 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border-2 border-transparent group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${index * 100}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
                                <div className="overflow-hidden rounded-t-xl">
                                    <img src={post.imageUrl} alt={post.title} className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl" />
                                </div>
                                <div className="p-4 md:p-6 text-left relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 md:mb-2 leading-tight font-display relative z-10">{post.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-3 font-body relative z-10">{post.date}</p>
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-5 line-clamp-3 font-body relative z-10">{post.excerpt}</p>
                                    {/* Changed <a> to <button> to trigger modal */}
                                    <button
                                        onClick={() => setSelectedPost(post)}
                                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm md:text-base transition-colors duration-300 group-hover:text-accent-500 font-body relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                                    >
                                        Read More <ChevronRight size={16} className="ml-1 group-hover:animate-pulse-right" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className={`mt-10 md:mt-16 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'}`}>
                        <button className="btn-primary text-base md:text-xl group relative overflow-hidden magic-btn-hover py-3 px-6 md:py-4 md:px-10">
                            <span className="relative z-10">Discover More Articles</span>
                        </button>
                    </div> */}
                    
                </div>
    
                {/* Modal for displaying full blog post details */}
                {selectedPost && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedPost(null)} // Close modal when clicking outside
                        aria-modal="true"
                        role="dialog"
                    >
                        <div
                            className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 relative w-full max-w-xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedPost(null)}
                                style={{ backgroundColor: '#2563eb', color: 'white' }}
                                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-2"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>
    
                            {/* Modal Content */}
                            <img
                                src={selectedPost.imageUrl}
                                alt={selectedPost.title}
                                className="w-full h-48 md:h-64 object-cover rounded-lg mb-4 md:mb-6"
                            />
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-3 font-display">
                                {selectedPost.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4 md:mb-6 font-body">
                                {selectedPost.date}
                            </p>
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-body">
                                {selectedPost.content}
                            </p>
                        </div>
                    </div>
                )}
        </section>

        // <section id="blog" ref={sectionRef} className="py-20 md:py-32 px-4 bg-white dark:bg-gray-900 transition-colors duration-500 shadow-inner relative overflow-hidden">
        //     <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
        //     <div className="container mx-auto text-center max-w-6xl">
        //         <h2 className={`text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
        //             From Our Blog: Latest Insights
        //         </h2>
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        //             {blogPosts.map((post, index) => (
        //                 <div key={index} className={`card bg-gray-50/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border-2 border-transparent group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${index * 100}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
        //                     <div className="overflow-hidden rounded-t-xl">
                               
        //                         <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl" />
        //                     </div>
        //                     <div className="p-6 text-left relative">
        //                         <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
        //                         <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight font-display relative z-10">{post.title}</h3>
        //                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-body relative z-10">{post.date}</p>
        //                         <p className="text-gray-600 dark:text-gray-300 mb-5 text-md line-clamp-3 font-body relative z-10">{post.excerpt}</p>
        //                         <a href={post.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors duration-300 group-hover:text-accent-500 font-body relative z-10">
        //                             Read More <ChevronRight size={18} className="ml-1 group-hover:animate-pulse-right" />
        //                         </a>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //         {/* <div className={`mt-16 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'}`}>
        //             <button className="btn-primary text-xl group relative overflow-hidden magic-btn-hover">
        //                 <span className="relative z-10">Discover More Articles</span>
        //             </button>
        //         </div> */}
        //     </div>
        // </section>
    );
};
// END OF BLOG SECTION ================================================================================================================================================




// Testimonial Card Component ================================================================================================================================================
const TestimonialCard = ({ review, inView, delay }) => (
    <div className={`bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transition duration-300 group relative overflow-hidden card-magic-hover ${inView ? `animate-pop-in delay-${delay}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///+8vLz09PS5ubn39/e3t7fAwMDy8vLu7u78/Pzi4uLV1dXFxcXn5+f5+fnm5uba2trMzMzExMTc3NyzuNnnAAAGxklEQVR4nO2d6bLiIBCFb4AQsmr0/d91ghqNMQsHaYhT/f2aqVsVc+yFBhr8+2MYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYJj6dMO2pspxaI7rUrxOS0lR1o2WeyxfDf3RTV6ZM/XJfI6peD8qyRaxQXZ9E6pf0pmxrLdfUTWXq+idt2fb76p4q86xvU78whqiHl8bIZf077to2uav13i3Z/IYhK+0j72FIXaV+/V2qzF/fzZDZsTWevrDfU6M+rq8WDZpeVjQ2B805dRh9N411ajELmC8DcCYxM6kFzQlowDv5scwoAmSYOVIfKBqr0Aa8kx9m4KjDG/Ah8RieWjZUAu24cYBJR6fJ9FmJOvliQEFnwIfGIq1AQy1wkJh0ZIwgMK3EKAJTSiSPwafERLHYxRI4SEySUcto+gZ0inGRcKD/RDbxBZKVaisSoxdwRMX2hsTIZbiILXAow+NOpkiL0RWiZpvIQXgnZiia+D5qyePVNkn0WWIJTOKjllh+Gq0cXZAYp0BtkgnMsiilzSlNmrmTx9jT8B8KbYfCo1PB+xmaXmDl93aDqP56MoUQojCnc++7BxChePN7L10b1YkRpTplas91cmqBPiaUl0ooMUeJ6uLzMGoj4lEos+pT3sOUPjvGxJHYwm8k+wX7vezY4w+kTafwWCirblWfpcPdnnRMRKeFUpt1Az7MaFDHzykLG7Qi1Tvy7oBJlbQ6JRE4SMQeK+kEtqCTGkeFBlRIl2t66EXy1lGgECfIOWRPJRBbA5b1XpJ50YEBTqUQGwy1u8Aho0KhSOam0Bct3X3UAn17ZNkU+p4bxISDn0K1BFHlJghNOBgRydOSZnUYqq8umAmHSLwgCmkmGEgYyisoUAjkCyQKRCQMJSxQQEt4JIFYIoHSbM8oloByTU6xh4Es5cszGoZDIJ4BI5Is8ENxcoIFYqUbSaqp3T8/k4WHwgJxEopUAw3JuJMObop8AMVEH0mlUE36VAh9AoFCJJmDJdtDITTmhxfYQYOFl0JouAjfQwQtQtErJKhMoS49uCq9KYS8NPyAiE1/yXMpwSQYWkrxKEsHsNlZWoW56yrbFKjDQ56CK4Rmh/LqUZdinxC+bMP2F3oPhdAmTXKFHqkGSjTpFcLLNOBqG4VCdFkanQJjTkqRacC9UXz+BD4//GgBnjxAZ/nQDD8jqWngnlnMggX4dIJ+WmhukWEbM/jWDMXcAt0dxeoauGOVYpcU7jNx3QG24A8nUIi3YTgXNuBIYaFYp8H7ZmXtNijCQUi01ubR7yXPLhI7cKC4PZlivdSnfd0loSqfpmqSNW9o3+IpcTcWPWIwI9q38Gudldpseaoq/HowaTaBkWX9qcZardlRibNfSzXR/qFnd/BgxmpRo1Le1xER7QGD1f+bxnMxE6lUcfa/TIPqlNcXx7mkbM6t6tSNrhPtufminZ2si9YzEEeNUuq+Huh7h4vqtp9F1U+DNu6tCf36zA1ZT5TP2ebVSxPHl/XRK8lOImK9ibaJvW9FvdGtLrNatPDZC7reRHCtZnj9orsNenrZULcUa0f9M6aRspcd6SXIrmOTvlJtPXNXKfOsbscRRIkropGwR9h9BiVnlYxS5tpfsvHU06W/mve/C/f6m7TP23U5SvbFwiGZTonCGFPYf338WRWuJTjtoW6nib7Mdg5ZLON6gob2DKLLkLh5SmYbFzMSn5lxqNzk1ceAd7rrvkTqE4j7E4zW14AW1e5+geQHEHc+Xy+kGEji7pSYWuC2EWXzlby7xs1rYWJcALIRie4rpJsSt/JNhHPAG+k0jMBNiVHOcq+OidKrE2pR4qqjxrlqaKUhO5zAdYmxLv1aLiGRjZh9FqM93v0ty19vUIXLjhJL4NICv0fzxTYLc9GI99N8+qlPc/42nxv7ca/7moVJqHFiSjcfM+LeSjefKAbXZ5n5aOSLk9/uawPOwyK8NSnFvzZ5Eop4A5QbUz9NcUv7ZFAm0Wd5CUxwb+JfOWYbuXazx9e8Wk6T3H35vL80YLX2IfFRA6e5v3QsUKVPx7Mr9266dPdB28+nGApfdH2W/KrkwPXonMFPEl93nZOa0M6GY1ajixIpo9Bikv+UR0ms8AA/HfBHKjC1uDuE42FqaSM0Zak40s9A0gTjEULwRXhPPYyHjoQ244E89ElIMx7OgHfCmfFYETglTFI9ooO++F7jsfVZvtN4fH0W/3j8DX2W0uu0+nHzyyKgs6rfMd8EZ0v+mvWmlN3ueYvuh+WNrMn8L8RNKcuye1D+Z9IYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEY5lf4BzLdcO2TnNmPAAAAAElFTkSuQmCC" alt={review.name} className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover mb-4 md:mb-5 ring-2 md:ring-4 ring-blue-300 dark:ring-blue-600 shadow-md relative z-10 animate-pulse-glow" />
        <div className="flex mb-3 md:mb-4 relative z-10">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} md:size={24} className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'} />
            ))}
        </div>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 md:mb-5 italic leading-relaxed font-body relative z-10">"{review.comment}"</p>
        <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg md:text-xl font-display relative z-10">- {review.guestName}</p>
    </div>
);
// TESTIMONIAL CARD ================================================================================================================================================




// Testimonials Section ================================================================================================================================================
export const Testimonials = () => {
    const review = [
        {
            name: 'Alice Johnson',
            rating: 5,
            comment: 'Our stay at Oxbow Lake Hotel was simply outstanding! The staff went above and beyond to make our anniversary special. The room was beautiful and the dining experience divine. Highly recommend!',
            image: 'https://placehold.co/100x100/F0F4F8/607B8B?text=AJ',
        },
        {
            name: 'Bob Williams',
            rating: 4,
            comment: 'Great location and very comfortable beds. The concierge service was incredibly helpful with local recommendations. Will definitely consider staying here again for future trips.',
            image: 'https://placehold.co/100x100/F0F4F8/607B8B?text=BW',
        },
    ];

    
    const [reviews, setReviews] = useState(review);

    useEffect(()=>{
        axiosClient.get('/user/reviews/index')
        .then(({data})=>{
            setReviews(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

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

    return (
        <section id="testimonials" ref={sectionRef} className="py-20 md:py-32 px-4 bg-gray-100 dark:bg-gray-950 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div> {/* Subtle blob background */}
            <div className="container mx-auto text-center max-w-5xl">
                <h2 className={`text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    Hear From Our Delighted Guests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {reviews.map((review, index) => (
                        <TestimonialCard key={index} review={review} inView={inView} delay={index * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
};
// TESTIMONIALS CARD SECTION ================================================================================================================================================




// Contact Section =============================================================================================================================================================================================================
export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error');
            setShowConfetti(false);
            return;
        }

        axiosClient.post('/contact', formData)
        .then(({data}) => {
            console.log(data);
            setSubmitStatus('success');
            setShowConfetti(true); // Trigger confetti on success
            setFormData({ name: '', email: '', message: '' });
            toast(data.message);

            setTimeout(() => {
                setSubmitStatus('');
                setShowConfetti(false); // Hide confetti
            }, 3000);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return (
        <section id="contact" ref={sectionRef} className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
            <div className={`container mx-auto text-center max-w-xl md:max-w-2xl bg-white/80 dark:bg-gray-900/80 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 dark:border-gray-800 ${inView ? 'animate-fade-in-up' : 'opacity-0'} backdrop-blur-sm`}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-8 md:mb-12 section-header font-display animate-text-reveal-gradient">
                    Connect With Us
                </h2>
                <p className={`text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed ${inView ? 'animate-slide-in-up delay-200' : 'opacity-0'} font-body`}>
                    We're here to assist you with any inquiries, bookings, or special requests. Reach out to us directly or fill out the form below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className={inView ? 'animate-slide-in-up delay-300' : 'opacity-0'}>
                        <label htmlFor="name" className="block text-left text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium mb-1 md:mb-2 font-body">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 md:px-6 md:py-4 border border-gray-300 dark:border-gray-700 rounded-lg md:rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-base md:text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-400' : 'opacity-0'}>
                        <label htmlFor="email" className="block text-left text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium mb-1 md:mb-2 font-body">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 md:px-6 md:py-4 border border-gray-300 dark:border-gray-700 rounded-lg md:rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-base md:text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="message" className="block text-left text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium mb-1 md:mb-2 font-body">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 md:px-6 md:py-4 border border-gray-300 dark:border-gray-700 rounded-lg md:rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 resize-y text-base md:text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white' }} className={`btn-primary w-full md:w-auto text-base md:text-xl py-3 px-8 md:py-4 md:px-10 ${inView ? 'animate-slide-in-up delay-600' : 'opacity-0'} group relative overflow-hidden magic-btn-hover animate-pulse-button`}>
                        <span className="relative z-10">Send Message</span>
                    </button>
                    {submitStatus === 'success' && (
                        <p className="text-green-600 dark:text-green-400 text-center mt-4 font-semibold font-body relative text-sm md:text-base">
                            Thank you for your valuable feedback!
                            {showConfetti && <div className="absolute inset-0 z-20 animate-confetti-burst"></div>}
                        </p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="text-red-600 dark:text-red-400 text-center mt-4 font-semibold font-body text-sm md:text-base">Please ensure all fields are filled out correctly.</p>
                    )}
                </form>
                <ToastContainer />
                <div className={`mt-8 md:mt-12 text-gray-700 dark:text-gray-300 space-y-3 md:space-y-5 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'} font-body`}>
                    <div className="flex items-center justify-center text-base md:text-xl">
                        <LocateFixed size={24} className="mr-3 md:mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Head Office:</strong> NO 3 Daewood Road Ox Bow Lake, Swali, Yenegoa, Bayelsa, Nigeria.</p>
                    </div>
                    <div className="flex items-center justify-center text-base md:text-xl">
                        <Phone size={24} className="mr-3 md:mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Reservations:</strong>+2349131776509, +2349119283853</p>
                    </div>
                    <div className="flex items-center justify-center text-base md:text-xl">
                        <Mail size={24} className="mr-3 md:mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Email:</strong>Oxbowlakehotels@gmail.com</p>
        
                    </div>

                    <div className="flex items-center justify-center text-base md:text-xl">
                        <LocateFixed size={24} className="mr-3 md:mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>BRANCH OFFICE:
                            </strong> First Road, Gbarantoru, Yenagoa, Bayelsa State.
                        </p>
                    </div>
                    <div className="flex items-center justify-center text-base md:text-xl">
                        <Phone size={24} className="mr-3 md:mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Reservations:</strong>+2349015199223, +234 9068878082
                        </p>
                    </div>
                    <div className="flex items-center justify-center text-base md:text-xl">
                        <Mail size={24} className="mr-3 md:mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Email:</strong>Oxbowapartments@gmail.com</p>
        
                    </div>
                    
                </div>
            </div>
        </section>
    );
};
// END OF CONTACT FORM COMPONENT =====================================================================================================================================




// Review Modal Component ================================================================================================================================================
export const ReviewModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || rating === 0 || !comment) {
            setSubmitStatus('error');
            setShowConfetti(false);
            return;
        }
        console.log('Review submitted:', { name, rating, comment });
        setSubmitStatus('success');
        setShowConfetti(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-lg w-full relative transform scale-95 animate-scale-in transition-all duration-500 border border-blue-400 dark:border-blue-700 review-modal-glow">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform duration-300 transform hover:rotate-90 shadow-md"
                    aria-label="Close review form"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <h3 className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-6 text-center font-display animate-text-reveal-gradient">Share Your Experience</h3>
                <p className="text-gray-700 dark:text-gray-300 text-center mb-8 text-lg font-body">We value your feedback to enhance our services!</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="reviewer-name" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 font-body">Your Name</label>
                        <input
                            type="text"
                            id="reviewer-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 text-lg shadow-sm focus:animate-input-glow font-body"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 font-body">Overall Rating</label>
                        <div className="flex space-x-2 justify-center">
                            {[1, 2, 3, 4, 5].map((starValue) => (
                                <Star
                                    key={starValue}
                                    size={36}
                                    className={`cursor-pointer transition-colors duration-200 ${starValue <= rating ? 'text-yellow-500 fill-current animate-pulse-glow' : 'text-gray-300 dark:text-gray-600'} hover:scale-110 transform`}
                                    onClick={() => setRating(starValue)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="reviewer-comment" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 font-body">Your Comment</label>
                        <textarea
                            id="reviewer-comment"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 resize-y text-lg shadow-sm focus:animate-input-glow font-body"
                            placeholder="Share your experience with us..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full text-xl py-4 group relative overflow-hidden magic-btn-hover">
                        <span className="relative z-10">Submit Review</span>
                    </button>
                    {submitStatus === 'success' && (
                        <p className="text-green-600 dark:text-green-400 text-center mt-4 font-semibold font-body relative">
                            Thank you for your valuable feedback!
                            {showConfetti && <div className="absolute inset-0 z-20 animate-confetti-burst"></div>}
                        </p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="text-red-600 dark:text-red-400 text-center mt-4 font-semibold font-body">Please ensure all fields are filled out correctly.</p>
                    )}
                </form>
            </div>
        </div>
    );
};



// Main App component to render all sections (for demonstration purposes)
// You would typically import and use these components within your main application structure.
export default function App() {
    return (
        <div className="font-sans antialiased text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Tailwind CSS CDN for quick testing */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Custom CSS for animations (if not already defined globally) */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');

                .font-sans { font-family: 'Inter', sans-serif; }
                .font-display { font-family: 'Playfair Display', serif; }
                .font-body { font-family: 'Inter', sans-serif; }

                /* Custom animations for responsiveness */
                @keyframes slide-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                @keyframes zoom-in-fast {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                @keyframes pop-in {
                    0% { opacity: 0; transform: scale(0.8) translateY(20px); }
                    60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
                    100% { transform: scale(1) translateY(0); }
                }

                @keyframes tilt-in {
                    0% { opacity: 0; transform: rotateX(-15deg) translateY(30px) scale(0.9); }
                    100% { opacity: 1; transform: rotateX(0deg) translateY(0) scale(1); }
                }

                .animate-slide-in-up { animation: slide-in-up 0.8s ease-out forwards; }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
                .animate-zoom-in-fast { animation: zoom-in-fast 0.3s ease-out forwards; }
                .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                .animate-tilt-in { animation: tilt-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

                /* Delay animations */
                .delay-80 { animation-delay: 80ms; }
                .delay-100 { animation-delay: 100ms; }
                .delay-150 { animation-delay: 150ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-600 { animation-delay: 600ms; }
                .delay-700 { animation-delay: 700ms; }

                /* Other animations (from original code, ensure they are defined) */
                @keyframes blob-flow {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                @keyframes blob-flow-reverse {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-30px, 50px) scale(0.9); }
                    66% { transform: translate(20px, -20px) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-blob-flow { animation: blob-flow 15s infinite alternate ease-in-out; }
                .animate-blob-flow-reverse { animation: blob-flow-reverse 15s infinite alternate ease-in-out; }

                @keyframes text-reveal-gradient {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-text-reveal-gradient {
                    background: linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #8b5cf6 100%);
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: text-reveal-gradient 3s ease-in-out infinite;
                }

                @keyframes pulse-fade {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
                .animate-pulse-fade { animation: pulse-fade 1.5s infinite ease-in-out; }

                @keyframes shimmer-bg {
                    0% { background-position: -100% 0; }
                    100% { background-position: 100% 0; }
                }
                .animate-shimmer-bg {
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer-bg 2s infinite linear;
                }

                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 0px rgba(59, 130, 246, 0.4); }
                    50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.7); }
                }
                .animate-pulse-glow { animation: pulse-glow 2s infinite ease-in-out; }

                @keyframes pulse-right {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .group-hover\\:animate-pulse-right { animation: pulse-right 0.6s infinite ease-in-out; }

                @keyframes input-glow {
                    0%, 100% { box-shadow: 0 0 0px rgba(59, 130, 246, 0.3); }
                    50% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.6); }
                }
                .focus\\:animate-input-glow:focus { animation: input-glow 1.5s infinite alternate; }

                @keyframes pulse-button {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                .animate-pulse-button { animation: pulse-button 2s infinite ease-in-out; }

                @keyframes confetti-burst {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                .animate-confetti-burst {
                    animation: confetti-burst 1s forwards;
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="3" fill="%23f00"/></svg>'), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><polygon points="5,0 10,10 0,10" fill="%230f0"/></svg>'), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="%2300f"/></svg>');
                    background-repeat: repeat;
                    background-size: 10px 10px;
                    pointer-events: none;
                }

                /* Magic hover effects for cards and buttons */
                .card-magic-hover::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: inherit;
                    background: conic-gradient(from var(--angle), transparent 0deg, var(--gradient-color-1) 90deg, var(--gradient-color-2) 180deg, transparent 270deg);
                    animation: rotate-border 4s linear infinite;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                    z-index: 0;
                }
                .card-magic-hover:hover::before {
                    opacity: 1;
                }
                .card-magic-hover {
                    --angle: 0deg;
                    --gradient-color-1: rgba(59, 130, 246, 0.6); /* blue-500 */
                    --gradient-color-2: rgba(139, 92, 246, 0.6); /* purple-500 */
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .card-magic-hover::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    background: inherit;
                    z-index: 1;
                }
                .card-magic-hover > * {
                    position: relative;
                    z-index: 2;
                }
                @keyframes rotate-border {
                    to {
                        --angle: 360deg;
                    }
                }
                @property --angle {
                    syntax: '<angle>';
                    initial-value: 0deg;
                    inherits: false;
                }

                .magic-btn-hover::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: width 0.4s ease-out, height 0.4s ease-out;
                    z-index: 0;
                }
                .magic-btn-hover:hover::before {
                    width: 200%;
                    height: 200%;
                }
                .btn-primary {
                    @apply bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-800;
                }
                `}
            </style>
            <Gallery />
            <Blog />
            <Testimonials />
            <Contact />
            {/* You might conditionally render ReviewModal based on a state in your main App */}
            {/* <ReviewModal onClose={() => {}} /> */}
        </div>
    );
}
