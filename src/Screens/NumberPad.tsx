import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../Components/CustomButton';
import BudgetSheet from '../ReusableModal/BudgetSheet';
import AccountSheet from '../ReusableModal/AccounSheet';
import Colors from '../Components/Colors';
import OptionSheet from '../ReusableModal/TipSheet';

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
    <View style={styles.container}>
      {/* for budgetsheet============================================================== */}
      {/* <CustomButton title={'Budget'} onPress={openModal} /> */}
      {/* <BudgetSheet
        visible={modalVisible}
        onClose={closeModal}
        navigation={navigation}
      /> */}
      {/* ============================================================================ */}

      {/* for account sheet ============================================================ */}

      {/* <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[styles.borderSelectAccount, { width, height }]}
      >
        <Text style={styles.SelectAccount}>
          {selectedAccount ? selectedAccount : placeholder}
        </Text>
        <Image
          source={require('../assets/Downicon.png')}
          style={styles.downicon}
        />
      <AccountSheet 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={(account: React.SetStateAction<string>) => setSelectedAccount(account)}
       
      />



      </TouchableOpacity> */}

      {/* ========================================================================================== */}

      <CustomButton
        title="Open Options"
        onPress={() => setOptionVisible(true)}
      />

      <OptionSheet
        visible={optionVisible}
        onClose={() => setOptionVisible(false)}
        title="Choose Amount"
        showInput
        enableSwitch
        onOpenBudget={() => {
          setOptionVisible(false);
          setBudgetVisible(true); // 👈 open Budget modal separately
        }}
        onSelect={tip => {
          navigation.navigate('QrWithAmount', { tip });
        }}
      />
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderSelectAccount: {
    flexDirection: 'row',
    gap: 10,
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
});
