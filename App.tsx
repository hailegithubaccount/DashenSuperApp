import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from './src/Navigators/TabNavigators';

import OpenScreens from './src/Screens/OpemScreens';
import { CartProvider } from './src/Context/CartContext';
import SignupScreens from './src/Screens/SignupScreens';
import CreateAccountScreen from './src/Screens/CreateAccountScreen';
import VerificationScreen from './src/Screens/VerficationcodeScreen';
import NewPinScreen from './src/Screens/NewPin';
import ConfirmScreen from './src/Screens/Confirmscreen';
import SendToOtherBank from './src/Screens/SendToOtherBank';
import EnterAccountNumber from './src/Screens/AccountNumber';
import TypeMoneyScreen from './src/Screens/TypeMoneyScreen';
import ConfirmTransfer from './src/Screens/ConfirmTransfer';
import SuccessfulTransaction from './src/Screens/SuccessfulTransaction';
import QrScreen from './src/Screens/QrScreen';
import QrWithAmount from './src/Screens/QrWithAmount'
import MerchantPaymentScreen from './src/Screens/MerchantPaymentScreen';
import ConfrimScreenForQr from './src/Screens/ConfrimScreenForQr';
import PINConfirmation from './src/Screens/PINConfirmation';
import QRTipWithAmount from './src/Screens/QRTipWithAmount';
import AmountScreen from './src/Screens/AmountScreen';
import MiniApp from './src/Screens/MiniApp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="Open" component={OpenScreens} /> */}
          <Stack.Screen
            name="Tab"
            component={Tab}
           
          />
          <Stack.Screen name="SignUp" component={SignupScreens} />
          <Stack.Screen name="AccountCreate" component={CreateAccountScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="NewPin" component={NewPinScreen} />
          <Stack.Screen name="Confirm" component={ConfirmScreen} />
          <Stack.Screen name="SendOtherBank" component={SendToOtherBank} />
          <Stack.Screen
            name="EnterAccountNumber"
            component={EnterAccountNumber}
          />
          <Stack.Screen name="TypeMoneyScreen" component={TypeMoneyScreen} />
          <Stack.Screen name="ConfirmTransfer" component={ConfirmTransfer} />
          <Stack.Screen
            name="SuccessfulTransaction"
            component={SuccessfulTransaction}
          />
          <Stack.Screen name="QrScreen" component={QrScreen} />
          <Stack.Screen name="QrWithAmount" component={QrWithAmount} />
          <Stack.Screen
            name="MerchantPaymentScreen"
            component={MerchantPaymentScreen}
          />
          <Stack.Screen name="ConfrimScreenForQr" component={ConfrimScreenForQr} />
          <Stack.Screen name="PINConfirmation" component={PINConfirmation} />
          <Stack.Screen name="QRTipWithAmount" component={QRTipWithAmount } />
          <Stack.Screen name="AmountScreen" component={AmountScreen} />
          <Stack.Screen name="MiniApp" component={MiniApp} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
