// ReusableModal/AccountModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import Colors from '../Components/Colors';

const AccountModal = ({ visible, onClose, onConfirm, }) => {
  const [tempSelection, setTempSelection] = useState('');
   const SenderAccounts = [
    { id: '1', number: '1234 5678 9012' },
    { id: '2', number: '9876 5432 1098' },
    { id: '3', number: '1122 3344 5566' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: 400 }]}>
          {/* Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#f2f2f2' }]}
              onPress={onClose}
            >
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#f2f2f2' }]}
              onPress={() => {
                onConfirm(tempSelection);
                onClose();
              }}
            >
              <Text style={{ color: 'green', fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTitle}>Select Account</Text>

          {/* Account List */}
          <ScrollView>
            {SenderAccounts.map(acc => {
              const isSelected = tempSelection === acc.number;
              return (
                <TouchableOpacity
                  key={acc.id}
                  style={[
                    styles.accountRow,
                    {
                      borderColor: isSelected ? Colors.primary : 'gray',
                      backgroundColor: isSelected
                        ? 'rgba(71,99,255,0.15)'
                        : 'rgba(71,99,255,0.05)',
                    },
                  ]}
                  onPress={() => setTempSelection(acc.number)}
                >
                  <Image
                    source={
                      isSelected
                        ? require('../assets/rightwithcricle.png')
                        : require('../assets/Ellipse20.png')
                    }
                    style={{ width: 13, height: 13, marginRight: 10 }}
                  />
                  <Image
                    source={require('../assets/house.png')}
                    style={{ width: 30, height: 20, marginRight: 8 }}
                  />
                  <Text
                    style={[
                      styles.accountNumber,
                      { color: isSelected ? Colors.primary : 'black' },
                    ]}
                  >
                    {acc.number}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AccountModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  accountNumber: { flex: 1, fontSize: 16, fontWeight: 'bold' },
});
