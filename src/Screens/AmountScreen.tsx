import {
  Alert,
  Button,
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

const AmountScreen = ({ navigation, route }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [TipVisible, setTipVisible] = useState(false);
  const [budgetVisible, setBudgetVisible] = useState(false);

  const closeBudgetVisible = () => setBudgetVisible(false);

  const { amount: scannedAmount = '0.00', recipient = {} } = route.params || {};

  const [typedTip, setTypedTip] = useState(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <OtherBanktopbar title="Qr Payment" />

          <ScrollView
            style={{  }}
            contentContainerStyle={{
              flexDirection: 'column',
              gap: 450,
            }}
            scrollEnabled
            
          >
            <View>
              <View style={styles.bothtext}>
                <Text style={styles.firsttext}>Select Account</Text>
                <Text style={styles.SecondText}>
                  Select your account and confirm payment
                </Text>
              </View>

              <Text>Account Number</Text>

              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={styles.borderSelectAccount}
              >
                <Text style={styles.SelectAccount}>
                  {selectedAccount ? selectedAccount : '-Select'}
                </Text>
                <Image
                  source={require('../assets/Downicon.png')}
                  style={styles.downicon}
                />
              </TouchableOpacity>

              <Text style={styles.amounttext}>{scannedAmount} Birr</Text>

               <View style={styles.tipBox}>
                <Text style={styles.tipText}>Tip Amount</Text>
                <Text style={styles.tipAmount}>+ 100.00 Birr</Text>
              </View>

              <View style={styles.monay}>
                <Text style={{ fontSize: 16, color: Colors.third }}>
                  Available Amount:
                  <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                    {' '}
                    ETB 20,000.00
                  </Text>
                </Text>
              </View>

             
            </View>

            <View>
              <CustomButton
                title="Next"
                onPress={() => {
                  if (!selectedAccount || selectedAccount === '00000000') {
                    Alert.alert(
                      'Invalid Account',
                      'Please select a valid account before proceeding.',
                    );
                    return;
                  }

                  setTipVisible(true);
                }}
              />

              <TipSheet
                visible={TipVisible}
                onClose={() => setTipVisible(false)}
                onOpenBudget={value => {
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
                scannedAmount={scannedAmount}
                typedAmount={null}
                recipient={recipient}
                typedTip={typedTip}
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <AccountSheet
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={(account: React.SetStateAction<string>) =>
          setSelectedAccount(account)
        }
      />
    </KeyboardAvoidingView>
  );
};

export default AmountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal:16,
  },
  borderSelectAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '95%',
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
  bothtext: { marginHorizontal: 16, marginBottom: 16 },
  firsttext: { marginTop: 24, fontSize: 28, fontWeight: 'bold' },
  SecondText: { fontSize: 16, color: '#757575' },
  amounttext: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 36,
    color: '#989898',
    fontWeight: 'bold',
  },
  monay: { marginTop: '5%', alignSelf: 'center' },
  tipBox: {
    backgroundColor: 'red',
    width: 100,
    marginTop: 2,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    alignSelf:'center'
  },
  tipText: {
    alignSelf: 'center',
  },
  tipAmount: {},
});
