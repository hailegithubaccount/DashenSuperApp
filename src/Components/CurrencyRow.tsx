import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from './Colors';

const CurrencyRow = ({
  flag,
  title,
  subtitle,
  rightIcon,
  rightText,
  onPress,
  borderWidth = 0,   // 👈 clearer name
  borderStyleType = "solid",
  borderColor ='#ccc', // 👈 clearer name
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomWidth: borderWidth,
          borderStyle: borderStyleType,
          borderColor: borderColor,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Left side */}
      <View style={styles.leftSection}>
        {flag && (
          <Image source={flag} style={styles.flag} resizeMode="contain" />
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Right side */}
      <View style={styles.rightSection}>
        {rightIcon && (
          <Image
            source={rightIcon}
            style={styles.rightIcon}
            resizeMode="contain"
          />
        )}
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default CurrencyRow;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
    paddingVertical: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    width: 40,
    height: 30,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rightIcon: {
    width: 12,
    height: 12,
  },
  rightText: {
    fontSize: 14,
  },
});
