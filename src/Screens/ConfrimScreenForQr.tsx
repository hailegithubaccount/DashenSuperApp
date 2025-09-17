// ConfirmScreenForQr.js
import React from 'react';
import ConfirmBaseScreen from '../Components/ReusableConfrim';

const ConfirmScreenForQr = props => (
  <ConfirmBaseScreen
    {...props}
    imageSource={require('../assets/icooo.png')}
    showTip={true}
    showreason={true}
    confirmAction="navigate"
    navigateTo="PINConfirmation" // will navigate with params + reason
  />
);

export default ConfirmScreenForQr;
