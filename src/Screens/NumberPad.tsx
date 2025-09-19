import {
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

const NumberPad = ({ navigation, route }) => {
  // for budgetsheet========================================================

  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => setModalVisible(true);
  // const closeModal = () => setModalVisible(false);
  // ========================================================================

  //for accounsheet ==============================================

  const [selectedAccount, setSelectedAccount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  //=========================================================

  const [optionVisible, setOptionVisible] = useState(false);
  const [budgetVisible, setBudgetVisible] = useState(false);

  const closeBudgetVisible = () => setBudgetVisible(false);

  // const [visible, setVisible] = useState(false);

  const { amount: scannedAmount = '0.00' } = route.params || {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <OtherBanktopbar title="QR Payment" />

          <ScrollView
            style={{ marginHorizontal: 16 }}
            contentContainerStyle={{
              paddingBottom: 120,
              flexDirection: 'column',
              gap: 300,
            }}
          >
            <View>
              <View style={styles.bothtext}>
                <Text style={styles.firsttext}>Select Account</Text>
                <Text style={styles.SecondText}>
                  Select your account and confirm payment
                </Text>
              </View>

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

                <AccountSheet
                  visible={isModalVisible}
                  onClose={() => setIsModalVisible(false)}
                  onConfirm={(account: React.SetStateAction<string>) =>
                    setSelectedAccount(account)
                  }
                />
              </TouchableOpacity>
              <Text style={styles.amounttext}>{scannedAmount} Birr</Text>
            </View>

            <View>
              <CustomButton
                title="Next"
                onPress={() => setOptionVisible(true)}
              />

              <TipSheet
                visible={optionVisible}
                onClose={() => setOptionVisible(false)}
                title="Choose Amount"
                enableSwitch
                onOpenBudget={() => {
                  setOptionVisible(false);
                  setBudgetVisible(true);
                }}
                navigation={navigation}
              />
              <BudgetSheet
                visible={budgetVisible}
                onClose={closeBudgetVisible}
                navigation={navigation}
                route={route}
                scannedAmount={scannedAmount}
                typedAmount={null}
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NumberPad;

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
