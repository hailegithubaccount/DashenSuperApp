import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import NextButtonWithModal from './nextButtonwithModal';
import Colors from './Colors';
import CustomTextInput from './TextInput';

const bottomTip = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);
  const { amount: scannedAmount, recipient } = route.params || {};
  const [account, setAccount] = useState('');

  const openPinModal = () => {
    setModalVisible(true);
  };
  const [inputValue, setInputValue] = useState('');

  const presetPrices = ['10.00', '25.00', '50.00', '100.00'];

  const handleBoxPress = (price: React.SetStateAction<string>) => {
    setInputValue(price);
  };

  return (
    <View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, marginBottom: 40 }}
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
                      placeholder={'0.00'}
                      keyboardType="numeric"
                      value={String(inputValue)} // ensure it's always a string
                      onChangeText={text => setInputValue(text)}
                      borderRadius={20}
                      marginTop={5}
                      // keep it controlled
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

export default bottomTip;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  buttonwithtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skip: {},
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
