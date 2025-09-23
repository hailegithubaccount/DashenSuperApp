import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import NumberPad from '../Components/NumberPad';
import CustomButton from '../Components/CustomButton';
import Colors from '../Components/Colors';
import OtherBanktopbar from '../Components/otherBanktopbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountSheet from '../ReusableModal/AccounSheet';
import BudgetSheet from '../ReusableModal/BudgetSheet';
import TipSheet from '../ReusableModal/TipSheet'; // 👈 add this import

interface AmountProps {
  onpress?: any;
  route: any;
  navigation: any;
}

const Amount: React.FC<AmountProps> = ({ onpress, route, navigation }) => {
  const [amount, setAmount] = useState('');
  const { recipient, requestType } = route.params ?? {};

  const [selectAccount, setSelectedAccount] = useState('');
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [isTipModalVisible, setIsTipModalVisible] = useState(false);
  const [typedTip, setTypedTip] = useState('');

  const handleNextPress = () => {
    if (!selectAccount || selectAccount === '0000000000000') {
      Alert.alert('Invalid Account', 'Please choose a valid account');
      return;
    }

    if (requestType === 'qr') {
      setIsTipModalVisible(true);
    } else {
      setIsBudgetModalVisible(true);
    }
  };
  const isDisabled = !amount || amount == 0;

  const title =
    requestType === 'qr' ? 'Merchant Payment' : 'Transfer to other bank';

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <OtherBanktopbar title={title} />
      </SafeAreaView>

      <ScrollView>
        {requestType === 'qr' && (
          <View style={styles.AddAmount}>
            <Text style={styles.addamountText}>Add Amount</Text>
            <Text style={styles.secondtext}>
              Please add your payment amount below
            </Text>
          </View>
        )}

        {requestType !== 'qr' &&(
             <View style={styles.amountContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>{amount || '0.00'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        )}

       

        <Text style={styles.SelectText}>Select Account</Text>
        <TouchableOpacity
          onPress={() => setIsAccountModalVisible(true)}
          style={styles.borderSelectAccount}
        >
          <Text style={styles.SelectAccount}>
            {selectAccount ? selectAccount : '0000000000000'}
          </Text>
          <Image
            source={require('../assets/Downicon.png')}
            style={styles.downicon}
          />
        </TouchableOpacity>

        {requestType === 'qr' && (
          <View style={styles.forqramountContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Keyboard.dismiss()}
            >
              <View style={styles.amountBox}>
                <Text style={styles.amountText}>{amount || '0.00'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <AccountSheet
          visible={isAccountModalVisible}
          onClose={() => setIsAccountModalVisible(false)}
          onConfirm={(account: React.SetStateAction<string>) =>
            setSelectedAccount(account)
          }
        />

        {requestType !== 'qr' && (
          <View style={styles.monay}>
            <Text style={{ fontSize: 16, color: Colors.third }}>
              Available Amount in main :
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                {' '}
                ETB 20,000.00
              </Text>
            </Text>
          </View>
        )}

        <View style={styles.Keyboard}>
          <NumberPad value={amount} onChange={setAmount} />
        </View>
      </ScrollView>

      <View style={styles.bottomcontainer}>
        <CustomButton
          title={'Next'}
          onPress={handleNextPress}
          disabled={isDisabled}
          style={isDisabled ? { backgroundColor: 'gray' } : {}}
        />
      </View>

      <BudgetSheet
        visible={isBudgetModalVisible}
        onClose={() => setIsBudgetModalVisible(false)}
        recipient={recipient}
        typedAmount={amount}
        scannedAmount={null}
        typedTip={typedTip}
        navigation={navigation}
        requestType={requestType}
      />

      <TipSheet
        visible={isTipModalVisible}
        onClose={() => setIsTipModalVisible(false)}
        onOpenBudget={value => {
          setIsTipModalVisible(false);
          setTypedTip(value);
          setIsBudgetModalVisible(true);
        }}
        navigation={navigation}
      />
    </View>
  );
};

export default Amount;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  amountContainer: { alignItems: 'center', marginTop: '40%' },
  amountBox: { paddingVertical: 1, paddingHorizontal: 20 },
  Keyboard: { justifyContent: 'flex-end', marginTop: '10%' },
  amountText: { fontSize: 48, fontWeight: 'bold', color: Colors.primary },
  SelectText: {
    fontSize: 16,
    color: Colors.third,
    alignSelf: 'center',
  },
  SelectAccount: { fontSize: 16, color: Colors.primary },
  borderSelectAccount: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '40%',
    height: 50,
    marginTop: 3,
    marginBottom: 10,
  },
  downicon: {
    resizeMode: 'contain',
    width: 10,
    height: 8,
    tintColor: Colors.primary,
  },
  monay: { marginTop: '1%', alignSelf: 'center' },
  bottomcontainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  forqramountContainer: {
    alignSelf: 'center',
    marginBottom: '10%',
  },
  AddAmount: {
    marginBottom: '30%',
    marginHorizontal: 16,
  },
  addamountText: {
    fontSize: 28,
    fontWeight: '600',
  },
  secondtext: {
    fontSize: 16,
    color: Colors.third,
    marginTop: 5,
  },
});
