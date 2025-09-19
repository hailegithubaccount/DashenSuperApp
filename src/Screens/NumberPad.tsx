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
import CustomTextInput from '../Components/TextInput';

const NumberPad = ({
  placeholder = '000000000000',
  width = 160,
  height = 30,
  navigation,
}) => {
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

  const [visible, setVisible] = useState(false);

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
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View style={styles.bothtext}>
              <Text style={styles.firsttext}>Select Account</Text>
              <Text style={styles.SecondText}>
                Select your account and confirm payment
              </Text>
            </View>

            {/* <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={styles.borderSelectAccount}
            >
              <Text style={styles.SelectAccount}>
                {selectedAccount ? selectedAccount : placeholder}
              </Text>
              <Image
                source={require('../assets/Downicon.png')}
                style={styles.downicon}
              /> */}
            <CustomTextInput
              label="Account Number"
              placeholder="-Select"
              showImage
              imageSource={require('../assets/Downicon.png')}
              value={selectedAccount}
              onChangeText={setSelectedAccount}
              borderRadius={10}
            />

            <AccountSheet
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onConfirm={(account: React.SetStateAction<string>) =>
                setSelectedAccount(account)
              }
            />
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
});
