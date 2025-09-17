// Components/HistoryList.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from './Colors';

const HistoryList = ({ history, bankImage, onSelect }) => {
  return (
    <View style={{ marginHorizontal: '3%', marginTop: 10 }}>
      <Text style={styles.historyHeaderText}>Beneficiaries</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <View style={styles.HistoryBox}>
              <View style={styles.both}>
                {bankImage && (
                  <Image
                    source={bankImage}
                    style={styles.bankimage}
                  />
                )}
                <View>
                  <Text style={styles.historyItem}>{item.name}</Text>
                  <Text style={styles.historyItem2}>
                    {item.bankname}{' '}
                    <Text>({item.AccountNumber})</Text>
                  </Text>
                </View>
              </View>
              <Image source={item.imageback} style={styles.backicon} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  historyHeaderText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: '15%',
    color: Colors.third,
  },
  historyItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  historyItem2: {
    fontSize: 14,
    color: Colors.third,
  },
  HistoryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.third,
  },
  backicon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  bankimage: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  both: {
    flexDirection: 'row',
    gap: 10,
  },
});
