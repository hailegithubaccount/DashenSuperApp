import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  FlatList,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';
import Modal from 'react-native-modal';
import CustomButton from '../Components/CustomButton';
import AccountSelector from '../Components/reusedSelectAccount';
import NextButtonWithModal from '../Components/nextButtonwithModal';

const TypeMoney = ({ route, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { recipient, isQR } = route.params;
  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [account, setAccount] = useState('');

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const handleKeyPress = key => setAmount(prev => prev + key);
  const handleBackspace = () => setAmount(prev => prev.slice(0, -1));

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="Transfer to Other Bank" />

      <ScrollView>
        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setShowKeyboard(true);
              Keyboard.dismiss();
            }}
          >
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>
                {amount !== '' ? `${amount} Birr` : '0 Birr'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Select Account */}
        <Text style={styles.SelectText}>Select Account</Text>

        <AccountSelector
          placeholder="000000000000"
          justifyContent="center"
          selectedAccount={account}
          onSelect={(value: React.SetStateAction<string>) => setAccount(value)}
        />

        {/* Available Balance */}
        <View style={styles.monay}>
          <Text style={{ fontSize: 16, color: Colors.third }}>
            Available Amount:
            <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
              {' '}
              ETB 20,000.00
            </Text>
          </Text>
        </View>

        {/* Number Keyboard */}
        {showKeyboard && (
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
                <TouchableOpacity style={styles.key} onPress={handleBackspace}>
                  <Text style={styles.keyText}>⌫</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        

        {/* Next Button */}
  {/* next that display the modal  it have both the modal and the buttons with the correct transfering amount both */}
        <NextButtonWithModal
          typedAmount={amount !== '' ? parseFloat(amount) : null} // 👈 use your local amount
          scannedAmount={null} // 👈 since this screen is for typing
          selectedAccount={account}
          recipient={recipient}
          navigation={navigation}
          marginTop={10}
        />
      </ScrollView>
    </View>
  );
};

export default TypeMoney;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  amountContainer: { marginTop: 3, marginHorizontal: '5%' },
  amountBox: { marginTop: '30%', padding: 15, alignItems: 'center' },
  amountText: { fontSize: 48, fontWeight: 'bold', color: Colors.primary },
  SelectText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.third,
    marginBottom: '2%',
  },
  SelectAccount: { textAlign: 'center', fontSize: 16, color: Colors.third },
  downicon: { width: 11, height: 6, alignSelf: 'center' },
  monay: { marginTop: '5%', alignSelf: 'center' },
  borderSelecetAccount: {
    flexDirection: 'row',
    gap: 10,
    width: 160,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
  },
  keyboardContainer: {
    marginTop: '5%',
  backgroundColor: '#FBFBFB',
  flexGrow: 0,
  padding: 10,
  },
  numberGrid: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    width: 124,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 31 },
  bottomButton: { marginTop: '15%' },
  nextButton: {
    backgroundColor: Colors.primary || '#007bff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  disabledButton: {
    backgroundColor: 'gray',
  },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: '2%' },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    marginTop: '2%',
    height: 50,
    borderRadius: 10,
  },
  accountNumber: { flex: 1, fontSize: 16, fontWeight: 'bold' },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    paddingVertical: '2%',
    paddingHorizontal: '6%',
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: '3%',
  },
  BanksContainer: {
    flex: 1,
    maxWidth: 120,
    height: 65,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  BanksImage: { width: 24, height: 24, resizeMode: 'contain', marginBottom: 6 },
  BanksName: { textAlign: 'center', fontSize: 14, fontWeight: 'bold' },
  amount: { color: Colors.primary, fontWeight: '600' },
  gridContainer: { paddingVertical: 10 },
});
