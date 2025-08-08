import React, { useState } from 'react';
import { Hotel, Calendar, Users, DollarSign, CheckCircle } from 'lucide-react'; // DollarSign icon will be used, but currency symbol changed
import axiosClient from '../../axiosClient/axiosClient';
import PaystackPayment from '../paystack/PaystackPayment';
import {useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const BookingConfirmation = ({ bookingDetails = {}, onConfirmBooking, onCancelBooking }) => { // Added default empty objectr

    const [myObject, setMyObject] = useState(()=> {
        const savedData = localStorage.getItem('availabilityCheckResult');
        return savedData ? JSON.parse(savedData) : {name:'', email:'', check_in:'', check_out:'', branch: '', type:'', room:{}, booking: {}}
    });
    const navigate = useNavigate();
    console.log(myObject);

    const handleSuccess = async (reference) => {
        try{

            const response = await axiosClient.post('/verify/payment', {reference, myObject});

            if(response.data.status === 'success'){
                toast('Booking Successful!');
                localStorage.removeItem('availabilityCheckResult')
                const bookingId = response.data.booking.id;
                navigate(`/receipt/${bookingId}`);
            }else{
                toast('Payment Verification Failed');
            }

            console.log('Booking created: ', response.data);
        }catch(error){
            toast('Error verifying payment');
            console.error(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-2 sm:p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg border-2 sm:border-4 border-green-400 dark:border-green-700 transform scale-95 animate-scale-in transition-all duration-500 booking-confirm-glow">
                <div className="text-center mb-4 sm:mb-6">
                    <CheckCircle size={48} className="text-green-600 dark:text-green-400 mx-auto mb-2 sm:mb-4 animate-pop-in-bounce" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 dark:text-blue-400 mb-1 sm:mb-2 font-display animate-text-reveal-gradient">
                        Confirm Your Booking
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-body animate-slide-in-up delay-100">
                        Please review your reservation details below.
                    </p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 sm:p-3 rounded-lg shadow-sm animate-slide-in-up delay-200">
                        <span className="font-semibold flex items-center"><Hotel size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Branch:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.branch || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg animate-slide-in-up delay-250">
                        <span className="font-semibold flex items-center"><Hotel size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Room Type:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.type || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 sm:p-3 rounded-lg shadow-sm animate-slide-in-up delay-275">
                        <span className="font-semibold flex items-center"><Hotel size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Room Number:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">Assigned at Check-in</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg animate-slide-in-up delay-300">
                        <span className="font-semibold flex items-center"><Calendar size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Check-in:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.check_in ? new Date(myObject.check_in ).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 sm:p-3 rounded-lg shadow-sm animate-slide-in-up delay-350">
                        <span className="font-semibold flex items-center"><Calendar size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Check-out:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.check_out ? new Date(myObject.check_out).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg animate-slide-in-up delay-400">
                        <span className="font-semibold flex items-center"><Users size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Nights:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.number_of_days}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-2 sm:p-3 rounded-lg shadow-sm animate-slide-in-up delay-450">
                        <span className="font-semibold flex items-center"><DollarSign size={16} className="mr-1 sm:mr-2 text-blue-600 dark:text-blue-400" /> Estimated Total:</span>
                        <span className="font-extrabold text-blue-600 dark:text-blue-400 text-lg sm:text-xl animate-pulse-total">{myObject.amountToPay}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-slide-in-up delay-500">
                    <PaystackPayment myObject={myObject} onSuccess={handleSuccess} />
                    <button
                        onClick={onCancelBooking}
                        style={{ backgroundColor: '#2563eb', color: 'white' }}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 border-2 border-red-400 dark:border-red-600 text-sm sm:text-base animate-pulse-button-red"
                    >
                        Cancel Booking
                    </button>
                </div>
                <ToastContainer />
            </div>
            {/* Custom Styles for animations */}
            <style>{`
                @keyframes bookingConfirmGlow {
                    0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.4); }
                    50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.7), 0 0 30px rgba(16, 185, 129, 0.2); }
                }
                .booking-confirm-glow {
                    animation: bookingConfirmGlow 3s infinite alternate;
                }

                @keyframes pulseButtonRed {
                    0% { transform: scale(1); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    50% { transform: scale(1.01); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
                    100% { transform: scale(1); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                }
                .animate-pulse-button-red { animation: pulseButtonRed 2s infinite ease-in-out; }

                /* Ensure these are also defined in your global styles if not already */
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }

                @keyframes pop-in-bounce {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.2); opacity: 1; }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                .animate-pop-in-bounce { animation: pop-in-bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

                @keyframes slide-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }

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

                @keyframes pulse-total {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                }
                .animate-pulse-total { animation: pulse-total 1.5s infinite ease-in-out; }

                /* Delay animations (ensure these are in your global styles or main App.jsx if used elsewhere) */
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-250 { animation-delay: 250ms; }
                .delay-275 { animation-delay: 275ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-350 { animation-delay: 350ms; }
                .delay-400 { animation-delay: 400ms; }
                .delay-450 { animation-delay: 450ms; }
                .delay-500 { animation-delay: 500ms; }

                /* Magic button hover styles (ensure these are in your global styles or main App.jsx if used elsewhere) */
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
                .animate-pulse-button { animation: pulseButtonRed 2s infinite ease-in-out; } /* Reusing pulseButtonRed for btn-primary too */
            `}</style>
        </div>
    );
};

export default BookingConfirmation;
