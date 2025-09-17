import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../Components/Sidbar';
import Logo from '../Components/Logo';
import CustomButton from '../Components/CustomButton';
import Colors from './Colors';

const PinScreen = ({
  title = 'Create PIN',
  introTitle = '',
  introSub = '',
  pinTitle = '',
  pinSub = '',
  buttonText = 'Continue',
  onSubmit,
  showButton = true,
}) => {
  const navigation = useNavigation();
  const inputs = Array(6)
    .fill(0)
    .map(() => useRef(null));
  const [pin, setPin] = useState(Array(6).fill(''));

  const handleChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 5) {
      inputs[index + 1].current.focus();
    }
  };

  const isComplete = pin.every(digit => digit !== '');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Bar */}
        <SafeAreaView>
          <Sidebar title={title} top={50} left={10} />
        </SafeAreaView>

        {/* Intro Text */}
        {introTitle ? (
          <View style={styles.introWrapper}>
            <Text style={styles.introTitle}>{introTitle}</Text>
            <Text style={styles.introSub}>{introSub}</Text>
          </View>
        ) : null}

        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Logo width={100} height={100} top={0} />
        </View>

        {/* PIN Setup Section */}
        <View style={styles.pinWrapper}>
          {pinTitle ? <Text style={styles.pinTitle}>{pinTitle}</Text> : null}
          {pinSub ? <Text style={styles.pinSub}>{pinSub}</Text> : null}
        </View>

        {/* PIN Input Boxes */}
        <View style={styles.codeContainer}>
          {inputs.map((inputRef, index) => (
            <TextInput
              key={index}
              ref={inputRef}
              style={styles.codeBox}
              keyboardType="numeric"
              maxLength={1}
              value={pin[index]? "*" : ""}
              onChangeText={text => handleChange(text, index)}
            />
          ))}
        </View>

        {/* Secure PIN Text */}
        <View style={styles.securePassword}>
          <Image
            source={require('../assets/solar_lock-broken.png')}
            style={styles.lockImage}
          />
          <Text style={styles.secureText}>
            A 6-digit PIN that is secure and easy to remember
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      {showButton && (
        <View style={styles.footer}>
          <CustomButton
            title={buttonText}
            onPress={onSubmit}
            backgroundColor={isComplete ? '#131C66' : '#9AA2CC'}
            textColor="#fff"
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  // Intro Section
    introWrapper: {
    marginTop: '20%',
    paddingHorizontal: '5%',
  },
  introTitle: {
    fontWeight: '700',
    fontSize: 24,
   
    color: '000000',
    fontFamily: "Poppins-light",
    
  },
  introSub: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.third,
  },

  // Logo
  logoWrapper: {
    alignItems: 'center',
    marginTop: 50,
  },

  // PIN Section
  pinWrapper: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: '8%',
  },
  pinTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 4,
    color: '#000',
  },
  pinSub: {
    fontWeight: '400',
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },

  // PIN Code Inputs
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '9%',
    marginTop: 30,
    
  },
  codeBox: {
    borderWidth: 1,
    borderColor: '#B9C9E7',
    borderRadius: 10,
    width: 50,
    height: 55,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
   
  },

  // Secure Password Info
  securePassword: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6EDFA',
    borderRadius: 16,
    padding: 5,
    marginTop: 25,
    marginHorizontal: '6%',
  },
  lockImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#131C66',
  },
  secureText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color:Colors.primary,
  },

  // Footer
  footer: { padding: 16, backgroundColor: '#fff' },
});
