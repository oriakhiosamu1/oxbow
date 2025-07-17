import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Home, Info, Hotel, Utensils, Image, MessageCircle, Phone, Mail, MapPin, Calendar, Users,
    ChevronLeft, ChevronRight, Moon, Sun, Star, Newspaper, Linkedin, Facebook, Rss,
    ShoppingCart, BedSingle, LocateFixed, Car, Train, User, Plane, X
} from 'lucide-react';
import axiosClient from '../../axiosClient/axiosClient';
import {toast, ToastContainer} from 'react-toastify';

// Preloader Component================================================================================================================================================
export const Preloader = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-950 dark:from-gray-950 dark:to-black flex flex-col items-center justify-center z-50 transition-all duration-700">
            <div className="relative w-40 h-40 mb-12 animate-preloader-container">
                <div className="absolute inset-0 border-4 border-blue-400 dark:border-blue-700 rounded-full animate-spin-slow-preloader opacity-80"></div>
                <div className="absolute inset-10 bg-blue-700 dark:bg-blue-800 rounded-full flex items-center justify-center shadow-2xl animate-pulse-scale">
                    <Hotel size={64} className="text-white transform scale-110 animate-bounce-subtle" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-500 opacity-0 animate-preloader-ripple delay-500"></div>
                    <div className="w-24 h-24 rounded-full bg-blue-500 opacity-0 animate-preloader-ripple delay-1000"></div>
                </div>
            </div>
            <h1 className="text-white text-6xl sm:text-7xl font-extrabold animate-pulse-fade drop-shadow-lg tracking-wider font-display">Oxbow Lake Hotel</h1>
            <p className="text-blue-200 dark:text-blue-400 mt-5 text-xl sm:text-2xl font-medium animate-slide-in-up delay-400 font-body">Unveiling your luxurious escape...</p>
        </div>
    );
};
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
    const images = [
        'https://i.postimg.cc/xCHnDnb3/IMG-20250617-WA0017.jpg', 
        'https://i.postimg.cc/fW7LPfsS/IMG-8630-HEIC.jpg',   
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroRef = useRef(null);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    // Auto-swiping logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000); // Change image every 7 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    // Manual navigation
    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Parallax effect for text overlay
    const handleMouseMove = useCallback((e) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) / (width / 2);
        const y = (clientY - (top + height / 2)) / (height / 2);

        setMouseOffset({ x, y });
    }, []);

    useEffect(() => {
        const currentHeroRef = heroRef.current;
        if (currentHeroRef) {
            currentHeroRef.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (currentHeroRef) {
                currentHeroRef.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [handleMouseMove]);

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative h-screen flex items-center justify-center text-center p-4 overflow-hidden"
        >
            {/* Background Images with Transition */}
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Hotel View ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
                                ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                        e.target.src = 'https://placehold.co/1920x1080/CCCCCC/333333?text=Image+Error'; // Fallback image
                    }}
                />
            ))}

            {/* Dynamic Magic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-pink-900/60 animate-hero-gradient-overlay"></div>
            <div className="absolute inset-0 z-0 opacity-20 animate-bg-sparkle"></div>
            <div className="absolute inset-0 z-0 opacity-10 animate-star-trail"></div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full shadow-lg z-20
                           hover:bg-white/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/70 backdrop-blur-sm"
                aria-label="Previous image"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full shadow-lg z-20
                           hover:bg-white/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/70 backdrop-blur-sm"
                aria-label="Next image"
            >
                <ChevronRight size={32} />
            </button>

            {/* Text Content Overlay */}
            <div
                className="relative z-10 max-w-5xl mx-auto px-4 sm:px-0"
                style={{
                    transform: `translate(${mouseOffset.x * 20}px, ${mouseOffset.y * 20}px)`
                }}
            >
                <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg animate-text-wave-reveal font-display"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                >
                    Welcome to Oxbow Lake Hotel
                </h1>
                <p className="text-2xl md:text-3xl mb-10 text-gray-200 animate-slide-in-up delay-200 font-body"
                    style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}
                >
                    Your ultimate destination for unparalleled comfort and serene luxury.
                </p>
                <button
                    onClick={() => scrollToSection('booking')}
                    className="btn-primary px-10 py-5 text-xl animate-scale-up delay-400 group relative overflow-hidden magic-btn-hover"
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
    <div className={`p-10 bg-blue-50/70 dark:bg-gray-800/70 rounded-2xl shadow-xl text-blue-800 dark:text-blue-300 flex flex-col items-center transform transition duration-300 group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${delay}` : 'opacity-0'} animate-float-subtle`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
        <div className="mb-5 text-blue-600 dark:text-blue-400 relative z-10 animate-bounce-icon">
            {icon}
        </div>
        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 font-display relative z-10">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-center font-body relative z-10">{description}</p>
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
        <section id="about" ref={sectionRef} className="py-20 md:py-32 px-4 bg-white dark:bg-gray-900 transition-colors duration-500 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div> {/* Subtle blob background */}
            <div className="container mx-auto text-center max-w-5xl">
                <h2 className={`text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-10 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    Discover Oxbow Lake Hotel
                </h2>
                <p className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-12 ${inView ? 'animate-slide-in-up delay-200' : 'opacity-0'} font-body`}>
                    Welcome to Oxbow Hotel & Apartments, where Hospitality meets Professionalism in the heart of Yenagoa, Bayelsa State. 
                    our hotel is more than just a place to stay — it’s a destination.
                    Whether you’re here for business, leisure, or a weekend getaway, our beautifully designed rooms, premium apartments, and 
                    top-class amenities offer you an unforgettable experience. From fine dining and serene poolside view to modern meeting spaces and personalized service, we provide everything you need to relax, recharge, and feel at home

                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
                    <AboutCard
                        icon={<Star size={56} />}
                        title="Exceptional Service"
                        description="Our highly trained and passionate staff anticipate your every need with genuine warmth and efficiency."
                        inView={inView} delay={400}
                    />
                    <AboutCard
                        icon={<LocateFixed size={56} />}
                        title="Picturesque Location"
                        description="Enjoy breathtaking views and easy access to local attractions from our prime lakeside setting."
                        inView={inView} delay={600}
                    />
                    <AboutCard
                        icon={<Hotel size={56} />}
                        title="Unrivaled Comfort"
                        description="Experience pure indulgence in elegantly designed spaces, featuring plush furnishings and modern conveniences."
                        inView={inView} delay={800}
                    />
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
        <section id="booking" ref={sectionRef} className="py-20 md:py-32 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
            <div className={`container mx-auto text-center max-w-4xl bg-white/80 dark:bg-gray-900/80 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 ${inView ? 'animate-fade-in-up' : 'opacity-0'} backdrop-blur-sm`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header font-display animate-text-reveal-gradient">
                    Seamlessly Book Your Stay
                </h2>
                <form onSubmit={handleCheckAvailability} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className={inView ? 'animate-slide-in-up delay-200' : 'opacity-0'}>
                        <label htmlFor="branch" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-3 flex items-center font-body">
                            <LocateFixed size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                            Select Branch
                        </label>
                        <select
                            name="branch"
                            value={availabilityCheck.branch}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            required
                        >
                            <option value="">Choose Your Preferred Location</option>
                            <option value="Swali">Swali</option>
                            <option value="Gbarantoru">Gbarantoru</option>
                        </select>
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-300' : 'opacity-0'}>
                        <label htmlFor="type" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-3 flex items-center font-body">
                            <BedSingle size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                            Select Room Type
                        </label>
                        <select
                            name="type"
                            value={availabilityCheck.type}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            required
                            disabled={!availabilityCheck.branch}
                        >
                            <option value="">Choose Your Desired Accommodation</option>
                            {availableRoomTypes.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-400' : 'opacity-0'}>
                        <label htmlFor="check_in" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-3 flex items-center font-body">
                            <Calendar size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            name="check_in"
                            value={availabilityCheck.check_in}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            required
                        />
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="check_out" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-3 flex items-center font-body">
                            <Calendar size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            name="check_out"
                            value={availabilityCheck.check_out}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            required
                        />
                    </div>

                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="name" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-3 flex items-center font-body">
                            <User size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={availabilityCheck.name}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            required
                        />
                    </div>

                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="email" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-3 flex items-center font-body">
                            <Mail size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={availabilityCheck.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            required
                        />
                    </div>
                    {/* Removed the room number input field from the form as it's now assigned programmatically */}
                    <div className={`md:col-span-2 flex justify-center mt-6 ${inView ? 'animate-slide-in-up delay-600' : 'opacity-0'}`}>
                        <button type="submit" className="btn-primary w-full md:w-auto px-12 py-5 text-2xl font-bold group relative overflow-hidden magic-btn-hover animate-pulse-button">
                            <span className="relative z-10">Check Availability</span>
                        </button>
                    </div>
                </form>
                {message && (
                    <div className={`mt-8 p-5 rounded-lg text-center font-medium ${messageType === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'} shadow-md animate-pop-in-bounce font-body relative`}>
                        {message}
                        {showConfetti && <div className="absolute inset-0 z-20 animate-confetti-burst"></div>} {/* Confetti animation */}
                    </div>
                )}
            </div>
            <ToastContainer />
        </section>
    );
};
// BOOKING SECTION ================================================================================================================================================




// Room Card Component ==================================================================================================================================================================================================================================================================================================================
const RoomCard = ({ room, inView, delay }) => (
    <div className={`card bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl text-blue-800 dark:text-blue-300 flex flex-col transform transition duration-300 group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${delay}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
        <div className="overflow-hidden rounded-t-xl">
            <img src='https://i.postimg.cc/wMn1QTT1/premium.jpg' alt={room.type} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl" />
        </div>
        <div className="p-8 text-left relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-200/30 dark:from-blue-900/30 dark:to-blue-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 font-display relative z-10">{room.type}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5 text-md leading-relaxed font-body relative z-10">{room.description}</p>
            <div className="flex justify-between items-center mb-6 relative z-10">
                {/* Ensure price is formatted correctly */}
                <p className="text-blue-600 dark:text-blue-400 text-2xl font-extrabold font-display">₦{room.price.toLocaleString()}</p>
                <ul className="text-gray-700 dark:text-gray-300 text-right list-disc list-inside text-sm space-y-1 font-body">
                    {/* THIS IS THE CRITICAL FIX: Ensure room.features is an array before slicing */}
                    {(room.features || []).slice(0, 2).map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                    {/* Also apply the safe check for length */}
                    {(room.features || []).length > 2 && <li className="italic">+ more features</li>}
                </ul>
            </div>
            <button className="btn-primary text-lg w-full py-3 group relative overflow-hidden magic-btn-hover">
                <span className="relative z-10">Explore Room</span>
            </button>
        </div>
    </div>
);
// ROOM CARD COMPONENT ENDS HERE ============================================================================================================================================================================================================================================================================================================================




// Rooms Section=============================================================================================================
export const Rooms = () => {

    const [selectedBranch, setSelectedBranch] = useState('Swali');
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [roomData, setRoomData] = useState([]);

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
        axiosClient.get(`/rooms/branch/${selectedBranch}`)
        .then(({data})=>{
            console.log(data)
            setRoomData(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [selectedBranch])


    return (
        <section id="rooms" ref={sectionRef} className="py-20 md:py-32 px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div> {/* Subtle blob background */}
            <div className="container mx-auto text-center">
                <h2 className={`text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    Our Exquisite Rooms & Suites
                </h2>

                <div className={`flex justify-center mb-12 space-x-6 flex-wrap ${inView ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
                    <button
                        onClick={() => setSelectedBranch('Swali')}
                        style={{ backgroundColor: '#2563eb', color: 'white' }}
                        className={`px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md mb-4 md:mb-0
                            ${selectedBranch === 'Swali' ? 'bg-blue-600 text-white shadow-xl ring-2 ring-blue-400 animate-pulse-button' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600'} font-body`}
                    >
                        Swali Branch
                    </button>
                    <button
                        onClick={() => setSelectedBranch('Gbarantoru')}
                        style={{ backgroundColor: '#2563eb', color: 'white' }}
                        className={`px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md
                            ${selectedBranch === 'Gbarantoru' ? 'bg-blue-600 text-white shadow-xl ring-2 ring-blue-400 animate-pulse-button' : 'bg-transparent text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600'} font-body`}
                    >
                        Gbarantoru Branch
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {roomData.map((room, index) => (
                        <RoomCard key={index} room={room} inView={inView} delay={index * 100} />
                    ))}
                </div>
                {/* <div className={`mt-16 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'}`}>
                    <button className="btn-primary text-xl group relative overflow-hidden magic-btn-hover">
                        <span className="relative z-10">View All Accommodations</span>
                    </button>
                </div> */}
            </div>
        </section>
    );
};
// END OF ROOM SECTION =========================================================================================================================================




// Gallery Section with Modal=====================================================================================================================================
export const Gallery = () => {
    const image = [
        'https://i.postimg.cc/fW7LPfsS/IMG-8630-HEIC.jpg=Entrance+View',
        'https://i.postimg.cc/xC071Qk2/IMG-8621-HEIC.jpg=Pool+Side',
        'https://i.postimg.cc/6qTGw7tG/IMG-8578-HEIC.jpgGourmet+Restaurant',
        'https://i.postimg.cc/2yFjsrBB/IMG-8596-HEIC.jpgModern+Fitness',
        'https://i.postimg.cc/T3xg53cB/IMG-8591-HEIC.jpg=Relaxing+Spa',
        'https://i.postimg.cc/Cxt06z6Q/IMG-8611-HEIC.jpgGrand+Ballroom',
        'https://i.postimg.cc/nhnTbkNs/IMG-8620-HEIC.jpg=Exclusive+Lounge',
        'https://i.postimg.cc/X7LdF0DJ/IMG-8626-HEIC.jpg=Rooftop+Terrace',
        'https://i.postimg.cc/tR5YvNdv/IMG-8627-HEIC.jpg=Meeting+Space',
        'https://i.postimg.cc/FFPRmsfh/IMG-8585-HEIC.jpg=Suite+Bedroom',
    ];
    const [selectedImage, setSelectedImage] = useState(null);
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    const [images, setImages] = useState(image);
    useEffect(()=>{
        axiosClient.get('/user/gallery/index')
        .then(({data})=>{
            setImages(data)
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [])

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

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <section id="gallery" ref={sectionRef} className="py-20 md:py-32 px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow"></div> {/* Subtle blob background */}
            <div className="container mx-auto text-center max-w-6xl">
                <h2 className={`text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    A Glimpse of Our Elegance
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition duration-500 group relative card-magic-hover
                                ${inView ? `animate-pop-in delay-${index * 80}` : 'opacity-0'} animate-float-subtle`}
                            onClick={() => openModal(image)}
                        >
                            <img src={`http://localhost:8000/storage/${image.image}`} alt={`Gallery Image ${index + 1}`} className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-fade">
                                <span className="text-white text-xl font-bold tracking-wide font-body">VIEW</span>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-4xl max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
                            <img src={`http://localhost:8000/storage/${selectedImage.image}`} alt="Selected Gallery Image" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-zoom-in-fast" />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-white text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-transform duration-300 transform hover:rotate-90 shadow-lg"
                                aria-label="Close image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
// END OF GALLERY SECTION =======================================================================================================================================




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
        <section id="blog" ref={sectionRef} className="py-20 md:py-32 px-4 bg-white dark:bg-gray-900 transition-colors duration-500 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
            <div className="container mx-auto text-center max-w-6xl">
                <h2 className={`text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header ${inView ? 'animate-slide-in-up animate-text-reveal-gradient' : 'opacity-0'} font-display`}>
                    From Our Blog: Latest Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogPosts.map((post, index) => (
                        <div key={index} className={`card bg-gray-50/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border-2 border-transparent group relative overflow-hidden card-magic-hover ${inView ? `animate-tilt-in delay-${index * 100}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
                            <div className="overflow-hidden rounded-t-xl">
                                <img src={`http://localhost:8000/storage/${post.image}`} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl" />
                            </div>
                            <div className="p-6 text-left relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight font-display relative z-10">{post.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-body relative z-10">{post.date}</p>
                                <p className="text-gray-600 dark:text-gray-300 mb-5 text-md line-clamp-3 font-body relative z-10">{post.excerpt}</p>
                                <a href={post.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-colors duration-300 group-hover:text-accent-500 font-body relative z-10">
                                    Read More <ChevronRight size={18} className="ml-1 group-hover:animate-pulse-right" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className={`mt-16 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'}`}>
                    <button className="btn-primary text-xl group relative overflow-hidden magic-btn-hover">
                        <span className="relative z-10">Discover More Articles</span>
                    </button>
                </div> */}
            </div>
        </section>
    );
};
// END OF BLOG SECTION ================================================================================================================================================




// Testimonial Card Component ================================================================================================================================================
const TestimonialCard = ({ review, inView, delay }) => (
    <div className={`bg-white/70 dark:bg-gray-800/70 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transition duration-300 group relative overflow-hidden card-magic-hover ${inView ? `animate-pop-in delay-${delay}` : 'opacity-0'} animate-float-subtle backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-bg"></div>
        <img src='https://placehold.co/100x100/F0F4F8/607B8B?text=BW' alt={review.guestName} className="w-28 h-28 rounded-full object-cover mb-5 ring-4 ring-blue-300 dark:ring-blue-600 shadow-md relative z-10 animate-pulse-glow" />
        <div className="flex mb-4 relative z-10">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'} />
            ))}
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-5 italic leading-relaxed font-body relative z-10">"{review.comment}"</p>
        <p className="font-semibold text-gray-900 dark:text-gray-100 text-xl font-display relative z-10">- {review.guestName}</p>
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

        // console.log('Form submitted:', formData);
        // setSubmitStatus('success');
        // setShowConfetti(true); // Trigger confetti on success
        // setFormData({ name: '', email: '', message: '' });

        // setTimeout(() => {
        //     setSubmitStatus('');
        //     setShowConfetti(false); // Hide confetti
        // }, 3000);
    };

    return (
        <section id="contact" ref={sectionRef} className="py-20 md:py-32 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
            <div className={`container mx-auto text-center max-w-2xl bg-white/80 dark:bg-gray-900/80 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 ${inView ? 'animate-fade-in-up' : 'opacity-0'} backdrop-blur-sm`}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-12 section-header font-display animate-text-reveal-gradient">
                    Connect With Us
                </h2>
                <p className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed ${inView ? 'animate-slide-in-up delay-200' : 'opacity-0'} font-body`}>
                    We're here to assist you with any inquiries, bookings, or special requests. Reach out to us directly or fill out the form below.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={inView ? 'animate-slide-in-up delay-300' : 'opacity-0'}>
                        <label htmlFor="name" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 font-body">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-400' : 'opacity-0'}>
                        <label htmlFor="email" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 font-body">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 transition duration-300 text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className={inView ? 'animate-slide-in-up delay-500' : 'opacity-0'}>
                        <label htmlFor="message" className="block text-left text-gray-700 dark:text-gray-300 text-lg font-medium mb-2 font-body">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="7"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 resize-y text-lg shadow-sm focus:shadow-lg focus:outline-none focus:animate-input-glow font-body"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={`btn-primary w-full md:w-auto text-xl py-4 px-10 ${inView ? 'animate-slide-in-up delay-600' : 'opacity-0'} group relative overflow-hidden magic-btn-hover animate-pulse-button`}>
                        <span className="relative z-10">Send Message</span>
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
                <div className={`mt-12 text-gray-700 dark:text-gray-300 space-y-5 ${inView ? 'animate-slide-in-up delay-700' : 'opacity-0'} font-body`}>
                    <div className="flex items-center justify-center text-xl">
                        <LocateFixed size={28} className="mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Head Office:</strong> 10 Julius Berger Road, Swali, Yenegoa. Nigeria.</p>
                    </div>
                    <div className="flex items-center justify-center text-xl">
                        <Phone size={28} className="mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Reservations:</strong>0913 177 6509</p>
                    </div>
                    <div className="flex items-center justify-center text-xl">
                        <Mail size={28} className="mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Email:</strong> admin@oxbowlakehotel.com.ng</p>
                    </div>
                    <div className="flex items-center justify-center text-xl">
                        <Mail size={28} className="mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Email:</strong> info@oxbowlakehotel.com.ng</p>
                    </div>
                    <div className="flex items-center justify-center text-xl">
                        <Mail size={28} className="mr-4 text-blue-600 dark:text-blue-400" />
                        <p><strong>Email:</strong> support@oxbowlakehotel.com.ng</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
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
