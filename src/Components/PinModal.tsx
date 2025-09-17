import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from './Colors';

const PinModal = ({ visible, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');

  const handleConfirm = () => {
    if (pin.length === 4) {
      onSuccess(pin); // return entered PIN
      setPin('');
      onClose();
    } else {
      alert('Please enter a valid 4-digit PIN.');
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Enter PIN</Text>

          <TextInput
            style={styles.pinInput}
            placeholder="****"
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
            value={pin}
            onChangeText={setPin}
          />

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PinModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  pinInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 10,
    marginBottom: 20,
    width: '60%',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
