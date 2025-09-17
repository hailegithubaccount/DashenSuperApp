import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../Components/Colors';
import OtherBanktopbar from '../Components/otherBanktopbar';

const PIN_LENGTH = 6;
const emptyPin = () => Array(PIN_LENGTH).fill('');

const ConfirmTransfer = ({route,navigation}
 ) => {
  const { amount, recipientAccount, recipientName, isBudgetEnabled } =
    route.params || {};
  const [reason, setReason] = useState('');

  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [pin, setPin] = useState(emptyPin());
  const [showPin, setShowPin] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const toggleShowPin = () => setShowPin(prev => !prev);

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const handleKeyPress = key => {
    setPin(prev => {
      const copy = [...prev];
      const firstEmpty = copy.findIndex(d => d === '');
      if (firstEmpty === -1) return copy; // already full
      copy[firstEmpty] = key;
      return copy;
    });
  };

  const handleBackspace = () => {
    setPin(prev => {
      const copy = [...prev];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i] !== '') {
          copy[i] = '';
          break;
        }
      }
      return copy;
    });
  };

  const isPinComplete = pin.every(digit => digit !== '');

  // Open PIN modal and reset pin to empty
  const openPinModal = () => {
    setPin(emptyPin());
    setShowArrow(false);
    setPinModalVisible(true);
    // hide default keyboard if open
    Keyboard.dismiss();
  };

  // Close PIN modal and reset pin
  const closePinModal = () => {
    setPin(emptyPin());
    setShowArrow(false);
    setPinModalVisible(false);
  };

  const handleVerify = () => {
    if (!isPinComplete) {
      Alert.alert(
        'Incomplete PIN',
        `Please enter ${PIN_LENGTH} digits to continue.`,
      );
      return;
    }

    // PIN complete - proceed
    setShowArrow(true);

    // short delay to show arrow/confirmation animation (if any)
    setTimeout(() => {
      // clear and close modal before navigation
      setPin(emptyPin());
      setPinModalVisible(false);

      navigation.navigate('SuccessfulTransaction', {
        amount,
        recipientAccount,
        recipientName,
        isBudgetEnabled,
        reason,
      });

      setShowArrow(false);
    }, 350);
  };

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="Confirm Transfer" />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.coverimage}>
          <Image source={require('../assets/browser-scanner2.png')}
           style={styles.confirmImage} />
        </View>

        <Text style={styles.headerText}>Confirm Transfer</Text>
        <Text style={styles.amountText}>{amount} ETB</Text>

        <Text style={styles.sectionTitle}>Transaction Details</Text>
        <View style={styles.transactionBox}>
          <View style={styles.content}>
            <Text style={styles.firstText}>Sender Account:</Text>
            <Text style={styles.secondText}>Abebe Ayele Girma</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Recipient Account:</Text>
            <Text style={styles.secondText}>{recipientAccount}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Recipient Name:</Text>
            <Text style={styles.secondText}>{recipientName}</Text>
          </View>
          <View style={styles.content}>
                      <Text style={styles.firstText}>Budget Type:</Text>
                      <Text style={styles.secondText}>
                        {isBudgetEnabled ? 'ON Budget' : 'OFF Budget'}
                      </Text>
                    </View>
         

          <View style={styles.content}>
            <Text style={styles.firstText}>Fee:</Text>
            <Text style={styles.secondText}>0.00 ETB</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.secondText}>{amount} ETB</Text>
          </View>
        </View>

        <Text style={styles.label}>Reason</Text>
        <TextInput
          style={styles.reasonBox}
          placeholder="Enter your reason"
          placeholderTextColor="#888"
          value={reason}
          onChangeText={setReason}
        />

        <TouchableOpacity style={styles.confirmButton} onPress={openPinModal}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PIN Modal */}
      <Modal
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
                source={require('../assets/gg_close-o.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Please Verify!</Text>
            <Text style={styles.modalTitle2}>
              Enter Your PIN to confirm the transfer.
            </Text>

            {/* PIN Boxes */}
            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <View
                  key={index}
                  style={[
                    styles.pinBox,
                    // visual hint when incomplete and attempted verify (optional)
                    // you could add conditional red border here when trying to submit incomplete PIN
                  ]}
                >
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
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {showPin ? 'Hide PIN' : 'Show PIN'}
              </Text>
            </TouchableOpacity>

            <Image
              source={require('../assets/ahsar.png')}
              style={styles.asharimage}
            />
          </View>

          {/* Custom Keyboard */}
          <View style={styles.keyboardContainer}>
            {numberKeys.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
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
                  source={require('../assets/arrow.png')}
                  style={{ width: '30%', height: '30%', resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default ConfirmTransfer;

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
    marginTop: 10,
  },
  cancelButton: { padding: 15, borderRadius: 30, alignItems: 'center' },
  confirmText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cancelText: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '10%',
  },
  modalTitle2: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.third,
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  pinText: { fontSize: 22, fontWeight: 'bold' },
  showPinButton: { marginBottom: 20 },
  asharimage: { width: 44, height: 47, alignSelf: 'center', marginBottom: 20 },
  keyboardContainer: {
    width: '100%',
    height: 310,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  key: {
    flex: 1,
    marginHorizontal: 5,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.2)',
    elevation: 1,
  },
  keyText: { fontSize: 20, fontWeight: 'bold' },
  iconsx: { alignSelf: 'flex-end' },
});
