// Screens/QrPaymentScreen.js
import React from 'react';
import ReusablePaymentScreen from '../Components/ReusableQRpayemtpage';

const QrPaymentScreen = (props) => {
  return (
    <ReusablePaymentScreen
      {...props}
      title="QR Payment"
      targetScreen="ConfirmTransfer"
    />
  );
};

export default QrPaymentScreen;
