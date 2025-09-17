import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';

const PIN_LENGTH = 4;
const emptyPin = () => Array(PIN_LENGTH).fill('');

const PINConfirmation = ({ navigation, route }) => {
  const { amount, recipientAccount, recipientName, isBudgetEnabled } =
    route.params || {};
  const [reason, setReason] = useState('');
  const [pin, setPin] = useState(emptyPin());

  const isPinComplete = pin.every(digit => digit !== '');

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const handleKeyPress = key => {
    if (key === '⌫') {
      const lastIndex = pin
        .slice()
        .reverse()
        .findIndex(d => d !== '');
      if (lastIndex !== -1) {
        const indexToClear = PIN_LENGTH - 1 - lastIndex;
        const newPin = [...pin];
        newPin[indexToClear] = '';
        setPin(newPin);
      }
    } else if (key !== '.' && pin.includes('')) {
      const firstEmpty = pin.findIndex(d => d === '');
      if (firstEmpty !== -1) {
        const newPin = [...pin];
        newPin[firstEmpty] = key;
        setPin(newPin);
      }
    }
  };

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="PIN Confirmation" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View style={styles.coverimage}>
          <Image
            source={require('../assets/icooo.png')}
            style={styles.confirmImage}
          />
        </View>
        <Text style={styles.headerText}>
          Please enter your{' '}
          <Text style={{ color: 'blue', fontWeight: '700' }}>PIN</Text> for
          confirmation
        </Text>
        <Text style={styles.amountText}>{amount} ETB</Text>

        {/* PIN boxes */}
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <View key={index} style={styles.pinBox}>
              <Text style={styles.pinText}>{digit ? digit : ''}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.keyboardSplit}>
          {/* Keypad */}
          <View style={styles.keyboardContainer}>
            <View style={styles.numberGrid}>
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

              {/* last row: ., 0, ⌫ */}
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('.')}
                >
                  <Text style={styles.keyText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('0')}
                >
                  <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('⌫')}
                >
                  <Text style={styles.keyText}>⌫</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Confirm button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: isPinComplete ? Colors.primary : '#ccc' },
            ]}
            disabled={!isPinComplete}
            onPress={() => {
              navigation.navigate('SuccessfulTransaction', {
                amount,
                recipientAccount,
                recipientName,
                isBudgetEnabled,
                reason,
              });
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PINConfirmation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
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
  headerText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  amountText: {
    textAlign: 'center',
    marginVertical: 2,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  pinContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  pinBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#F7F7F7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinText: { fontSize: 22, fontWeight: 'bold' },

  keyboardSplit: {
    flexDirection: 'row',
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    width: 100,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  keyboardContainer: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  key: {
    width: 70,
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
});
