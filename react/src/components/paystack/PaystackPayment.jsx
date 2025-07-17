import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ myObject, onSuccess}) => {
    // const publicKey = "pk_test_b695c08766719774bb0589229cc5eb6d0b3e2373";
    // const publicKey = import.meta.env.VITE_SW_PAYSTACK_PUBLIC_KEY
    const [publicKey, setPublicKey] = useState(import.meta.env.VITE_SW_PAYSTACK_PUBLIC_KEY);

    if(myObject.branch === 'gbarantoru'){
      setPublicKey(import.meta.env.VITE_GB_PAYSTACK_PUBLIC_KEY);
    }

    const componentProps = {
        email: myObject.email,
        amount: myObject.amountToPay * 100,
        metadata: {
            name: myObject.name,
            branch: myObject.branch,
            type: myObject.type,
            days: myObject.number_of_days
        },
        publicKey,
        text: "Book Now!!",
        // onSuccess: () => onSuccess(bookingData),
        onSuccess: (ref) => onSuccess(ref.reference),
        onClose: () => alert('Transaction was not completed, window closed!'),
    };

  return (
    <PaystackButton {...componentProps} />
  );
}

export default PaystackPayment