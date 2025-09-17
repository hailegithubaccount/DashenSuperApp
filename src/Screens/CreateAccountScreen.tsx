import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../Components/Sidbar';
import Logo from '../Components/Logo';
import CustomTextInput from '../Components/TextInput';
import CustomButton from '../Components/CustomButton';
import Colors from '../Components/Colors';

const Favouri = ({ navigation }) => {
  const [accepted, setAccepted] = useState(false);

  const handleLinkPress = () => {
    Linking.openURL('https://www.example.com');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Main scrollable content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Topbar */}
          <SafeAreaView>
            <Sidebar 
            title="Create Super App Account" 
            top= {10}
            left= {40}
            
            />
          </SafeAreaView>

          {/* Logo */}
          <Logo width={100} height={100} top={23} />

          {/* Registration Section */}
          <View style={styles.registrationSection}>
            <Text style={styles.heading}>Register</Text>
            <Text style={styles.subHeading}>
              Create Dashen Bank Super App account and be part of the digital
              banking system.
            </Text>

            {/* Inputs */}
            <CustomTextInput label="Full Name" placeholder="Enter Full name" />

            <CustomTextInput
              label="Phone Number"
              placeholder="(+251) 9 (0000) (0000)"
              keyboardType="phone-pad"
              showFlag={true}
            />
            <CustomTextInput
              label="Referral (Optional)"
              placeholder="Enter Referral Code"
            />

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAccepted(!accepted)}
              >
                {accepted && <Icon name="check" size={20} color='white' style={styles.checkboxbackground} />}
              </TouchableOpacity>

              <Text style={styles.termsText}>
                I have agreed to the{' '}
                <Text style={styles.linkText} onPress={handleLinkPress}>
                  Terms and Conditions.
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ✅ Fixed footer button */}
      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          onPress={() => navigation.navigate('Verification')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Favouri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  registrationSection: {
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 30,
    marginHorizontal: 20,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '400',
   color: Colors.third,
    marginTop: 2,
    marginHorizontal: 20,
  },
  label: {
    marginHorizontal: 20,
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
 
  termsContainer: {
    flexDirection: 'row',
    top: 10,
    left: 20,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    

    borderWidth:1,
    borderColor:Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
     
  },
  checkboxbackground:{
    backgroundColor:Colors.primary,
    
  },
  termsText: {
    fontSize: 14,
    fontWeight: '600',
    left:10,

  },
  linkText: {
    color: Colors.primary,
  },
  continueButton: {
    width: 370,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.primary,
    marginHorizontal: 20,
    borderRadius: 50,
    marginTop: 10,
    zIndex: 999,
    elevation: 5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color:Colors.secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white', // so it doesn’t overlap text
  },
});
