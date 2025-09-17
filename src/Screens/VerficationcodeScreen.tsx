import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../Components/Sidbar';
import Logo from '../Components/Logo';
import CustomButton from '../Components/CustomButton';
import Colors from '../Components/Colors';

const Verfication = () => {
  const navigation = useNavigation();
  const inputs = Array(6)
    .fill(0)
    .map(() => useRef(null));
  const [code, setCode] = useState(Array(6).fill(''));

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs[index + 1].current.focus();
    }
  };

  const isComplete = code.every(digit => digit !== '');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Main content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Top bar */}
          <SafeAreaView>
            <Sidebar title="Verify Phone Number" top={50} left={10} />
          </SafeAreaView>

          {/* Logo */}
          <View style={styles.logoWrapper}>
            <Logo width={100} height={100} top={1} />
          </View>

          {/* Verification text */}
          <View style={styles.textWrapper}>
            <Text style={styles.verificationTitle}>Verification Code</Text>
            <Text style={styles.verificationSubText}>
              We've sent you a verification code to
            </Text>
          </View>

          {/* Phone number + change */}
          <View style={styles.phoneRow}>
            <View style={styles.phoneBox}>
              <Text>+251 - 911965566</Text>
            </View>
            <TouchableOpacity style={styles.changeWrapper}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.timerText}>00:00 sec</Text>

          {/* 6 boxes */}
          <View style={styles.codeContainer}>
            {inputs.map((inputRef, index) => (
              <TextInput
                key={index}
                ref={inputRef}
                style={styles.codeBox}
                keyboardType="numeric"
                maxLength={1}
                value={code[index]? "*" : ""}
                onChangeText={text => handleChange(text, index)}
              />
            ))}
          </View>
{/* 
          <Text style={styles.resendText}>Resend SMS Code</Text> */}
        </View>
      </ScrollView>

      {/* ✅ Footer stays at bottom and moves with keyboard */}
      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          onPress={() => navigation.navigate('NewPin')}
          disabled={!isComplete}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Verfication;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  logoWrapper: { alignItems: 'center', marginTop: 150 },
  textWrapper: { alignItems: 'center', marginTop: 40 },
  verificationTitle: { fontWeight: '700', fontSize: 20 },
  verificationSubText: {
    marginTop: 4,
    fontWeight: '400',
    fontSize: 14,
    color: '#8A8A8A',
    textAlign: 'center',
  },
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  phoneBox: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F1F6FF',
    borderRadius: 20,
    backgroundColor: '#d1dbebff',
    paddingHorizontal: 10,
  },
  changeWrapper: { paddingHorizontal: 10 },
  changeText: { color: '#131C66', fontWeight: 'bold' },
  timerText: {
    color: '#131C66',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 30,
  },
  codeBox: {
    borderWidth: 1,
    borderColor: '#B9C9E7',
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
  },
  resendText: {
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  // ✅ Footer button sticks bottom but moves up with keyboard
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
});
