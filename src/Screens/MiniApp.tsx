import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import NumberPad from "../Components/NumberPad"; // adjust path

const AmountScreen = () => {
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.container}>
      {/* Amount Box */}
      <View style={styles.amountContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>
              {amount || "0.00"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Number Pad */}
      <NumberPad value={amount} onChange={setAmount} />
    </View>
  );
};

export default AmountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "flex-end" },
  amountContainer: { alignItems: "center", marginTop: 50 },
  amountBox: {
    borderBottomWidth: 2,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  amountText: { fontSize: 32, fontWeight: "bold", color: "#333" },
});
