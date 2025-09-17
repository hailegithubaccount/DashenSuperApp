import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import OtherBanktopbar from '../Components/otherBanktopbar';

const SendToOtherBank = () => {
  const navigation = useNavigation();

  const Bank = [
    {
      id: '1',
      title: 'Amara Bank',
      image: require('../assets/Banks/Amara.png'),
     
    },
    {
      id: '2',
      title: 'Zemen Bank',
      image: require('../assets/Banks/ZemenBank.png'),
     
    },
    {
      id: '3',
      title: 'Commerical Bank of Ethiopia',
      image: require('../assets/Banks/commercialBank.png'),
  
    },
    {
      id: '4',
      title: 'Dashen Bank',
      image: require('../assets/Banks/DashenBank.png'),
     
    },
    {
      id: '5',
      title: 'Bank of Abyssinia ',
      image: require('../assets/Banks/Absiniya.png'),
     
    },
    {
      id: '6',
      title: 'Awash International      Bank',
      image: require('../assets/Banks/AwashBank.png'),
     
    },
    {
      id: '7',
      title: 'Commerical Bank of Ethiopia',
      image: require('../assets/Banks/commercialBank.png'),
     
    },
    {
      id: '8',
      title: 'Amara Bank',
      image: require('../assets/Banks/Amara.png'),
     
    },
    {
      id: '9',
      title: 'Zemen Bank',
      image: require('../assets/Banks/ZemenBank.png'),
     
    },
    {
      id: '10',
      title: 'Bank of Abyssinia ',
      image: require('../assets/Banks/Absiniya.png'),
     
    },
    {
      id: '11',
      title: 'Awash International      Bank',
      image: require('../assets/Banks/AwashBank.png'),
     
    },
    {
      id: '12',
      title: 'Dashen Bank',
      image: require('../assets/Banks/DashenBank.png'),
     
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
    onPress={()=>{
        navigation.navigate('EnterAccountNumber',{bankItem:item});

    }}
    
    
    style={styles.BanksContainer}>
      <Image source={item.image} style={styles.BanksImage} />
      <Text style={styles.BanksName}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [searchText, setSearchText] = useState('');
  

  // ✅ Filtered list based on search
  const filteredBanks = Bank.filter(bank =>
    bank.title.toLowerCase().includes(searchText.toLowerCase())
  );



  return (
    <View style={styles.Container}>
     <OtherBanktopbar title="Transfer to other bank" />

      <ScrollView>
        <View style={styles.searchinput}>
          <View>
            <Image
              source={require('../assets/SearchIcons.png')}
              style={styles.searchicon}
            />
          </View>

          
          <View>
            <TextInput
          style={styles.input}
          placeholder="Search Bank"
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="while-editing" // iOS only
          autoCapitalize="none"
          autoCorrect={false}
        />
          </View>
        </View>

        <Text style={styles.selectBankText}>Select a bank</Text>
         <FlatList
        data={filteredBanks} // ✅ using filtered list
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
        ListEmptyComponent={
          <Text style={styles.noResultText}>No bank found</Text>
        }
      />
      </ScrollView>
    </View>
  );
};

export default SendToOtherBank;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  searchinput: {
    flexDirection: 'row',
    height: 50,
    width: '95%',
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '3%',

    alignItems: 'center',
  },
  input: {
    color: 'gray',
  },
  searchicon: {
    width: 24,
    height: 24,
  },
  selectBankText: {
    marginHorizontal: '3%',
    marginTop: '3%',
    fontSize: 20,
    fontWeight: 'semibold',
  },
  BanksContainer: {
    flex: 1,
    maxWidth: 127,
    height: 127,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  BanksImage: {
    width: 95,
    height: 57,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  BanksName: {
    textAlign: 'center',
    fontSize: 14,
  },
  gridContainer: {
    paddingHorizontal: 5, // 🔽 small padding around grid
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'flex-start', // 🔽 items align from left
  },
});
