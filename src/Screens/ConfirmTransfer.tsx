// ConfirmTransaction.js
import React from 'react';
import ConfirmBaseScreen from '../Components/ReusableConfrim';

const ConfirmTransaction = props => (
  <ConfirmBaseScreen
    {...props}
    imageSource={require('../assets/browser-scanner2.png')}
    showTip={false}
    showreason={false}
    confirmAction="modal"
    onConfirmed={params =>
      props.navigation.navigate('SuccessfulTransaction', params)
    }
  />
);

export default ConfirmTransaction;
