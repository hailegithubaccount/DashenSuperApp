import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from './Colors';
import OtherBanktopbar from './otherBanktopbar';
import PinModal from './PinModal';

const ConfirmBaseScreen = ({
  route,
  navigation,
  imageSource,
  showTip = false,
  showreason = false,
  onConfirm, // ✅ new prop for dynamic confirm action
}) => {
  const { amount, recipientAccount, recipientName, isBudgetEnabled, tip } = route.params || {};
  const [reason, setReason] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSuccess = () => {
    closeModal();
    if (onConfirm) {
      onConfirm({ amount, recipientAccount, recipientName, isBudgetEnabled, reason, tip });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      <OtherBanktopbar title="Confirm Transfer" />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.coverimage}>
          <Image source={imageSource} style={styles.confirmImage} />
        </View>

        <Text style={styles.headerText}>Confirm Transfer</Text>
        <Text style={styles.amountText}>{amount} ETB</Text>

        {/* Transaction Details */}
        <View style={styles.transactionBox}>
          <View style={styles.content}>
            <Text style={styles.firstText}>Sender Account:</Text>
            <Text style={styles.secondText}>Abebe Ayele Girma</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Recipient Account:</Text>
            <Text style={styles.secondText}>{recipientAccount}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Recipient Name:</Text>
            <Text style={styles.secondText}>{recipientName}</Text>
          </View>
          {showreason && (
            <View style={styles.content}>
              <Text style={styles.firstText}>Reason:</Text>
              <Text style={styles.secondText}>{reason}</Text>
            </View>
          )}
          <View style={styles.content}>
            <Text style={styles.firstText}>Budget Type:</Text>
            <Text style={styles.secondText}>{isBudgetEnabled ? 'ON Budget' : 'OFF Budget'}</Text>
          </View>
          {showTip && (
            <View style={styles.content}>
              <Text style={styles.firstText}>Tip:</Text>
              <Text style={styles.secondText}>{tip}</Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Reason</Text>
        <TextInput
          style={styles.reasonBox}
          placeholder="Enter your reason"
          placeholderTextColor="#888"
          value={reason}
          onChangeText={setReason}
        />

        <TouchableOpacity style={styles.confirmButton} onPress={openModal}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Reusable PIN modal */}
      <PinModal isVisible={isModalVisible} onClose={closeModal} onConfirm={handleSuccess} />
    </View>
  );
};

export default ConfirmBaseScreen;

// … include your styles here …


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 },
  headerText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  amountText: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sectionTitle: { marginTop: 10, fontSize: 14, fontWeight: '500' },
  coverimage: {
    backgroundColor: '#F3F6FD',
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  confirmImage: { width: 106, height: 105 },
  transactionBox: {
    backgroundColor: '#F0F0F0',
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  firstText: { fontSize: 14, color: '#444' },
  secondText: { fontSize: 16, fontWeight: '700', color: '#000' },
  totalText: { fontSize: 14, fontWeight: 'bold', color: '#474747ff' },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.third,
  },
  reasonBox: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: { padding: 15, borderRadius: 30, alignItems: 'center' },
  confirmText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cancelText: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
});
