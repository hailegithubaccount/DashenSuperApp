import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import OtherBanktopbar from './otherBanktopbar';
import Colors from './Colors';
import AccountSelector from './reusedSelectAccount';
import NextButtonWithModal from './nextButtonwithModal';

interface MoneyInputScreenProps {
 
  topbarTitle: string; //
  showHeader?: boolean;
  showBalance?: boolean; //
  headerTitle?: string;
  headerSubtitle?: string;
  amountPosition?: 'above' | 'below';
}

const MoneyInputScreen: React.FC<MoneyInputScreenProps> = ({
 
  topbarTitle,
  showHeader = false,
  showBalance = false,
  headerTitle = '',
  headerSubtitle = '',
  amountPosition = 'above',
}) => {
  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [account, setAccount] = useState('');

  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const handleKeyPress = (key: string) => setAmount(prev => prev + key);
  const handleBackspace = () => setAmount(prev => prev.slice(0, -1));

  const AmountBox = (
    <View style={styles.amountContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setShowKeyboard(true);
          Keyboard.dismiss();
        }}
      >
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>
            {amount !== '' ? `${amount} Birr` : '0 Birr'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 👇 flexible topbar */}
      <OtherBanktopbar title={topbarTitle} />

      {/* 👇 optional header */}
      <ScrollView>
        {showHeader && (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
          </View>
        )}

        {amountPosition === 'above' && (
          <View style={[styles.amountContainer, { marginTop: '30%' }]}>
            {AmountBox}
          </View>
        )}

        {/* Select Account (always stays steady) */}
        <Text
          style={[
            styles.SelectText,
            amountPosition === 'below' && { marginTop: 70 }, // 👈 extra margin when below
          ]}
        >
          Select Account
        </Text>

        <AccountSelector
          placeholder="000000000000"
          justifyContent="center"
          selectedAccount={account}
          onSelect={value => setAccount(value)}
        />

        {amountPosition === 'below' && (
          <View style={{ marginTop: 0 }}>{AmountBox}</View>
        )}

        {/* Available Balance */}
        {showBalance && (
          <View style={styles.monay}>
            <Text style={{ fontSize: 16, color: Colors.third }}>
              Available Amount:
              <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                {' '}
                ETB 20,000.00
              </Text>
            </Text>
          </View>
        )}
        {/* Number Keyboard */}
        {showKeyboard && (
          <View style={styles.keyboardContainer}>
            <View style={styles.numberGrid}>
              {numberKeys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map(key => (
                    <TouchableOpacity
                      key={key}
                      style={styles.key}
                      onPress={() => handleKeyPress(key)}
                    >
                      <Text style={styles.keyText}>{key}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('.')}
                >
                  <Text style={styles.keyText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.key}
                  onPress={() => handleKeyPress('0')}
                >
                  <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.key} onPress={handleBackspace}>
                  <Text style={styles.keyText}>⌫</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        
      </ScrollView>
    </View>
  );
};

export default MoneyInputScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerContainer: { marginVertical: 10 },
  headerTitle: { fontSize: 29, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, color: Colors.third },
  amountContainer: { marginTop: 3, marginHorizontal: '5%' },
  amountBox: { padding: 15, alignItems: 'center' },
  amountText: { fontSize: 48, fontWeight: 'bold', color: Colors.primary },
  SelectText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.third,
    marginBottom: '2%',
  },
  monay: { marginTop: '5%', alignSelf: 'center' },
  keyboardContainer: {
    marginTop: '5%',
    backgroundColor: '#FBFBFB',
    height: 290,
    padding: 10,
  },
  numberGrid: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    width: 124,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 31 },
});
