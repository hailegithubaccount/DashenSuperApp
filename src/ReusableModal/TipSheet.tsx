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
import BudgetSheet from './BudgetSheet';

const OptionSheet = ({
  visible,
  onClose,
  title,
  options = [],
  enableSwitch = false,
  showInput = false,
  inputPlaceholder = '0.00',
  unit = '',
  onSelect,
  navigation
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleSwitch = () => setIsEnabled(prev => !prev);
  const presetPrices = ['10.00', '25.00', '50.00', '100.00'];

  //for the budget modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

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
              {/* Title & Skip */}
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.skipBtn}>Skip</Text>
                </TouchableOpacity>
              </View>

              {/* Optional Switch */}
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

              {/* Optional Input */}
              {showInput && (
                <View style={styles.inputContainer}>
                  <Text style={{ marginHorizontal: 10 }}>Custom</Text>
                  <CustomTextInput
                    placeholder={inputPlaceholder}
                    keyboardType="numeric"
                    value={String(inputValue)}
                    onChangeText={setInputValue}
                    borderRadius={20}
                    marginTop={5}
                  />
                </View>
              )}

              {/* Options */}
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

                 <CustomButton title={'Budget'} onPress={openModal} /> 
      <BudgetSheet
        visible={modalVisible}
        onClose={closeModal}
        navigation={navigation}
      />
              </View>
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
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 20, color: Colors.primary },
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
  inputContainer: {
    backgroundColor: '#F0F4FF',
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  boxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  optionBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '23%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    borderColor: '#007bff',
    backgroundColor: '#e6f2ff',
  },
  optionText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  selectedText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  priceBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '23%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  priceText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
});
