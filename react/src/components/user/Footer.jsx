import React from 'react';
import { Linkedin, Facebook, Rss, MapPin, Phone, Mail, Instagram } from 'lucide-react'; // Added MapPin, Phone, Mail, and Instagram

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-950 text-gray-200 py-16 px-6 md:px-12 transition-colors duration-500 shadow-inner-top relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-reverse"></div> {/* Subtle blob background */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-center md:text-left relative z-10">
                {/* About Us */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-extrabold text-blue-400 mb-5 font-display animate-fade-in-up">Oxbow Lake Hotel</h3>
                    <p className="text-md leading-relaxed font-body animate-slide-in-up delay-100">
                        Experience unparalleled luxury and serene comfort at Oxbow Lake Hotel. Your perfect getaway awaits.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-blue-300 mb-5 font-display animate-fade-in-up delay-200">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><a href="#about" className="footer-link">About Us</a></li>
                        <li><a href="#rooms" className="footer-link">Rooms & Suites</a></li>
                        <li><a href="#dining" className="footer-link">Dining & Bar</a></li>
                        <li><a href="#gallery" className="footer-link">Gallery</a></li>
                        <li><a href="#blog" className="footer-link">Blog</a></li>
                        <li><a href="#contact" className="footer-link">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-blue-300 mb-5 font-display animate-fade-in-up delay-400">Get in Touch</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-center md:justify-start footer-contact-item">
                            <Phone size={20} className="mr-3 text-blue-400" />
                            <span>0913 177 6509</span>
                        
                        </li>
                        <li className="flex items-center justify-center md:justify-start footer-contact-item">
                            <Mail size={20} className="mr-3 text-blue-400" />
                            <span>info@oxbowlakehotel.com.ng, admin@oxbowlakehotel.com.ng, support@oxbowlakehotel.com.ng</span>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-blue-300 mb-5 font-display animate-fade-in-up delay-600">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <a href="https://www.facebook.com/share/15ujX1JxHc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110 animate-float-subtle-light" aria-label="Facebook">
                            <Facebook size={32} />
                        </a>
                        <a href="https://www.instagram.com/oxbowlakehotel?igsh=MWZ6bG11ems4dWV5dg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110 animate-float-subtle-light delay-200" aria-label="Instagram">
                            {/* Using Lucide-React Instagram icon if available, or keep SVG */}
                            <Instagram size={32} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm animate-fade-in-up delay-800">
                &copy; {new Date().getFullYear()} Oxbow Hotel. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
