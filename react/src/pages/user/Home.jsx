    // src/App.jsx
    import React, { useState, useEffect } from 'react';
    import Header from '../../components/user/Header.jsx'
    // Import individual components that are directly exported from their files
    import { Hero, AboutUs, BookingForm, Rooms, Gallery, Blog, Testimonials, Contact, ReviewModal, Preloader, HotelLocationsMap } from '../../components/user/Sections.jsx';
    import DiningBar from '../../components/user/DiningBar.jsx'// Correctly import DiningBar from its own file
    import Footer from '../../components/user/Footer.jsx'
    import GlobalStyles from '../../utlis/GlobalStyles.jsx'; // Corrected: utlis instead of utils
    import BookingConfirmation from '../../components/user/BookingConfirmation.jsx';
    import Receipt from '../../components/user/receipt.jsx'; // Corrected: Capital R for Receipt.jsx


    // Main App Component: Manages global states and rendering logic
    const Home = () => {
        const [currentPage, setCurrentPage] = useState('home');
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [isDarkMode, setIsDarkMode] = useState(() => {
            if (typeof window !== 'undefined') {
                const savedMode = localStorage.getItem('theme');
                if (savedMode) return savedMode === 'dark';
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return false;
        });
        const [isLoading, setIsLoading] = useState(true);
        const [showMapScreen, setShowMapScreen] = useState(false);
        const [showReviewModal, setShowReviewModal] = useState(false);

        // New states for booking confirmation and receipt
        const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
        const [currentBookingDetails, setCurrentBookingDetails] = useState(null);
        const [showReceiptModal, setShowReceiptModal] = useState(false);
        const [receiptDetails, setReceiptDetails] = useState(null);

        useEffect(() => {
            const preloaderTimer = setTimeout(() => {
                setIsLoading(false);
                setShowMapScreen(true);
            }, 3000);
            return () => clearTimeout(preloaderTimer);
        }, []);

        useEffect(() => {
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }, [isDarkMode]);

        const scrollToSection = (id) => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setCurrentPage(id);
                setIsMenuOpen(false);
            }
        };

        // Function to handle booking submission from BookingForm
        const handleBookingSubmit = (details) => {
            setCurrentBookingDetails(details);
            setShowBookingConfirmation(true);
        };

        // Function to handle confirmation in BookingConfirmation modal
        const handleConfirmBooking = () => {
            console.log("Booking confirmed, simulating payment and generating receipt...");
            setShowBookingConfirmation(false); // Close confirmation modal

            // Simulate payment and generate receipt details
            const referenceId = `REF-${Math.floor(Math.random() * 1000000)}`;
            const amountPaid = 250000; // Example fixed amount for demonstration in Naira

            setReceiptDetails({
                fullName: currentBookingDetails.guestName || "Guest Name", // Use guestName from bookingDetails
                email: "guest@example.com", // In a real app, you'd get this from a user input form
                roomType: currentBookingDetails.roomType,
                roomNumber: currentBookingDetails.roomNumber, // Pass the room number
                referenceId: referenceId,
                date: currentBookingDetails.checkInDate, // Use check-in date for receipt date
                amountPaid: amountPaid
            });
            setShowReceiptModal(true); // Show the receipt modal
        };

        // Function to handle cancellation in BookingConfirmation modal
        const handleCancelBooking = () => {
            setShowBookingConfirmation(false);
            setCurrentBookingDetails(null);
            console.log("Booking cancelled.");
        };

        // Function to close the receipt modal
        const handleCloseReceipt = () => {
            setShowReceiptModal(false);
            setReceiptDetails(null);
        };

        if (isLoading) {
            return <Preloader />;
        }

        if (showMapScreen) {
            return <HotelLocationsMap onSkipToMain={() => setShowMapScreen(false)} />;
        }

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
                <GlobalStyles /> {/* Apply global styles */}
                <Header
                    scrollToSection={scrollToSection}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    setShowReviewModal={setShowReviewModal}
                />

                <main className="pt-20"> {/* Adjust padding-top based on header height */}
                    <Hero scrollToSection={scrollToSection} />
                    <AboutUs />
                    <Rooms />
                    <DiningBar /> {/* Render DiningBar directly here */}
                    <Gallery />
                    <Blog />
                    <Testimonials />
                    <BookingForm onSubmitBooking={handleBookingSubmit} /> {/* BookingForm moved to its logical place */}
                    <Contact />
                </main>

                <Footer />

                {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}

                {/* Conditional rendering for BookingConfirmation modal */}
                {showBookingConfirmation && currentBookingDetails && (
                    <BookingConfirmation
                        bookingDetails={currentBookingDetails}
                        onConfirmBooking={handleConfirmBooking}
                        onCancelBooking={handleCancelBooking}
                    />
                )}

                {/* Conditional rendering for Receipt modal */}
                {showReceiptModal && receiptDetails && (
                    <Receipt
                        fullName={receiptDetails.fullName}
                        email={receiptDetails.email}
                        roomType={receiptDetails.roomType}
                        roomNumber={receiptDetails.roomNumber} // Pass room number to Receipt
                        referenceId={receiptDetails.referenceId}
                        date={receiptDetails.date}
                        amountPaid={receiptDetails.amountPaid}
                        onClose={handleCloseReceipt} // Pass close function to Receipt
                    />
                )}
            </div>
        );
    };

    export default Home;
    