import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../Components/Colors';

const PIN_LENGTH = 6;
const emptyPin = () => Array(PIN_LENGTH).fill('');

const PinModal = ({ visible, onClose, onVerify }) => {
  const [pin, setPin] = useState(emptyPin());
  const [showPin, setShowPin] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const toggleShowPin = () => setShowPin(prev => !prev);

  const handleKeyPress = key => {
    setPin(prev => {
      const copy = [...prev];
      const firstEmpty = copy.findIndex(d => d === '');
      if (firstEmpty === -1) return copy;
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

  const handleVerifyPress = () => {
    if (!isPinComplete) {
      Alert.alert('Incomplete PIN', `Please enter ${PIN_LENGTH} digits`);
      return;
    }
    setShowArrow(true);

    setTimeout(() => {
      setPin(emptyPin());
      setShowArrow(false);
      onVerify?.(); // call parent action (navigate or API)
      onClose();
    }, 350);
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={{ margin: 0 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.iconsx} onPress={onClose}>
            <Image
              source={require('../assets/gg_close-o.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Please Verify!</Text>
          <Text style={styles.modalTitle2}>Enter Your PIN to confirm the transfer.</Text>

          {/* PIN Boxes */}
          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <View key={index} style={styles.pinBox}>
                <Text style={styles.pinText}>
                  {showArrow ? '->' : showPin ? digit : digit ? '●' : ''}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={toggleShowPin} style={styles.showPinButton}>
            <Text style={{ color: Colors.primary, fontWeight: 'bold', textAlign: 'center' }}>
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

            <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('0')}>
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.key, isPinComplete ? { backgroundColor: Colors.primary } : { backgroundColor: '#ccc' }]}
              disabled={!isPinComplete}
              onPress={handleVerifyPress}
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
  );
};

export default PinModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalTitle: { fontSize: 30, fontWeight: '600', textAlign: 'center', marginTop: '10%' },
  modalTitle2: { fontSize: 16, textAlign: 'center', color: Colors.third, marginBottom: 20 },
  pinContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  pinBox: { width: 45, height: 55, borderWidth: 1, borderColor: '#F0F0F0', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0' },
  pinText: { fontSize: 22, fontWeight: 'bold' },
  showPinButton: { marginBottom: 20 },
  asharimage: { width: 44, height: 47, alignSelf: 'center', marginBottom: 20 },
  keyboardContainer: { width: '100%', height: 310, backgroundColor: '#f0f0f0', paddingHorizontal: 20, paddingVertical: 30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  key: { flex: 1, marginHorizontal: 5, height: 60, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 0.2, borderColor: 'rgba(0,0,0,0.2)', elevation: 1 },
  keyText: { fontSize: 20, fontWeight: 'bold' },
  iconsx: { alignSelf: 'flex-end' },
});
