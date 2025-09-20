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

interface AmountScreen {
  navigation: any;
  route: any;
}

const AmountScreen: React.FC<AmountScreen> = ({ navigation, route }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [TipVisible, setTipVisible] = useState(false);
  const [budgetVisible, setBudgetVisible] = useState(false);

  const closeBudgetVisible = () => setBudgetVisible(false);

  const { amount: scannedAmount = '0.00', recipient = {} } = route.params || {};

  const [typedTip, setTypedTip] = useState(null);

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="QR Payment" />

      <ScrollView
        style={{ marginHorizontal: 16 }}
        contentContainerStyle={{
         
          
        
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
          </TouchableOpacity>
          <Text style={styles.amounttext}>{scannedAmount} Birr</Text>
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

        <AccountSheet
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={(account: React.SetStateAction<string>) =>
            setSelectedAccount(account)
          }
        />
      </ScrollView>
    </View>
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
