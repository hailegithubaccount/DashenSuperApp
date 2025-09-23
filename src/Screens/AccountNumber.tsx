import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';
import CustomTextInput from '../Components/TextInput';
import HistoryList from '../Components/History';
import CustomButton from '../Components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const EnterAccountNumber = ({ navigation, route }) => {
  const { bankItem } = route.params;

  // Beneficiaries (History)
  const [history] = useState([
    {
      id: '1',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '100004234546',
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
    {
      id: '2',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '1000045632466',
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
  ]);

  // Fake Accounts DB1000045632466
  const accounts = [
    {
      AccountNumber: '100004234546',
      holder: 'Kebede Lema Ayenew',
      image: require('../assets/Banks/photouser.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
      ImageBackground: require('../assets/Banks/backroundforaccounr.png'),
    },
    {
      AccountNumber: '1000045632499',
      holder: 'Kebede Lema Ayenew',
      image: require('../assets/Banks/photouser.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
      ImageBackground: require('../assets/Banks/backroundforaccounr.png'),
    },
    { AccountNumber: '555666', holder: 'Michael Brown' },
    { AccountNumber: '999888', holder: 'Sarah Johnson' },
  ];

  // State
  const [account, setAccount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [placeholder, setPlaceholder] = useState('000000000000');
  const [historySelected, setHistorySelected] = useState(false);

  const handleCheckAccount = () => {
    const accountToCheck = account !== '' ? account : placeholder;
    const found = accounts.find(a => a.AccountNumber === accountToCheck);
    setSelectedAccount(found || 'not-found');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SafeAreaView>
            <OtherBanktopbar title="Transfer to other bank" />
          </SafeAreaView>

          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.TopText}>
              <Text style={styles.FirstText}>Enter Account Number</Text>
              <Text style={styles.SecondText}>
                Enter recipient account number
              </Text>
            </View>

           
            <CustomTextInput
              label={'Account Number'}
              placeholder={placeholder}
              value={account}
              onChangeText={(val: React.SetStateAction<string>) =>
                setAccount(val)
              }
              keyboardType="number-pad"
            />

            {/* Show Beneficiaries when no input */}
            {!historySelected && account === '' && (
              <HistoryList
                history={history}
                bankImage={bankItem.image}
                onSelect={item => {
                  setPlaceholder(item.AccountNumber);
                  setAccount('');
                  setSelectedAccount(null);
                  setHistorySelected(true);
                }}
              />
            )}

            {/* Show account only AFTER pressing Check */}
            {selectedAccount && selectedAccount !== 'not-found' && (
              <TouchableOpacity
                style={{
                  margin: 8,
                }}
                // onPress={() =>
                //           navigation.navigate('TypeMoneyScreen', {recipient:selectedAccount}
                //           )
                //         }>

                onPress={() =>
                  navigation.navigate('MerchantAndTransefertoother', {
                    recipient: {
                      holder: selectedAccount.holder,
                      AccountNumber: selectedAccount.AccountNumber,
                    },
                  })
                }
              >
                <ImageBackground
                  source={selectedAccount.ImageBackground}
                  style={styles.backgroundimage}
                >
                  <View style={styles.AccountBox}>
                    <View style={styles.bothimageandtextfordisplayaccount}>
                      <View
                        style={{
                          width: 65,
                          height: 65,
                          borderWidth: 1,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                      >
                        {selectedAccount.image && (
                          <Image
                            source={selectedAccount.image}
                            style={styles.imageofaccountdisplay}
                          />
                        )}
                      </View>
                      <View style={styles.holderPLUSaccount}>
                        <Text style={styles.holderName}>
                          {selectedAccount.holder}
                        </Text>
                        <Text style={styles.holderAccount}>
                          {selectedAccount.AccountNumber}
                        </Text>
                      </View>
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                      <TouchableOpacity>
                        <Image
                          source={selectedAccount.imageback}
                          style={styles.backiconforaccount}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}

            {/* If not found */}
            {selectedAccount === 'not-found' && (
              <View style={styles.accountInfo}>
                <Text style={styles.notFoundText}>Account not found</Text>
              </View>
            )}
          </View>

          {/* Floating Bottom Button */}
          <View style={[styles.bottomButton, { bottom: 20 }]}>
            <CustomButton
              title={
                historySelected || account !== '' ? 'Check Account' : 'Next'
              }
              onPress={handleCheckAccount}
              borderRadius={50}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EnterAccountNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TopText: {
    marginHorizontal: '3%',
    marginTop: '3%',
  },
  FirstText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  SecondText: {
    fontSize: 16,
    color: '#757575',
  },
  historyHeaderText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: '15%',
    color: Colors.third,
  },
  historyItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  historyItem2: {
    fontSize: 14,
    color: Colors.third,
  },
  accountInfo: {
    marginTop: 10,
    marginHorizontal: '3%',
  },
  imageofaccountdisplay: {
    width: 58,
    height: 58,
  },
  bothimageandtextfordisplayaccount: {
    flexDirection: 'row',
    gap: 10,
  },
  holderAccount: {},
  holderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: '2%',
  },
  holderPLUSaccount: {
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  HistoryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.third,
  },
  backicon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  bankimage: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  both: {
    flexDirection: 'row',
    gap: 10,
  },
  bottomButton: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: Colors.primary || '#007bff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundimage: {
    marginHorizontal: 8,
    borderRadius: 100,
  },
  AccountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    marginBottom: 8,
  },
  backiconforaccount: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    marginTop: '4%',
  },
});
