import React from "react";
import { Text, StyleSheet } from "react-native";

const AmountDisplay = ({ amount, }) => {
  if (amount === null || amount === undefined) return null;

  return (
    <Text style={[styles.amountText]}>
      {amount} Birr
    </Text>
  );
};

export default AmountDisplay;

const styles = StyleSheet.create({
  amountText: {
    alignSelf: "center",
    marginTop: 24,
    fontSize: 36,
    color: "#989898",
    fontWeight: "bold",
  },
});
