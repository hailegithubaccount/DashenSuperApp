// Screens/QrPaymentScreen.js
import React from 'react';
import ReusablePaymentScreen from '../Components/ReusableQRpayemtpage';

const QRTipWithAmount = (props) => {
  return (
    <ReusablePaymentScreen
      {...props}
      title="QR Payment"
      targetScreen="ConfrimScreenForQr"
      showButton={false}
      showModal={false}
      showNextButtonWithModal={true}
      ShowTipBox={true}
     
      
    />
  );
};

export default QRTipWithAmount;
