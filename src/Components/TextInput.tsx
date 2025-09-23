import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CountryFlag from 'react-native-country-flag';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  showFlag = false,
  showImage = false,
  imageSource,
  borderRadius = 8,
  marginTop = 15,
  onPressInput, // 👈 NEW PROP
  editable = true, // fallback if not modal
}) => {
  const InputField = (
    <View style={styles.inputContainer}>
      {showFlag && (
        <CountryFlag isoCode="ET" size={24} style={styles.flagIcon} />
      )}

     

      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={onPressInput ? false : editable} // disable typing if modal
        pointerEvents={onPressInput ? 'none' : 'auto'} // avoid keyboard opening
      />

       {showImage && imageSource && (
        <Image source={imageSource} style={styles.leftIcon} />
      )}
    </View>
  );

  return (
    <View style={[styles.container, { marginTop }]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {onPressInput ? (
        <TouchableOpacity onPress={onPressInput} activeOpacity={0.7}>
          {InputField}
        </TouchableOpacity>
      ) : (
        InputField
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 8,
  },
  flagIcon: {
    marginRight: 10,
    borderRadius: 3,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
});
