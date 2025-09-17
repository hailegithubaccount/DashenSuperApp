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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';
import Modal from 'react-native-modal';
import CustomButton from '../Components/CustomButton';
import AccountSelector from '../Components/reusedSelectAccount';
import NextButtonWithModal from '../Components/nextButtonwithModal';
import CustomTextInput from '../Components/TextInput';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const TypeMoney = ({ route, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { amount: scannedAmount, recipient } = route.params || {};
  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [account, setAccount] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const openPinModal = () => {
    setModalVisible(true);
  };
  const [inputValue, setInputValue] = useState('');

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
    }, []),
  );

  // Define the prices for your four boxes
  const presetPrices = ['10.00', '25.00', '50.00', '100.00'];

  const handleBoxPress = (price: React.SetStateAction<string>) => {
    // When a box is pressed, set the input value to that price
    setInputValue(price);
  };

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const handleKeyPress = key => setAmount(prev => prev + key);
  const handleBackspace = () => setAmount(prev => prev.slice(0, -1));

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="Merchant payment" />
      <ScrollView>
        <View
          style={{
            marginBottom: '30%',
          }}
        >
          <Text
            style={{
              fontSize: 29,
            }}
          >
            Add Amount
          </Text>
          <Text>Please add your payment amount below</Text>
        </View>

        <Text style={styles.SelectText}>Select Account</Text>

        <AccountSelector
          placeholder="000000000000"
          justifyContent="center"
          selectedAccount={account}
          onSelect={(value: React.SetStateAction<string>) => setAccount(value)}
        />
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
        <View style={styles.bottomButton}>
          <CustomButton title="Next" onPress={openPinModal} width="95%" />
        </View>
      </ScrollView>

      {/* Modal with KeyboardAvoidingView */}
      <Modal
        isVisible={modalVisible}
        style={styles.modal}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <View style={styles.modalContent}>
                <View>
                  <View style={styles.buttonwithtext}>
                    <Text style={{ fontSize: 20, color: Colors.primary }}>
                      Give A Tip
                    </Text>
                    <TouchableOpacity style={styles.skip}>
                      <Text
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 5,
                          borderRadius: 10,
                          backgroundColor: '#F0F4FF',
                        }}
                      >
                        skip
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      Tip selection on Transfers
                    </Text>
                    <Switch
                      trackColor={{
                        false: Colors.primary,
                        true: Colors.primary,
                      }}
                      thumbColor={'#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: '#F0F4FF',
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 10,
                      }}
                    >
                      Custom Tip
                    </Text>
                    <CustomTextInput
                      label={null}
                      placeholder="0.00"
                      keyboardType="numeric"
                      value={String(inputValue)}
                      onChangeText={text => {
                        setInputValue(text);

                        if (text !== '' && !isNaN(text)) {
                          navigation.navigate('ConfrimScreenForQr', {
                            tip: parseFloat(text),
                          });
                        }
                      }}
                      borderRadius={20}
                      marginTop={5}
                    />
                    <View style={styles.boxesContainer}>
                      {presetPrices.map(price => (
                        <TouchableOpacity
                          key={price}
                          style={[
                            styles.priceBox,
                            inputValue === price && styles.selectedBox,
                          ]}
                          onPress={() => setInputValue(price)} // ✅ directly update input
                        >
                          <Text
                            style={[
                              styles.priceText,
                              inputValue === price && styles.selectedText,
                            ]}
                          >
                            {price} Birr
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <NextButtonWithModal
                    typedAmount={null}
                    scannedAmount={scannedAmount}
                    selectedAccount={account}
                    recipient={recipient}
                    navigation={navigation}
                    tragetScreen="ConfrimScreenForQr"
                    marginTop={1}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default TypeMoney;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  amountContainer: { marginTop: 3, marginHorizontal: '5%' },
  amountBox: { marginTop: '0%', padding: 15, alignItems: 'center' },
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
    height: 290,
    padding: 10,
    marginBottom: '30%',
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
  bottomModal: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
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

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 18,
  },

  skip: {},

  //jklkj
  bottomButton: {
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end', // ✅ stick to bottom
    margin: 0, // ✅ remove default side margins
  },
  modalContent: {
    width: '100%', // ✅ full width
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  buttonwithtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  boxesContainer: {
    flexDirection: 'row',
    gap: 5,
    padding: 10,
  },
  priceBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '24%',
    height: 40,
  },
  selectedBox: {
    borderColor: '#007bff', // Change border color for selected box
    backgroundColor: '#e6f2ff',
  },
  priceText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  selectedText: {
    color: '#007bff', // Change text color for selected box
    fontWeight: 'bold',
  },
});
