import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../Components/CustomButton';
import BudgetSheet from '../ReusableModal/BudgetSheet';
import AccountSheet from '../ReusableModal/AccounSheet';
import Colors from '../Components/Colors';
import TipSheet from '../ReusableModal/TipSheet';
import OtherBanktopbar from '../Components/otherBanktopbar';
import NumberPad from './NumberPad';

const AmountScreen = ({
  navigation,
  route,
  nexttext = 'Add Amount',
  SelectAccount = 'Select Account',
  showSelectAccounbig = false,
  showkeypad = false,
}) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [TipVisible, setTipVisible] = useState(false);
  const [budgetVisible, setBudgetVisible] = useState(false);

  const closeBudgetVisible = () => setBudgetVisible(false);

  const { amount: scannedAmount = '0.00', recipient = {} } = route.params || {};

  const [typedTip, setTypedTip] = useState<number | null>(null);
  const [amount, setAmount] = useState('');

  
  const finalAmount = amount && parseFloat(amount) > 0 ? amount : scannedAmount;

  const handleNext = () => {
    if (showSelectAccounbig && (!selectedAccount || selectedAccount === '00000000')) {
      Alert.alert(
        'Invalid Account',
        'Please select a valid account before proceeding.',
      );
      return;
    }

    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setTipVisible(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <OtherBanktopbar title="QR Payment" />

          <ScrollView contentContainerStyle={{ flexDirection: 'column', gap: 1 }}>
            <View>
              <View style={styles.bothtext}>
                <Text style={styles.firsttext}>{SelectAccount}</Text>
                <Text style={styles.SecondText}>{nexttext}</Text>
              </View>

              {showSelectAccounbig && (
                <TouchableOpacity
                  onPress={() => setIsModalVisible(true)}
                  style={styles.borderSelectAccount}
                >
                  <Text style={styles.SelectAccount}>
                    {selectedAccount ? selectedAccount : '-Select'}
                  </Text>
                  <Image source={require('../assets/Downicon.png')} style={styles.downicon} />

                  <AccountSheet
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onConfirm={(account: string) => setSelectedAccount(account)}
                  />
                </TouchableOpacity>
              )}

              {/* ✅ Always show finalAmount */}
              <Text style={styles.amounttext}>{finalAmount} Birr</Text>

              {showkeypad && (
                <NumberPad value={amount} onChange={setAmount} showDecimal={true} />
              )}
            </View>

            <View>
              <CustomButton title="Next" onPress={handleNext} />

              <TipSheet
                visible={TipVisible}
                onClose={() => setTipVisible(false)}
                onOpenBudget={(value) => {
                  setTipVisible(false);
                  setTypedTip(value);
                  setBudgetVisible(true);
                }}
                navigation={navigation}
              />

              <BudgetSheet
                visible={budgetVisible}
                onClose={closeBudgetVisible}
                navigation={navigation}
                typedAmount={finalAmount}  // ✅ Pass final amount
                recipient={recipient}
                typedTip={typedTip}
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};


export default AmountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  borderSelectAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    height: 50,
  },
  SelectAccount: {
    fontSize: 16,
    color: Colors.third,
  },
  downicon: {
    width: 11,
    height: 6,
  },
  bothtext: { marginHorizontal: 16, marginVertical: 16 },
  firsttext: { marginTop: 24, fontSize: 28, fontWeight: 'bold' },
  SecondText: { fontSize: 16, color: '#757575' },
  amounttext: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 36,
    color: '#989898',
    fontWeight: 'bold',
  },
});
