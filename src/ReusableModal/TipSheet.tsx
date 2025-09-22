// ReusableModal/OptionSheet.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Colors from '../Components/Colors';
import CustomTextInput from '../Components/TextInput';
import CustomButton from '../Components/CustomButton';

const TipSheet = ({ visible, onClose, onOpenBudget, navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleSwitch = () => setIsEnabled(prev => !prev);
  const presetPrices = ['10.00', '25.00', '50.00', '100.00'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
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
              <View style={styles.buttonwithtext}>
                <Text style={styles.title}>Give A tip</Text>
                <TouchableOpacity
                  onPress={() => {
                    const parsedTip = inputValue
                      ? parseFloat(inputValue)
                      : null;
                      onOpenBudget(parsedTip);
                  }}
                >
                  <Text style={styles.skipBtn}>Skip</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.switchRow}>
                <Text style={{ fontSize: 16 }}>Tip selection on Transfers</Text>
                <Switch
                  trackColor={{ false: '#767577', true: Colors.primary }}
                  thumbColor={'#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              <View style={styles.tipBox}>
                <Text style={{ marginHorizontal: 10 }}>Custom</Text>
                <CustomTextInput
                  placeholder={'0.00'}
                  keyboardType="numeric"
                  value={String(inputValue)}
                  onChangeText={setInputValue}
                  borderRadius={20}
                  marginTop={5}
                />

                <View style={styles.boxesContainer}>
                  {presetPrices.map(price => (
                    <TouchableOpacity
                      key={price}
                      style={[styles.priceBox]}
                      onPress={() => {
                        setInputValue(price);
                      }}
                    >
                      <Text style={[styles.priceText]}>{price} Birr</Text>
                    </TouchableOpacity>
                  ))}

                  {/* Budget Button */}
                </View>
              </View>
              <CustomButton
                title={'Next'}
                onPress={() => {
                  const parsedTip = inputValue ? parseFloat(inputValue) : null;
                  onOpenBudget(parsedTip);
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TipSheet;

const styles = StyleSheet.create({
  modalContent: {
   
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonwithtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
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
