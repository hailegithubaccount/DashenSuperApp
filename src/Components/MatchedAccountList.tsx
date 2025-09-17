// components/MatchedAccountList.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const MatchedAccountList = ({ data, onSelect }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.AccountNumber}
      renderItem={({ item }) => (
        <ImageBackground source={item.ImageBackground} style={styles.backgroundimage}>
          <View style={styles.AccountBox}>
            <View style={styles.bothimageandtext}>
              <View style={styles.avatarWrapper}>
                <Image source={item.image} style={styles.imageofaccountdisplay} />
              </View>
              <View style={styles.holderPLUSaccount}>
                <Text style={styles.holderName}>{item.holder}</Text>
                <Text style={styles.holderAccount}>{item.AccountNumber}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => onSelect(item)}>
              <Image source={item.imageback} style={styles.backiconforaccount} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    />
  );
};

export default MatchedAccountList;

const styles = StyleSheet.create({
  backgroundimage: {
    marginHorizontal: '3%',
    borderRadius: 50,
  },
  AccountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
  },
  bothimageandtext: { flexDirection: 'row', gap: 10 },
  avatarWrapper: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageofaccountdisplay: { width: 58, height: 58 },
  holderPLUSaccount: { justifyContent: 'center' },
  holderName: { fontSize: 16, fontWeight: 'bold', marginVertical: '2%' },
  holderAccount: {},
  backiconforaccount: { width: 24, height: 24, alignSelf: 'center', marginTop: '4%' },
});
