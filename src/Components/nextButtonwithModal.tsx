import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from './Colors';
import CustomButton from './CustomButton';

const NextButtonWithModal = ({
  typedAmount,
  scannedAmount,
  selectedAccount,
  recipient,
  navigation,
  marginTop,
  // tipAmount,
  tragetScreen='ConfirmTransfer'
 
}) => {
  const [budgets, setBudgets] = useState([
    {
      id: '1',
      title: 'House Rental',
      amount: 10000,
      image: require('../assets/inthebottomsheet/House.png'),
    },
    {
      id: '2',
      title: 'Loan',
      amount: 5000,
      image: require('../assets/inthebottomsheet/Loan.png'),
    },
    {
      id: '3',
      title: 'Groceries',
      amount: 10000,
      image: require('../assets/inthebottomsheet/Grocerry.png'),
    },
    {
      id: '4',
      title: 'Food',
      amount: 6000,
      image: require('../assets/inthebottomsheet/Food.png'),
    },
    {
      id: '5',
      title: 'Transport',
      amount: 1500,
      image: require('../assets/inthebottomsheet/Transport.png'),
    },
    {
      id: '6',
      title: 'Other',
      amount: 1000,
      image: require('../assets/inthebottomsheet/otherss.png'),
    },
  ]);

  const [nextModalVisible, setNextModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);
  const recipientName = recipient?.holder || recipient?.recipientName || '';
  const recipientAccount =
  recipient?.AccountNumber || recipient?.recipientAccount || '';

  const amountToSend = typedAmount
    ? typedAmount
    : scannedAmount
    ? scannedAmount
    : 0;
    const isDisabled = !amountToSend || amountToSend <= 0;


  const handleBudgetPress = item => {
    setBudgets(prev =>
      prev.map(b =>
        b.id === item.id
          ? { ...b, amount: Math.max(b.amount - amountToSend, 0) }
          : b,
      ),
    );

    setNextModalVisible(false);
    const isDisabled = !amountToSend || amountToSend <= 0;

    navigation.navigate(tragetScreen, {
      amount: amountToSend,
      SenderAccount: selectedAccount,
      recipientName,
      recipientAccount,
      isBudgetEnabled: isEnabled,
      // tip: tipAmount,
      remainingBudget: Math.max(item.amount - amountToSend, 0),
    });
  };

  const movetoconfrimwithoutbudget = () => {
    if (!amountToSend || amountToSend === 0) return;

    setNextModalVisible(false);

    navigation.navigate(tragetScreen, {
      amount: amountToSend,
      SenderAccount: selectedAccount,
      recipientName: recipient.holder,
      recipientAccount: recipient.AccountNumber,
      isBudgetEnabled: isEnabled,
       tip: tipAmount,
      remainingBudget: null,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleBudgetPress(item)}
      style={styles.BanksContainer}
    >
      <Image source={item.image} style={styles.BanksImage} />
      <Text style={styles.BanksName}>{item.title}</Text>
      <Text style={styles.amount}>{item.amount} ETB</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={[styles.bottomButton,
    { marginTop }
        
      ]}>
        <CustomButton
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
        />
      </View>

      <Modal
        isVisible={nextModalVisible}
        onBackdropPress={() => setNextModalVisible(false)}
        style={styles.bottomModal}
      >
        <View style={[styles.modalContent, { maxHeight: 500 }]}>
          <View style={styles.modalButtons}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
              Select Budget
            </Text>
            <TouchableOpacity
              style={[
                styles.modalBtn,
                { backgroundColor: 'rgba(71,99,255,0.1)' },
              ]}
              onPress={movetoconfrimwithoutbudget}
            >
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchRow}>
            <Text style={{ fontSize: 16 }}>Budget selection on Transfers</Text>
            <Switch
              trackColor={{ false: '#767577', true: Colors.primary }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <FlatList
            data={budgets}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </Modal>
    </View>
  );
};

export default NextButtonWithModal;

const styles = StyleSheet.create({
  bottomButton: {  },
  bottomModal: { justifyContent: 'flex-end', margin: 0 },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    paddingVertical: '2%',
    paddingHorizontal: '6%',
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: '3%',
  },
  switchRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  BanksContainer: {
    flex: 1,
    maxWidth: 120,
    height: 65,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  BanksImage: { width: 24, height: 24, resizeMode: 'contain', marginBottom: 6 },
  BanksName: { textAlign: 'center', fontSize: 14, fontWeight: 'bold' },
  amount: { color: Colors.primary, fontWeight: '600' },
  gridContainer: { paddingVertical: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
