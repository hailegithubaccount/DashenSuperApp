// ConfirmBaseScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from './Colors';
import OtherBanktopbar from './otherBanktopbar';
import CustomButton from './CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import PINVerification from '../Components/PinModal';

const PIN_LENGTH = 6;

const ConfirmBaseScreen = ({
  route,
  navigation,
  imageSource,
  showTip = false,
  showreason = false,
  showInputReason = true,
  showLabelReason = false,
  confirmAction = 'modal',
  navigateTo,
  onConfirmed,
}) => {
  const {
    amount,
    recipientAccount,
    recipientName,
    isBudgetEnabled,
    typedTip,
    requestType,
  } = route.params || {};
  const [reason, setReason] = useState('');

  // const [isPinModalVisible, setPinModalVisible] = useState(false);

  // const emptyPin = () => Array(PIN_LENGTH).fill('');
  // const [pin, setPin] = useState(emptyPin());
  // const [showPin, setShowPin] = useState(false);
  // const [showArrow, setShowArrow] = useState(false);

  // const numberKeys = [
  //   ['1', '2', '3'],
  //   ['4', '5', '6'],
  //   ['7', '8', '9'],
  // ];

  // const isPinComplete = pin.every(d => d !== '');

  // const openPinModal = () => {
  //   setPin(emptyPin());
  //   setShowArrow(false);
  //   setPinModalVisible(true);
  //   Keyboard.dismiss();
  // };

  // const closePinModal = () => {
  //   setPin(emptyPin());
  //   setShowArrow(false);
  //   setPinModalVisible(false);
  // };

  // const handleKeyPress = key => {
  //   setPin(prev => {
  //     const copy = [...prev];
  //     const firstEmpty = copy.findIndex(d => d === '');
  //     if (firstEmpty === -1) return copy;
  //     copy[firstEmpty] = key;
  //     return copy;
  //   });
  // };

  // const handleBackspace = () => {
  //   setPin(prev => {
  //     const copy = [...prev];
  //     for (let i = copy.length - 1; i >= 0; i--) {
  //       if (copy[i] !== '') {
  //         copy[i] = '';
  //         break;
  //       }
  //     }
  //     return copy;
  //   });
  // };

  // const toggleShowPin = () => setShowPin(v => !v);

  // const handleVerify = () => {
  //   if (!isPinComplete) {
  //     alert(`Please enter ${PIN_LENGTH} digits.`);
  //     return;
  //   }

  //   setShowArrow(true);

  //   setTimeout(() => {
  //     setShowArrow(false);
  //     setPin(emptyPin());
  //     setPinModalVisible(false);

  //     const paramsToPass = {
  //       amount,
  //       recipientAccount,
  //       recipientName,
  //       isBudgetEnabled,
  //       reason,
  //       typedTip,
  //     };

  //     if (typeof onConfirmed === 'function') {
  //       onConfirmed(paramsToPass);
  //     } else {
  //       navigation.navigate('SuccessfulTransaction', paramsToPass);
  //     }
  //   }, 300);
  // };

  // const handleConfirmPress = () => {
  //   const paramsToPass = {
  //     amount,
  //     recipientAccount,
  //     recipientName,
  //     isBudgetEnabled,
  //     reason,
  //     typedTip,
  //   };

  //   if (requestType === 'qr') {
  //     navigation.navigate('PINConfirmation', paramsToPass);
  //     return;
  //   }

  //   if (requestType !== 'qr') {
  //     openPinModal();
  //   } else {
  //     if (navigateTo) {
  //       navigation.navigate(navigateTo, paramsToPass);
  //     } else {
  //       navigation.navigate('SuccessfulTransaction', paramsToPass);
  //     }
  //   }
  // };

  const [isPinModalVisible, setPinModalVisible] = useState(false);

  const handleConfirmPress = () => {
    const paramsToPass = {
      amount,
      recipientAccount,
      recipientName,
      isBudgetEnabled,
      reason,
      typedTip,
    };

    if (requestType === 'qr') {
      navigation.navigate('PINConfirmation', paramsToPass);
      return;
    }

    setPinModalVisible(true);
  };
  const RowItem = ({ label, value, bold = false }) => (
    <View style={styles.rowItem}>
      <Text style={[styles.firstText, bold && { fontWeight: '600' }]}>
        {label}
      </Text>
      <Text style={[styles.secondText, bold && { fontWeight: '600' }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <OtherBanktopbar title="Confirm Transfer" />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.coverimage}>
          <Image source={imageSource} style={styles.confirmImage} />
        </View>

        <Text style={styles.headerText}>Confirm Transfer</Text>
        <Text style={styles.amountText}>{amount} ETB</Text>

        <Text style={styles.sectionTitle}>Transaction Details</Text>
        <View style={styles.transactionBox}>
          <RowItem label="Sender Account:" value="Abebe Ayele Girma" />
          <RowItem label="Recipient Account:" value={recipientAccount} />
          <RowItem label="Recipient Name:" value={recipientName} />

          {showreason && <RowItem label="Reason:" value={reason || '-'} />}

          <RowItem
            label="Budget Type:"
            value={isBudgetEnabled ? 'ON Budget' : 'OFF Budget'}
          />

          {typedTip !== '' && <RowItem label="Tip:" value={typedTip} />}

          <RowItem label="Fee:" value="0.00 ETB" />
          <RowItem label="Total:" value={`${amount} ETB`} bold={false} />
        </View>

        {showLabelReason && <Text style={styles.label}>Reason</Text>}

        {showInputReason && (
          <TextInput
            style={styles.reasonBox}
            placeholder="Enter your reason"
            placeholderTextColor="#888"
            value={reason}
            onChangeText={setReason}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton title="Confirm" onPress={handleConfirmPress} />
        <CustomButton
          backgroundColor="white"
          title="Cancel"
          textColor="blue"
          onPress={() => navigation.goBack()}
        />
      </View>

      <PINVerification
        visible={isPinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onVerified={() => {
          setPinModalVisible(false);
          navigation.navigate('SuccessfulTransaction', {
            amount,
            recipientAccount,
            recipientName,
            isBudgetEnabled,
            reason,
            typedTip,
          });
        }}
      />

      {/* <Modal
        isVisible={isPinModalVisible}
        onBackdropPress={closePinModal}
        style={styles.modal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.iconsx} onPress={closePinModal}>
              <Image
                source={require('./../assets/gg_close-o.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Please Verify!</Text>
            <Text style={styles.modalTitle2}>
              Enter Your PIN to confirm the transfer.
            </Text>

            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <View key={index} style={styles.pinBox}>
                  <Text style={styles.pinText}>
                    {showArrow ? '->' : showPin ? digit : digit ? '●' : ''}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={toggleShowPin}
              style={styles.showPinButton}
            >
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                {showPin ? 'Hide PIN' : 'Show PIN'}
              </Text>
            </TouchableOpacity>

            <Image
              source={require('./../assets/ahsar.png')}
              style={styles.asharimage}
            />
          </View>

          <View style={styles.keyboardContainer}>
            {numberKeys.map((row, rIdx) => (
              <View key={rIdx} style={styles.row}>
                {row.map(key => (
                  <TouchableOpacity
                    key={key}
                    style={styles.key}
                    onPress={() => handleKeyPress(key)}
                  >
                    <Text style={styles.keyText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <TouchableOpacity style={styles.key} onPress={handleBackspace}>
                <Text style={styles.keyText}>⌫</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.key}
                onPress={() => handleKeyPress('0')}
              >
                <Text style={styles.keyText}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.key,
                  isPinComplete
                    ? { backgroundColor: Colors.primary }
                    : { backgroundColor: '#ccc' },
                ]}
                disabled={!isPinComplete}
                onPress={handleVerify}
              >
                <Image
                  source={require('./../assets/arrow.png')}
                  style={{ width: '30%', height: '30%', resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal> */}
    </View>
  );
};

export default ConfirmBaseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 },
  headerText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  amountText: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sectionTitle: { marginTop: 10, fontSize: 14, fontWeight: '500' },
  coverimage: {
    backgroundColor: '#F3F6FD',
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  confirmImage: { width: 106, height: 105 },
  transactionBox: {
    backgroundColor: '#F0F0F0',
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  firstText: { fontSize: 14, color: '#444' },
  secondText: { fontSize: 16, fontWeight: '700', color: '#000' },
  totalText: { fontSize: 14, fontWeight: 'bold', color: '#474747ff' },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.third,
  },
  reasonBox: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: '20%',
  },
  cancelButton: { padding: 15, borderRadius: 30, alignItems: 'center' },
  confirmText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cancelText: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  /* modal/pin styles */
  // modal: { justifyContent: 'flex-end', margin: 0 },
  // modalContent: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   paddingBottom: 30,
  // },
  // modalTitle: { fontSize: 22, fontWeight: '600', textAlign: 'center' },
  // modalTitle2: { textAlign: 'center', color: Colors.third, marginBottom: 12 },

  // pinContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginVertical: 12,
  // },
  // pinBox: {
  //   width: 45,
  //   height: 55,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#F0F0F0',
  // },
  // pinText: { fontSize: 22, fontWeight: 'bold' },
  // showPinButton: { marginBottom: 12 },
  // asharimage: { width: 44, height: 47, alignSelf: 'center', marginBottom: 12 },

  // keyboardContainer: {
  //   width: '100%',
  //   height: 310,
  //   backgroundColor: '#f0f0f0',
  //   paddingHorizontal: 20,
  //   paddingVertical: 18,
  // },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 10,
  // },
  // key: {
  //   flex: 1,
  //   marginHorizontal: 5,
  //   height: 60,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 0.2,
  //   borderColor: 'rgba(0,0,0,0.2)',
  // },
  // keyText: { fontSize: 20, fontWeight: 'bold' },
  // iconsx: { alignSelf: 'flex-end' },
  // footer: {},
});
