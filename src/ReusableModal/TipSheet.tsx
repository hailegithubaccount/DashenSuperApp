// ReusableModal/OptionSheet.js
import React, { useState } from 'react';
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

const OptionSheet = ({
  visible,
  onClose,
  title,
  options = [],
  enableSwitch = false,

  inputPlaceholder = '0.00',

  onSelect,
  onOpenBudget, 
}) => {
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
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.skipBtn}>Skip</Text>
                </TouchableOpacity>
              </View>

            
              {enableSwitch && (
                <View style={styles.switchRow}>
                  <Text style={{ fontSize: 16 }}>{title} on Transfers</Text>
                  <Switch
                    trackColor={{ false: Colors.primary, true: Colors.primary }}
                    thumbColor={'#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              )}

            
              <View style={styles.tipBox}>
                <Text style={{ marginHorizontal: 10 }}>Custom</Text>
                <CustomTextInput
                  placeholder={inputPlaceholder}
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
                      style={[
                        styles.priceBox,
                        inputValue === price && styles.selectedBox,
                      ]}
                      onPress={() => {
                        setInputValue(price);
                      }}
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

                  {/* Budget Button */}
                </View>
              </View>
              <CustomButton title={'Budget'} onPress={onOpenBudget} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OptionSheet;

const styles = StyleSheet.create({
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
