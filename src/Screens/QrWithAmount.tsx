import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReusableQRpayemtpage from '../Components/ReusableQRpayemtpage'

const QrWithAmount = () => {
  return (
    <View>
      <ReusableQRpayemtpage
    
      ShowButton={true}
      ShowModal={true}
      ShowNextButtonWithModal={false}

      />
      
    </View>
  )
}

export default QrWithAmount

const styles = StyleSheet.create({})


























// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   TextInput,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Touchable,
//   TouchableOpacity,
//   Switch,
//   PanResponder,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';
// import OtherBanktopbar from '../Components/otherBanktopbar';
// import AccountSelector from '../Components/reusedSelectAccount';
// import Colors from '../Components/Colors';
// import CustomButton from '../Components/CustomButton';
// import CustomTextInput from '../Components/TextInput';
// import NextButtonWithModal from '../Components/nextButtonwithModal';

// const PaymentScreen = ({ route, navigation }) => {
//   const { amount: scannedAmount, recipient } = route.params || {};
//   const [account, setAccount] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(prev => !prev);

//   const openPinModal = () => {
//     setModalVisible(true);
//   };
//   const [inputValue, setInputValue] = useState('');

//   useFocusEffect(
//     useCallback(() => {
//       setModalVisible(false);
//     }, []),
//   );

//   const presetPrices = ['10.00', '25.00', '50.00', '100.00'];

//   const handleBoxPress = (price: React.SetStateAction<string>) => {
//     setInputValue(price);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <OtherBanktopbar title="QR Payment" />

//           {/* Scrollable Content */}
//           <ScrollView
//             style={{ marginHorizontal: 16 }}
//             contentContainerStyle={{ paddingBottom: 120 }}
//           >
//             <View style={styles.bothtext}>
//               <Text style={styles.firsttext}>Select Account</Text>
//               <Text style={styles.SecondText}>
//                 Select your account and confirm payment
//               </Text>
//             </View>

//             <View>
//               <Text style={{ marginBottom: 5 }}>Account Number</Text>
//               <AccountSelector
//                 placeholder="-Select"
//                 width={320}
//                 height={50}
//                 justifyContent="space-between"
//                 selectedAccount={account}
//                 onSelect={value => setAccount(value)}
//               />

//               <Text style={styles.amounttext}>{scannedAmount} Birr</Text>
//               <Text style={{ alignSelf: 'center', color: '#929292' }}>
//                 Available in Main Account:{' '}
//                 <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
//                   ETB 20,000.00
//                 </Text>
//               </Text>
//             </View>
//           </ScrollView>

//           {/* Fixed Bottom Button */}
//           {ShowModal &&(
//           <View style={styles.bottomButton}>
//             <CustomButton title="Next" onPress={openPinModal} width="95%" />
//           </View>

//           {/* Modal with KeyboardAvoidingView */}
//           <Modal
//             visible={modalVisible}
//             transparent
//             animationType="slide"
//             onRequestClose={() => setModalVisible(false)}
//             // onBackdropPress={() => setModalVisible(false)}
//           >
//             <KeyboardAvoidingView
//               style={{ flex: 1 }}
//               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             >
//               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: 'flex-end',
//                     backgroundColor: 'rgba(0,0,0,0.5)',
//                   }}
//                 >
//                   <View style={styles.modalContent}>
//                     <View>
//                       <View style={styles.buttonwithtext}>
//                         <Text style={{ fontSize: 20, color: Colors.primary }}>
//                           Give A Tip
//                         </Text>
//                         <TouchableOpacity style={styles.skip}>
//                           <Text
//                             style={{
//                               paddingHorizontal: 12,
//                               paddingVertical: 5,
//                               borderRadius: 10,
//                               backgroundColor: '#F0F4FF',
//                             }}
//                           >
//                             skip
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           gap: 6,
//                           alignItems: 'center',
//                           marginVertical: 10,
//                         }}
//                       >
//                         <Text style={{ fontSize: 16 }}>
//                           Tip selection on Transfers
//                         </Text>
//                         <Switch
//                           trackColor={{
//                             false: Colors.primary,
//                             true: Colors.primary,
//                           }}
//                           thumbColor={'#f4f3f4'}
//                           ios_backgroundColor="#3e3e3e"
//                           onValueChange={toggleSwitch}
//                           value={isEnabled}
//                         />
//                       </View>

//                       <View
//                         style={{
//                           backgroundColor: '#F0F4FF',
//                           borderRadius: 15,
//                         }}
//                       >
//                         <Text
//                           style={{
//                             marginHorizontal: 10,
//                           }}
//                         >
//                           Custom Tip
//                         </Text>
//                         <CustomTextInput
//                           label={null}
//                           placeholder={'0.00'}
//                           keyboardType="numeric"
//                           value={String(inputValue)} // ensure it's always a string
//                           onChangeText={text => setInputValue(text)}
//                           borderRadius={20}
//                           marginTop={5}
//                         />
//                         <View style={styles.boxesContainer}>
//                           {presetPrices.map(price => (
//                             <TouchableOpacity
//                               key={price}
//                               style={[
//                                 styles.priceBox,
//                                 inputValue === price && styles.selectedBox,
//                               ]}
//                               onPress={() => setInputValue(price)} // ✅ directly update input
//                             >
//                               <Text
//                                 style={[
//                                   styles.priceText,
//                                   inputValue === price && styles.selectedText,
//                                 ]}
//                               >
//                                 {price} Birr
//                               </Text>
//                             </TouchableOpacity>
//                           ))}
//                         </View>
//                       </View>

//                       <NextButtonWithModal
//                         typedAmount={null}
//                         scannedAmount={scannedAmount}
//                         selectedAccount={account}
//                         recipient={recipient}
//                         navigation={navigation}
//                         tragetScreen="ConfirmTransfer"
//                         marginTop={1}
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </TouchableWithoutFeedback>
//             </KeyboardAvoidingView>
//           </Modal>
//           )}


//             {/*       <NextButtonWithModal
//                         typedAmount={null}
//                         scannedAmount={scannedAmount}
//                         selectedAccount={account}
//                         recipient={recipient}
//                         navigation={navigation}
//                         tragetScreen="ConfirmTransfer"
//                         marginTop={1}
//                       /> */}
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: Colors.secondary },
//   bothtext: { marginHorizontal: 16, marginVertical: 16 },
//   firsttext: { marginTop: 24, fontSize: 28, fontWeight: 'bold' },
//   SecondText: { fontSize: 16, color: '#757575' },
//   amounttext: {
//     alignSelf: 'center',
//     marginTop: 24,
//     fontSize: 36,
//     color: '#989898',
//     fontWeight: 'bold',
//   },
//   bottomButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   modalContent: {
//     marginBottom: 20,
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     fontSize: 18,
//   },
//   buttonwithtext: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   skip: {},
//   boxesContainer: {
//     flexDirection: 'row',
//     gap: 5,
//     padding: 10,
//   },
//   priceBox: {
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     width: '24%',
//     height: 40,
//   },
//   selectedBox: {
//     borderColor: '#007bff', // Change border color for selected box
//     backgroundColor: '#e6f2ff',
//   },
//   priceText: {
//     fontSize: 13,
//     color: Colors.primary,
//     fontWeight: '600',
//     paddingVertical: 10,
//     paddingHorizontal: 2,
//   },
//   selectedText: {
//     color: '#007bff', // Change text color for selected box
//     fontWeight: 'bold',
//   },
// });

// export default PaymentScreen;
