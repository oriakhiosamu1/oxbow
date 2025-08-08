// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import Header from '../../components/user/Header.jsx';
// // Removed HotelLocationsMap from the import list
// import { Hero, AboutUs, BookingForm, Rooms, Gallery, Blog, Testimonials, Contact, ReviewModal } from '../../components/user/Sections.jsx';
// import DiningBar from '../../components/user/DiningBar.jsx'; // Correctly import DiningBar from its own file
// import Footer from '../../components/user/Footer.jsx';
// import GlobalStyles from '../../utlis/GlobalStyles.jsx'; // Corrected: utlis instead of utils
// import BookingConfirmation from '../../components/user/BookingConfirmation.jsx';
// import Receipt from '../../components/user/receipt.jsx'; // Corrected: Capital R for Receipt.jsx


// // Main App Component: Manages global states and rendering logic
// const App = () => {
//     const [currentPage, setCurrentPage] = useState('home');
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isDarkMode, setIsDarkMode] = useState(() => {
//         if (typeof window !== 'undefined') {
//             const savedMode = localStorage.getItem('theme');
//             if (savedMode) return savedMode === 'dark';
//             return window.matchMedia('(prefers-color-scheme: dark)').matches;
//         }
//         return false;
//     });
//     // Removed isLoading state
//     // const [isLoading, setIsLoading] = useState(true);
//     // Removed showMapScreen state as HotelLocationsMap is removed
//     // const [showMapScreen, setShowMapScreen] = useState(false); // This state is no longer needed if HotelLocationsMap is removed
//     const [showReviewModal, setShowReviewModal] = useState(false);

//     // New states for booking confirmation and receipt
//     const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
//     const [currentBookingDetails, setCurrentBookingDetails] = useState(null);
//     const [showReceiptModal, setShowReceiptModal] = useState(false);
//     const [receiptDetails, setReceiptDetails] = useState(null);

//     // Removed the useEffect that handled preloader/map timing
//     // useEffect(() => {
//     //     const preloaderTimer = setTimeout(() => {
//     //         setIsLoading(false);
//     //     }, 3000);
//     //     return () => clearTimeout(preloaderTimer);
//     // }, []);

//     useEffect(() => {
//         if (isDarkMode) {
//             document.documentElement.classList.add('dark');
//             localStorage.setItem('theme', 'dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//             localStorage.setItem('theme', 'light');
//         }
//     }, [isDarkMode]);

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.innerHTML = `
//             var _smartsupp = _smartsupp || {};
//             _smartsupp.key = 'b85d3a3c899f5d567c803d3d87ce674fd4f0727d';
//             window.smartsupp||(function(d) {
//                 var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
//                 s=d.getElementsByTagName('script')[0];c=d.createElement('script');
//                 c.type='text/javascript';c.charset='utf-8';c.async=true;
//                 c.src='https://www.smartsuppchat.com/loader.js?';
//                 s.parentNode.insertBefore(c,s);
//             })(document);
//         `;
//         document.body.appendChild(script);
//     }, []);


//     const scrollToSection = (id) => {
//         const element = document.getElementById(id);
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//             setCurrentPage(id);
//             setIsMenuOpen(false);
//         }
//     };

//     // Function to handle booking submission from BookingForm
//     const handleBookingSubmit = (details) => {
//         setCurrentBookingDetails(details);
//         setShowBookingConfirmation(true);
//     };

//     // Function to handle confirmation in BookingConfirmation modal
//     const handleConfirmBooking = () => {
//         console.log("Booking confirmed, simulating payment and generating receipt...");
//         setShowBookingConfirmation(false); // Close confirmation modal

//         // Simulate payment and generate receipt details
//         const referenceId = `REF-${Math.floor(Math.random() * 1000000)}`;
//         const amountPaid = 250000; // Example fixed amount for demonstration in Naira

//         setReceiptDetails({
//             fullName: currentBookingDetails.guestName || "Guest Name", // In a real app, you'd get this from a user input form
//             email: "guest@example.com", // In a real app, you'd get this from a user input form
//             roomType: currentBookingDetails.roomType,
//             roomNumber: currentBookingDetails.roomNumber, // Pass the room number
//             referenceId: referenceId,
//             date: currentBookingDetails.checkInDate, // Use check-in date for receipt date
//             amountPaid: amountPaid
//         });
//         setShowReceiptModal(true); // Show the receipt modal
//     };

//     // Function to handle cancellation in BookingConfirmation modal
//     const handleCancelBooking = () => {
//         setShowBookingConfirmation(false);
//         setCurrentBookingDetails(null);
//         console.log("Booking cancelled.");
//     };

//     // Function to close the receipt modal
//     const handleCloseReceipt = () => {
//         setShowReceiptModal(false);
//         setReceiptDetails(null);
//     };

//     // Removed the conditional rendering for isLoading
//     // if (isLoading) {
//     //     return <Preloader />;
//     // }

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
//             <GlobalStyles /> {/* Apply global styles */}
//             <Header
//                 scrollToSection={scrollToSection}
//                 isMenuOpen={isMenuOpen}
//                 setIsMenuOpen={setIsMenuOpen}
//                 isDarkMode={isDarkMode}
//                 setIsDarkMode={setIsDarkMode}
//                 setShowReviewModal={setShowReviewModal}
//             />

//             <main className="pt-20"> {/* Adjust padding-top based on header height */}
//                 <Hero scrollToSection={scrollToSection} />
//                 <AboutUs />
//                 {/* Moved BookingForm here to appear immediately after About Us */}
//                 <BookingForm onSubmitBooking={handleBookingSubmit} />
//                 <Rooms />
//                 <DiningBar /> {/* Render DiningBar directly here */}
//                 <Gallery />
//                 <Blog />
//                 <Testimonials />
//                 <Contact />
//             </main>

//             <Footer />

//             {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}

//             {/* Conditional rendering for BookingConfirmation modal */}
//             {showBookingConfirmation && currentBookingDetails && (
//                 <BookingConfirmation
//                     bookingDetails={currentBookingDetails}
//                     onConfirmBooking={handleConfirmBooking}
//                     onCancelBooking={handleCancelBooking}
//                 />
//             )}

//             {/* Conditional rendering for Receipt modal */}
//             {showReceiptModal && receiptDetails && (
//                 <Receipt
//                     fullName={receiptDetails.fullName}
//                     email={receiptDetails.email}
//                     roomType={receiptDetails.roomType}
//                     roomNumber={receiptDetails.roomNumber} // Pass room number to Receipt
//                     referenceId={receiptDetails.referenceId}
//                     date={receiptDetails.date}
//                     amountPaid={receiptDetails.amountPaid}
//                     onClose={handleCloseReceipt} // Pass close function to Receipt
//                 />
//             )}
//         </div>
//     );
// };

// export default App;



















// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/user/Header.jsx';
import { Hero, AboutUs, BookingForm, Rooms, Gallery, Blog, Testimonials, Contact, ReviewModal } from '../../components/user/Sections.jsx';
import DiningBar from '../../components/user/DiningBar.jsx'; // Correctly import DiningBar from its own file
import Footer from '../../components/user/Footer.jsx';
import GlobalStyles from '../../utlis/GlobalStyles.jsx'; // Corrected: utlis instead of utils
import BookingConfirmation from '../../components/user/BookingConfirmation.jsx';
import Receipt from '../../components/user/receipt.jsx'; // Corrected: Capital R for Receipt.jsx
import RoomDetailModal from '../../components/user/RoomDetailModal.jsx'; 


// Main App Component: Manages global states and rendering logic
// Main App Component: Manages global states and rendering logic
const App = () => {
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
    const [showReviewModal, setShowReviewModal] = useState(false);

    // NEW: States for the Room Detail Modal
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    // New states for booking confirmation and receipt
    const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
    const [currentBookingDetails, setCurrentBookingDetails] = useState(null);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [receiptDetails, setReceiptDetails] = useState(null);

    // Effect for handling the theme
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Effect for scrolling to a section if a hash is present in the URL
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const scrollToHash = () => {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Try again if the element isn't available yet
                    setTimeout(scrollToHash, 100);
                }
            };
            scrollToHash();
        }
    }, []);

    // Function to handle smooth scrolling to any section by its ID
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setCurrentPage(id);
            setIsMenuOpen(false);
        }
    };

    // NEW: Function to open the room modal with specific room data
    const openRoomModal = (room) => {
        setSelectedRoom(room);
        setIsRoomModalOpen(true);
    };

    // NEW: Function to close the room modal
    const closeRoomModal = () => {
        setIsRoomModalOpen(false);
        setSelectedRoom(null);
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
            fullName: currentBookingDetails.guestName || "Guest Name", // In a real app, you'd get this from a user input form
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
                <BookingForm onSubmitBooking={handleBookingSubmit} />
                <Rooms openRoomModal={openRoomModal} /> {/* NEW: Pass the openRoomModal function to the Rooms component */}
                <DiningBar />
                <Gallery />
                <Blog />
                <Testimonials />
                <Contact />
            </main>

            <Footer />

            {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}

            {/* NEW: Conditional rendering for the Room Detail Modal. It will only show if a room is selected. */}
            {isRoomModalOpen && selectedRoom && (
                <RoomDetailModal room={selectedRoom} onClose={closeRoomModal} scrollToBookingForm={scrollToSection} />
            )}

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
                    roomNumber={receiptDetails.roomNumber}
                    referenceId={receiptDetails.referenceId}
                    date={receiptDetails.date}
                    amountPaid={receiptDetails.amountPaid}
                    onClose={handleCloseReceipt}
                />
            )}
        </div>
    );
};

export default App;
