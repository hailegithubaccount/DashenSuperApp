import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import Colors from './Colors';

const AccountSelector = ({
  selectedAccount,
  onSelect,
  placeholder = '000000000000',
  width = 160,
  height,
  justifyContent="center"
 
}) => {
  const SenderAccounts = [
    { id: '1', number: '1234 5678 9012' },
    { id: '2', number: '9876 5432 1098' },
    { id: '3', number: '1122 3344 5566' },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempSelection, setTempSelection] = useState(selectedAccount || '');

  return (
    <View>
      {/* Button */}
      <TouchableOpacity
        onPress={() => {
         onSelect(tempSelection);
          setIsModalVisible(true);
        }}
        style={[styles.borderSelectAccount, { width, height,justifyContent }]}
      >
        <Text style={styles.SelectAccount}>
          {selectedAccount ? selectedAccount : placeholder}
        </Text>
        <Image
          source={require('../assets/Downicon.png')}
          style={styles.downicon}
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: 400 }]}>
            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#f2f2f2' }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#f2f2f2' }]}
                onPress={() => {
                  onSelect(tempSelection); // send selection back to parent
                  setIsModalVisible(false);
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
    </View>
  );
};

export default AccountSelector;

const styles = StyleSheet.create({
  borderSelectAccount: {
    flexDirection: 'row',
    gap:10,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  
  },
  SelectAccount: {
    fontSize: 16,
    color: Colors.third,
  },
  downicon: {
    width: 11,
    height: 6,
  },
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
