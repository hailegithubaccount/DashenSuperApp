import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CountryFlag from 'react-native-country-flag';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  showFlag = false,
  borderRadius = 8,
  marginTop = 15, // optional: show country flag for phone
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginTop,
        },
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}

      {showFlag ? (
        <View style={styles.inputContainer}>
          <CountryFlag isoCode="ET" size={24} style={styles.flagIcon} />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
          />
        </View>
      ) : (
        <TextInput
          style={[
            styles.textInputDefault,
            {
              borderRadius,
            },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
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
  textInputDefault: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,

    backgroundColor: '#F8F8F8',

    paddingHorizontal: 10,
    height: 50,
  },
  flagIcon: {
    marginRight: 10,
    borderRadius: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
});
