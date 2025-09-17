

//
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import OtherBanktopbar from '../Components/otherBanktopbar';
import Colors from '../Components/Colors';

const EnterAccountNumber = () => {
  // Previous transfers (history)
  const [history] = useState([
    {
      id: '1',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '1000045632466',
      image: require('../assets/Banks/commercialBank.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
    {
      id: '2',
      name: 'Abebe Kebede Lemma',
      bankname: 'Commercial Bank of Ethiopia',
      AccountNumber: '1000045632466',
      image: require('../assets/Banks/commercialBank.png'),
      imageback: require('../assets/ic_round-navigate-next.png'),
    },
  ]);

  // Fake accounts database
  const accounts = [
    { accountNumber: '123456', holder: 'John Doe' },
    { accountNumber: '789101', holder: 'Alice Smith' },
    { accountNumber: '555666', holder: 'Michael Brown' },
    { accountNumber: '999888', holder: 'Sarah Johnson' },
  ];

  // State for input and matching
  const [account, setAccount] = useState('');
  const [matchedAccounts, setMatchedAccounts] = useState([]);
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Handle typing in input
 

  return (
    <View style={styles.container}>
      <OtherBanktopbar />

      <View style={styles.TopText}>
        <Text style={styles.FirstText}>Enter Account Number</Text>
        <Text style={styles.SecondText}>Enter recipient account number</Text>
      </View>

      <View>
        <Text style={styles.accountText}>Account Number</Text>

        {/* Input box (disabled system keyboard) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Keyboard.dismiss();
            setShowKeyboard(true);
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="000000000000"
            value={account}
            editable={false} // disable system keyboard
          />
        </TouchableOpacity>

        <Text style={styles.belowaccounttext}>Beneficiaries</Text>

        {account === '' ? (
          // Show history if no account typed
          <FlatList
            data={history}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.HistoryBox}>
                <View style={styles.both}>
                  <Image source={item.image} style={styles.bankimage} />
                  <View>
                    <Text style={styles.historyItem}>{item.name}</Text>
                    <Text style={styles.historyItem2}>
                      {item.bankname} <Text>({item.AccountNumber})</Text>
                    </Text>
                  </View>
                </View>
                <View>
                  <Image source={item.imageback} style={styles.backicon} />
                </View>
              </View>
            )}
          />
        ) : matchedAccounts.length > 0 ? (
          // Show matched accounts if found
          <FlatList
            data={matchedAccounts}
            keyExtractor={item => item.accountNumber}
            renderItem={({ item }) => (
              <View style={styles.accountInfo}>
                <Text style={styles.enteredText}>
                  Account Entered: {item.accountNumber}
                </Text>
                <Text style={styles.foundText}>
                  Account Holder: {item.holder}
                </Text>
              </View>
            )}
          />
        ) : (
          // Show message if not found
          <View style={styles.accountInfo}>
            <Text style={styles.notFoundText}>Account not found</Text>
          </View>
        )}

        {account !== '' && (
          <Button
            title="Check"
            onPress={() => console.log('Check account:', account)}
          />
        )}
      </View>

      {/* Custom Keyboard */}
      {showKeyboard && (
        <View style={styles.keyboard}>
          {['1','2','3','4','5','6','7','8','9','0'].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.key}
              onPress={() => handleKeyPress(num)}
            >
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.key} onPress={handleDelete}>
            <Text style={styles.keyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EnterAccountNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
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
  accountText: {
    marginTop: '4%',
    marginHorizontal: '3%',
    fontSize: 14,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    margin: 12,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
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
  enteredText: {
    fontSize: 16,
    marginBottom: 4,
  },
  foundText: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  notFoundText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  HistoryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
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
  },
  both: {
    flexDirection: 'row',
    gap: 10,
  },
  belowaccounttext: {
    marginTop: '25%',
    marginHorizontal: '3%',
    fontSize: 14,
    color: Colors.third,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    margin: '1.5%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
