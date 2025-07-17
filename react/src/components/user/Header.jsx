import React, { useState, useEffect } from 'react';
import { Home, Info, Hotel, Utensils, Image, MessageCircle, Phone, Mail, Moon, Sun, Linkedin, Facebook, Rss, Newspaper } from 'lucide-react';

// Navigation Link Component
const NavLink = ({ icon, text, sectionId, scrollToSection, isMobile = false, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (scrollToSection && sectionId) {
            scrollToSection(sectionId);
        }
    };

    return (
        <a
            onClick={handleClick}
            className={`flex items-center font-body font-medium transition duration-300 ease-in-out cursor-pointer group relative overflow-hidden
            ${isMobile ? 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 w-full justify-center' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}
            `}
        >
            {icon && <span className="mr-2 group-hover:animate-bounce-icon-small">{icon}</span>}
            <span className="relative z-10">
                {text}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left nav-link-underline-glow"></span>
            </span>
        </a>
    );
};

// Social Media Icons Component 
export const SocialMediaIcons = ({ isMobile = false }) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'space-x-4'}`}>
        <a href="https://www.facebook.com/share/15ujX1JxHc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110 animate-float-subtle-light delay-200" aria-label="Facebook">
            <Facebook size={isMobile ? 24 : 20} />
        </a>
    </div>
);

// Header Component: Dynamic sizing on scroll, prominent dark mode toggle
const Header = ({ scrollToSection, isMenuOpen, setIsMenuOpen, isDarkMode, setIsDarkMode, setShowReviewModal }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(!scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <header className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl py-4 px-6 md:px-12 fixed w-full z-20 transition-all duration-500 transform ${scrolled ? 'py-3 shadow-2xl border-b border-blue-200/50 dark:border-blue-800/50' : 'py-4'} animate-slide-down`}>
            <nav className="container mx-auto flex justify-between items-center relative">
                {/* Logo Image */}
                <a onClick={() => scrollToSection('home')} className="cursor-pointer flex items-center">
                    <img
                        src="https://i.postimg.cc/xCHnDnb3/IMG-20250617-WA0017.jpg"
                        alt="Oxbow Lake Hotel Logo"
                        className="h-10 w-auto transition-all duration-300 ease-in-out"
                    />
                </a>

                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 md:right-auto md:relative md:top-auto md:translate-y-0 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-md z-30 transform hover:scale-110 active:scale-90 animate-float-subtle-light"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>

                <div className="hidden md:flex items-center space-x-8 ml-auto">
                    <NavLink icon={<Home size={20} />} text="Home" sectionId="home" scrollToSection={scrollToSection} />
                    <NavLink icon={<Hotel size={20} />} text="Rooms" sectionId="rooms" scrollToSection={scrollToSection} />
                    <NavLink icon={<Info size={20} />} text="About Us" sectionId="about" scrollToSection={scrollToSection} />
                    <NavLink icon={<Utensils size={20} />} text="Our Cuisine" sectionId="dining" scrollToSection={scrollToSection} />
                    <NavLink icon={<Image size={20} />} text="Gallery" sectionId="gallery" scrollToSection={scrollToSection} />
                    <NavLink icon={<Newspaper size={20} />} text="Blog" sectionId="blog" scrollToSection={scrollToSection} />
                    <NavLink icon={<MessageCircle size={20} />} text="Reviews" onClick={() => setShowReviewModal(true)} />
                    <NavLink icon={<Phone size={20} />} text="Contact" sectionId="contact" scrollToSection={scrollToSection} />
                </div>

                <div className="flex items-center md:hidden ml-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 dark:text-gray-200 focus:outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 active:scale-90"
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 absolute top-full left-0 w-full shadow-lg py-4 transition-all duration-300 ease-in-out transform origin-top scale-y-100 z-10">
                    <div className="flex flex-col items-center space-y-4">
                        <NavLink icon={<Home size={20} />} text="Home" sectionId="home" scrollToSection={scrollToSection} isMobile />
                        <NavLink icon={<Hotel size={20} />} text="Rooms" sectionId="rooms" scrollToSection={scrollToSection} isMobile />
                        <NavLink icon={<Info size={20} />} text="About Us" sectionId="about" scrollToSection={scrollToSection} isMobile />
                        <NavLink icon={<Utensils size={20} />} text="Our Cuisine" sectionId="dining" scrollToSection={scrollToSection} isMobile />
                        <NavLink icon={<Image size={20} />} text="Gallery" sectionId="gallery" scrollToSection={scrollToSection} isMobile />
                        <NavLink icon={<Newspaper size={20} />} text="Blog" sectionId="blog" scrollToSection={scrollToSection} isMobile />
                        <NavLink icon={<MessageCircle size={20} />} text="Reviews" onClick={() => { setShowReviewModal(true); setIsMenuOpen(false); }} isMobile />
                        <NavLink icon={<Phone size={20} />} text="Contact" sectionId="contact" scrollToSection={scrollToSection} isMobile />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
