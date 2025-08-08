import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ myObject, onSuccess}) => {
  const publicKey = myObject.branch === 'swali' ? "pk_live_0f5dbd24809f5b1488cbdeea1523a6a30d43b612" : "pk_live_2175b96d7806572dbc2d070dbbf1ff8f1bb3f1ba";

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