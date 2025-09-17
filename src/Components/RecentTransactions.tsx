// components/TransactionCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TransactionCard = ({
  name,
  purchasing,
  date,
  amount,
  image,
  statusColor = "orange",
  borderWidth = null,            // 👈 new
  borderStyleType = "dashed", // 👈 new
  borderColor = "#ccc",       // 👈 new
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderBottomWidth: borderWidth,
          borderStyle: borderStyleType,
          borderColor: borderColor,
        },
      ]}
    >
      {/* Left Side */}
      <View style={styles.leftSection}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{purchasing}</Text>
        </View>
      </View>

      {/* Right Side */}
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    padding: 10,
  },
  leftSection: {
    flexDirection: 'row',
  },
  image: {
    width: 31,
    height: 32,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: '6%',
  },
  date: {
    color: 'gray',
    fontSize: 13,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: '6%',
  },
});
