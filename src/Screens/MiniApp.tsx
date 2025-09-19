import React, { useState } from 'react';
import { View, Text } from 'react-native';
import NumberPad from '../Components/NumberPad';
import ReusedAmountScreen from '../Components/ReusedAmountScreen';

const ExampleScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ReusedAmountScreen
        navigation={navigation}   
        route={route}             
        nexttext="sdf"
        showSelectAccounbig={true}
        showkeypad={true}
        amount={amount}          
        setAmount={setAmount}    
      />
    </View>
  );
};

export default ExampleScreen;
