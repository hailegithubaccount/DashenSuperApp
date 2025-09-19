import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const MiniApp = ({ route }) => {
 
  const { Tip } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Tip|| "No title selected"}</Text>
     
    </View>
  );
};

export default MiniApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  amount: {
    fontSize: 18,
    color: "gray",
  },
});
