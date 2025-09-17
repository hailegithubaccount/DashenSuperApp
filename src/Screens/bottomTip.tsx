import React, { useState } from 'react';
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
import Colors from '../Components/Colors';
import NextButtonWithModal from '../Components/nextButtonwithModal';
import CustomTextInput from '../Components/TextInput';

interface TipModalProps {
  visible: boolean;
  onClose: () => void;
  onSkip?: () => void;
  presetPrices?: string[];
  recipient?: any;
  navigation?: any;
  selectedAccount?: string;
  scannedAmount?: number | null;
}

const TipModal: React.FC<TipModalProps> = ({
  visible,
  onClose,
  onSkip,
  presetPrices = ['10.00', '25.00', '50.00', '100.00'],
  recipient,
  navigation,
  selectedAccount,
  scannedAmount,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, marginBottom: 40 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.buttonwithtext}>
                <Text style={{ fontSize: 20, color: Colors.primary }}>
                  Give A Tip
                </Text>
                <TouchableOpacity style={styles.skip} onPress={onSkip || onClose}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
              </View>

              {/* Switch */}
              <View style={styles.switchRow}>
                <Text style={{ fontSize: 16 }}>Tip selection on Transfers</Text>
                <Switch
                  trackColor={{ false: Colors.primary, true: Colors.primary }}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              {/* Custom Input + Presets */}
              <View style={styles.tipBox}>
                <Text style={styles.customTipLabel}>Custom Tip</Text>
                <CustomTextInput
                  label={null}
                  placeholder={'0.00'}
                  keyboardType="numeric"
                  value={inputValue}
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

              {/* Next Button */}
              <NextButtonWithModal
                typedAmount={inputValue ? parseFloat(inputValue) : null}
                scannedAmount={scannedAmount}
                selectedAccount={selectedAccount}
                recipient={recipient}
                navigation={navigation}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TipModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
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
  skip: {},
  skipText: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#F0F4FF',
    color: Colors.primary,
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
    marginTop: 10,
  },
  customTipLabel: {
    marginHorizontal: 10,
    marginTop: 5,
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
