// Screens/ReusablePaymentScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import OtherBanktopbar from '../Components/otherBanktopbar';
import AccountSelector from '../Components/reusedSelectAccount';
import Colors from '../Components/Colors';
import CustomButton from '../Components/CustomButton';
import CustomTextInput from '../Components/TextInput';
import NextButtonWithModal from '../Components/nextButtonwithModal';

const ReusablePaymentScreen = ({
  route = {}, // ✅ default fallback
  navigation,
  showModal = true,
  showButton = true,
  ShowTipBox=false,
  showNextButtonWithModal = false,
  title = 'QR Payment', // ✅ dynamic title
  targetScreen = 'ConfirmTransfer', // ✅ dynamic target
}) => {
  const { amount: scannedAmount = '0.00',tip, recipient = {} } = route.params || {};

  const [account, setAccount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const presetPrices = ['10.00', '25.00', '50.00', '100.00'];

  const toggleSwitch = () => setIsEnabled(prev => !prev);
  const openPinModal = () => setModalVisible(true);
 const isDisabled = !scannedAmount || scannedAmount <= 0;

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* ✅ Dynamic Title */}
          <OtherBanktopbar title={title} />

          <ScrollView
            style={{ marginHorizontal: 16 }}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View style={styles.bothtext}>
              <Text style={styles.firsttext}>Select Account</Text>
              <Text style={styles.SecondText}>
                Select your account and confirm payment
              </Text>
            </View>

            <View>
              <Text style={{ marginBottom: 5 }}>Account Number</Text>
              <AccountSelector
                placeholder="-Select"
                width={320}
                height={50}
                justifyContent="space-between"
                selectedAccount={account}
                onSelect={value => setAccount(value)}
              />

              <Text style={styles.amounttext}>{scannedAmount} Birr</Text>

              {/* {ShowTipBox &&( */}

              {/* this is used for displaying the tipbox or not */}

              {ShowTipBox && (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 100,
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 20,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{}}>Tip Amount</Text>
                  <Text>+ {tip}</Text>
                </View>
              )}

              {/* )
              } */}

              <Text style={{ alignSelf: 'center', color: '#929292' }}>
                Available in Main Account:{' '}
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                  ETB 20,000.00
                </Text>
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Next Button */}
          {showButton && (
            <View style={styles.bottomButton}>
              <CustomButton title="Next" onPress={openPinModal} disabled={isDisabled} width="95%" />

              {/* <CustomButton
          title="Next"
          onPress={() => {
            if (!isDisabled) {
              Keyboard.dismiss();
              setNextModalVisible(true);
            }
          }}
          width="95%"
          disabled={isDisabled}
          style={isDisabled ? { backgroundColor: 'gray' } : {}}
        /> */}
            </View>
          )}

          {/* Tip Modal */}
          {showModal && (
            <Modal
              visible={modalVisible}
              transparent
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
                          <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                          >
                            <Text style={styles.skipBtn}>skip</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.switchRow}>
                          <Text style={{ fontSize: 16 }}>
                            Tip selection on Transfers
                          </Text>
                          <Switch
                            trackColor={{
                              false: Colors.primary,
                              true: Colors.primary,
                            }}
                            thumbColor={'#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                          />
                        </View>

                        <View style={styles.tipBox}>
                          <Text style={{ marginHorizontal: 10 }}>
                            Custom Tip
                          </Text>
                          <CustomTextInput
                            placeholder={'0.00'}
                            keyboardType="numeric"
                            value={String(inputValue)}
                            onChangeText={text => setInputValue(text)}
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
                                onPress={() => setInputValue(price)}
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
                          tragetScreen={targetScreen}
                          marginTop={1}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Modal>
          )}

          {/* Inline Next Button */}
          {showNextButtonWithModal && (
            <NextButtonWithModal
              typedAmount={null}
              scannedAmount={scannedAmount}
              selectedAccount={account}
              recipient={recipient}
              navigation={navigation}
              tragetScreen={targetScreen}
              marginTop={1}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary },
  bothtext: { marginHorizontal: 16, marginVertical: 16 },
  firsttext: { marginTop: 24, fontSize: 28, fontWeight: 'bold' },
  SecondText: { fontSize: 16, color: '#757575' },
  amounttext: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 36,
    color: '#989898',
    fontWeight: 'bold',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  modalContent: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonwithtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#F0F4FF',
  },
  switchRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  tipBox: {
    backgroundColor: '#F0F4FF',
    borderRadius: 15,
    marginVertical: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    borderColor: '#007bff',
    backgroundColor: '#e6f2ff',
  },
  priceText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  selectedText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default ReusablePaymentScreen;
