import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Assuming X is used for a close button if this were a modal
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient/axiosClient';

const Receipt = ({ fullName, email, roomType, roomNumber, referenceId, date, amountPaid, onClose }) => {
    // // Format date for better readability
    // const transactionDate = new Date().toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // });
    // const checkInDateFormatted = new Date(date).toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // });

    // Generate a simple Invoice Number (for demonstration)
    const invoiceNumber = `INV-${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}-${Math.floor(Math.random() * 9000) + 1000}`;
    const navigate = useNavigate();

    // // Format amount to currency
    // const formattedAmount = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'NGN',
    //     minimumFractionDigits: 2,
    // }).format(amountPaid);

    const handlePrint = () => {
        window.print();
    };

    function redirect(){
        navigate('/');
    }

    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(()=>{
        axiosClient.get(`/admin/show-booking/${id}`)
        .then(({data})=>{
            setBooking(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, [id]);

    if (!booking) return <p>Loading Receipt...</p>

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-4 font-body relative overflow-hidden">
            {/* Subtle background blobs for visual interest */}
            <div className="absolute inset-0 z-0 opacity-5 animate-blob-flow-receipt"></div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-2xl border-4 border-blue-400 dark:border-blue-700 transform scale-95 animate-scale-in-receipt relative z-10 receipt-container-with-watermark">
                {/* Header with Logo and Title */}
                <div className="text-center mb-10 pb-4 border-b border-gray-200 dark:border-gray-700">
                    {/* Oxbow Lake Hotel Logo from URL */}
                    <img
                        src="https://i.postimg.cc/xCHnDnb3/IMG-20250617-WA0017.jpg"
                        alt="Oxbow Lake Hotel Logo"
                        title="Oxbow Lake Hotel Logo"
                        className="mx-auto mb-6 rounded-xl shadow-lg animate-pulse-glow-logo object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x70/3B82F6/FFFFFF?text=Oxbow+Logo"; }}
                    />
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-400 mb-2 font-display animate-text-reveal-gradient-receipt">
                        Oxbow Lake Hotel
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-semibold mb-4 animate-slide-in-up delay-100">
                        Swali Branch - Payment Receipt
                    </p>
                    <div className="w-28 h-1.5 bg-blue-400 dark:bg-blue-600 mx-auto rounded-full animate-fade-in delay-200"></div>
                </div>

                {/* Transaction & Invoice Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-md text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg shadow-sm animate-slide-in-up delay-250">
                        <span className="font-medium">Transaction Date:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{booking.created_at}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg shadow-sm animate-slide-in-up delay-300">
                        <span className="font-medium">Invoice Number:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{invoiceNumber}</span>
                    </div>
                </div>

                {/* Receipt Details Section */}
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-200">
                    {/* <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl shadow-sm animate-slide-in-up delay-350">
                        <span className="font-semibold text-blue-700 dark:text-blue-300">Reference ID:</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{referenceId}</span>
                    </div> */}

                    <div className="flex justify-between items-center p-4 rounded-xl animate-slide-in-up delay-400">
                        <span className="font-semibold">Full Name:</span>
                        <span className="text-gray-800 dark:text-gray-200">{booking.name}</span>
                    </div>

                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl shadow-sm animate-slide-in-up delay-450">
                        <span className="font-semibold text-blue-700 dark:text-blue-300">Email Address:</span>
                        <span className="text-gray-800 dark:text-gray-200">{booking.email}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-xl animate-slide-in-up delay-500">
                        <span className="font-semibold">Room Type:</span>
                        <span className="text-gray-800 dark:text-gray-200">{booking.type}</span>
                    </div>

                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl shadow-sm animate-slide-in-up delay-525">
                        <span className="font-semibold text-blue-700 dark:text-blue-300">Room Number:</span>
                        <span className="text-gray-800 dark:text-gray-200">Assigned upon arrival</span> {/* Display room number */}
                    </div>

                    <div className="flex justify-between items-center p-4 rounded-xl animate-slide-in-up delay-550">
                        <span className="font-semibold">Check-in Date:</span>
                        <span className="text-gray-800 dark:text-gray-200">{booking.check_in}</span>
                    </div>
                </div>

                {/* Total Amount Section */}
                <div className="mt-10 pt-6 border-t-2 border-blue-200 dark:border-blue-700 animate-slide-in-up delay-600">
                    <div className="flex justify-between items-center text-3xl font-extrabold text-blue-800 dark:text-blue-400 animate-pulse-total">
                        <span>Total Amount Paid:</span>
                        <span>{booking.amount_paid}</span>
                    </div>
                </div>

                {/* Footer Message */}
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10 animate-fade-in delay-800">
                    Thank you for choosing Oxbow Lake Hotel, ensure you take a screenshot of this receipt page. We look forward to welcoming you!
                </p>
                <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-3 animate-fade-in delay-900">
                    This is an automated receipt. For any queries, please contact us at info@oxbowlakehotel.com
                </p>

                {/* Print Button - Hidden when printing */}
                <div className="text-center mt-12 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="btn-primary px-8 py-4 text-xl font-bold group relative overflow-hidden magic-btn-hover animate-pulse-button"
                    >
                        <span className="relative z-10">Print Receipt</span>
                    </button>
                    {/* Add a close button if this receipt is meant to be a modal */}
                    {onClose && (
                        <button
                            onClick={()=> {onClose, redirect}}
                            className="ml-4 btn-secondary px-8 py-4 text-xl font-bold group relative overflow-hidden magic-btn-hover"
                        >
                            <span className="relative z-10">Close</span>
                        </button>
                    )}
                </div>
            </div>
            {/* Custom Styles for animations and print media queries */}
            <style>{`
                @keyframes scaleInReceipt {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in-receipt {
                    animation: scaleInReceipt 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }

                @keyframes pulseGlowLogo {
                    0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
                    50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.3); }
                }
                .animate-pulse-glow-logo {
                    animation: pulseGlowLogo 2.5s infinite ease-in-out;
                }

                @keyframes textRevealGradientReceipt {
                    0% { background-position: -200% 0; opacity: 0; }
                    50% { background-position: 100% 0; opacity: 1; }
                    100% { background-position: 200% 0; opacity: 1; }
                }
                .animate-text-reveal-gradient-receipt {
                    background: linear-gradient(90deg, rgba(59,130,246,0) 0%, #3B82F6 20%, rgba(59,130,246,0) 80%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 200% 100%;
                    animation: textRevealGradientReceipt 2s ease-out forwards;
                }
                .dark .animate-text-reveal-gradient-receipt {
                    background: linear-gradient(90deg, rgba(96,165,250,0) 0%, #60A5FA 20%, rgba(96,165,250,0) 80%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                @keyframes pulseTotal {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.02); opacity: 0.95; }
                }
                .animate-pulse-total {
                    animation: pulseTotal 1.5s infinite ease-in-out;
                }

                @keyframes blobFlowReceipt {
                    0% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    25% { transform: translate(10%, 5%) scale(1.05); border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%; }
                    50% { transform: translate(0, -10%) scale(0.95); border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%; }
                    75% { transform: translate(-5%, 10%) scale(1.03); border-radius: 40% 60% 60% 40% / 60% 60% 40% 40%; }
                    100% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                }
                .animate-blob-flow-receipt {
                    width: 120%;
                    height: 120%;
                    background: linear-gradient(135deg, rgba(135,206,250,0.1) 0%, rgba(147,112,219,0.1) 100%);
                    filter: blur(60px);
                    animation: blobFlowReceipt 20s infinite ease-in-out;
                    left: -10%;
                    top: -10%;
                    pointer-events: none;
                }

                /* Watermark Styles */
                .receipt-container-with-watermark {
                    position: relative; /* Needed for absolute positioning of watermark */
                    overflow: hidden; /* Ensures watermark doesn't spill out */
                }

                .receipt-container-with-watermark::before {
                    content: "Oxbow Lake Hotel";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-30deg); /* Center and rotate */
                    font-size: 4.5em; /* Larger text */
                    font-weight: 900; /* Extra bold */
                    color: rgba(0, 0, 0, 0.07); /* Slightly more visible light color */
                    pointer-events: none; /* Allows clicks to pass through */
                    z-index: 0; /* Ensure it's behind content */
                    white-space: nowrap; /* Prevent text wrapping */
                    font-family: 'Playfair Display', serif; /* Use the display font */
                }

                .dark .receipt-container-with-watermark::before {
                    color: rgba(255, 255, 255, 0.07); /* Slightly more visible for dark mode */
                }


                /* Print Styles */
                @media print {
                    body {
                        background: none !important; /* Remove background for print */
                        color: #000 !important; /* Ensure black text for print */
                    }
                    .print\\:hidden {
                        display: none !important; /* Hide print button */
                    }
                    /* Remove shadows, borders, and animations for a clean print */
                    .shadow-2xl, .shadow-lg, .shadow-md, .shadow-sm {
                        box-shadow: none !important;
                    }
                    .border-4, .border-b, .border-t, .border {
                        border: none !important;
                    }
                    .rounded-3xl, .rounded-xl, .rounded-lg, .rounded-md, .rounded-full {
                        border-radius: 0 !important;
                    }
                    .animate-scale-in-receipt, .animate-pulse-glow-logo,
                    .animate-text-reveal-gradient-receipt, .animate-pulse-total,
                    .animate-slide-in-up, .animate-fade-in, .animate-blob-flow-receipt {
                        animation: none !important;
                        transition: none !important;
                        transform: none !important;
                        opacity: 1 !important;
                    }
                    .bg-gray-100, .dark\\:bg-gray-900, .bg-white, .dark\\:bg-gray-800,
                    .bg-blue-50, .dark\\:bg-blue-900\\/30, .bg-gray-50, .dark\\:bg-gray-700\\/50 {
                        background-color: transparent !important;
                    }
                    .text-blue-800, .dark\\:text-blue-400, .text-blue-700, .dark\\:text-blue-300 {
                        color: #000 !important; /* Ensure all text is black */
                    }
                    .dark\\:text-gray-100, .dark\\:text-gray-200, .dark\\:text-gray-300, .dark\\:text-gray-400 {
                        color: #000 !important;
                    }
                    /* Ensure text gradients are solid black for print */
                    .animate-text-reveal-gradient-receipt {
                        -webkit-text-fill-color: #000 !important;
                        background: none !important;
                    }
                    /* Watermark for print */
                    .receipt-container-with-watermark::before {
                        color: rgba(0, 0, 0, 0.12) !important; /* Slightly more visible for print */
                        font-size: 3.8em !important; /* Adjust size for print */
                    }
                }
            `}</style>
        </div>
    );
};

export default Receipt;
