import {
  Alert,
  Image,
  ScrollView,
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

  const {
    amount: scannedAmount = '0.00',
    tip: scannedTip = null,
    recipient = {},
  } = route.params || {};

  const [typedTip, setTypedTip] = useState(null);

  return (
    <View style={styles.container}>
      <OtherBanktopbar title="QR Payment" />

      <ScrollView
        style={{ marginHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
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
          {scannedTip && (
            <View style={styles.tipBox}>
            <Text style={styles.tiptext}>Tip Amount</Text>
            <Text style={styles.tipprice}>{scannedTip}</Text>
          </View>

          )}

          

          <View style={styles.monay}>
            <Text style={{ fontSize: 16, color: Colors.third }}>
              Available Amount in main :
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                {' '}
                ETB 20,000.00
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: "75%" }}>
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

              if (scannedTip) {
                // if QR already includes a tip → go directly to Budget
                setTypedTip(scannedTip);
                setBudgetVisible(true);
              } else {
                // if QR has no tip → open TipSheet so user can type
                setTipVisible(true);
              }
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
            typedTip={typedTip || scannedTip}
          />
        </View>

        {/* Account Modal */}
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
    borderRadius: 25,
    alignItems: 'center',
    width: '95%',
    height: 50,
    marginTop: 3,
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
  SecondText: { fontSize: 16, color: '#757575', marginTop: 8 },
  amounttext: {
    alignSelf: 'center',
    marginTop: 24,
    fontSize: 36,
    color: '#989898',
    fontWeight: 'bold',
  },
  monay: { marginTop: '5%', alignSelf: 'center' },
  tipBox: {
    backgroundColor: '#F0F4FF',
    width: 100,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tiptext: {},
  tipprice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
});
