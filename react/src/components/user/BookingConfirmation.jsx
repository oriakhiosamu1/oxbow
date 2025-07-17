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
    // const retrievedData = localStorage.getItem('availabilityCheckResult');
    // if(retrievedData){
    //     setMyObject(JSON.parse(retrievedData)); 
    // }
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-2xl border-4 border-green-400 dark:border-green-700 transform scale-95 animate-scale-in transition-all duration-500 booking-confirm-glow">
                <div className="text-center mb-8">
                    <CheckCircle size={64} className="text-green-600 dark:text-green-400 mx-auto mb-4 animate-pop-in-bounce" />
                    <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-400 mb-2 font-display animate-text-reveal-gradient">
                        Confirm Your Booking
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-body animate-slide-in-up delay-100">
                        Please review your reservation details below.
                    </p>
                </div>

                <div className="space-y-6 mb-10 text-gray-700 dark:text-gray-200 text-xl">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl shadow-sm animate-slide-in-up delay-200">
                        <span className="font-semibold flex items-center"><Hotel size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Branch:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.branch || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl animate-slide-in-up delay-250">
                        <span className="font-semibold flex items-center"><Hotel size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Room Type:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.type || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl shadow-sm animate-slide-in-up delay-275"> {/* Added new delay */}
                        <span className="font-semibold flex items-center"><Hotel size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Room Number:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">Assigned at Check-in</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl animate-slide-in-up delay-300">
                        <span className="font-semibold flex items-center"><Calendar size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Check-in:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.check_in ? new Date(myObject.check_in).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl shadow-sm animate-slide-in-up delay-350">
                        <span className="font-semibold flex items-center"><Calendar size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Check-out:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.check_out ? new Date(myObject.check_out).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl animate-slide-in-up delay-400">
                        <span className="font-semibold flex items-center"><Users size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Number of Nights:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{myObject.number_of_days}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl shadow-sm animate-slide-in-up delay-450">
                        <span className="font-semibold flex items-center"><DollarSign size={20} className="mr-2 text-blue-600 dark:text-blue-400" /> Estimated Total:</span>
                        <span className="font-extrabold text-blue-600 dark:text-blue-400 text-2xl animate-pulse-total">{myObject.amountToPay}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-in-up delay-500">
                    <PaystackPayment myObject={myObject} onSuccess={handleSuccess} />
                    <button
                        onClick={onCancelBooking}
                        style={{ backgroundColor: '#2563eb', color: 'white' }}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 border-2 border-red-400 dark:border-red-600 animate-pulse-button-red"
                    >
                        Cancel Booking
                    </button>
                </div>
                <ToastContainer />
            </div>
            {/* Custom Styles for animations */}
            <style jsx>{`
                @keyframes bookingConfirmGlow {
                    0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
                    50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8), 0 0 50px rgba(16, 185, 129, 0.3); }
                }
                .booking-confirm-glow {
                    animation: bookingConfirmGlow 3s infinite alternate;
                }

                @keyframes pulseButtonRed {
                    0% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                    50% { transform: scale(1.02); box-shadow: 0 8px 12px rgba(0,0,0,0.2); }
                    100% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                }
                .animate-pulse-button-red { animation: pulseButtonRed 2s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default BookingConfirmation;
