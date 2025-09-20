import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import CustomButton from './CustomButton';

const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import Colors from './Colors';

// ✅ Sample cards with gridData

const CardCarousel = () => {
  const navigation = useNavigation();
  const cards = [
    {
      id: '1',
      name: 'Solomon Kebede Taye',
      balance: '30,000.00 USD',
      budget: '5,000.00 USD',
      accountNumber: '1234 5678 9012',
      gridData: [
        {
          id: '1',
          title: 'Send To Dashen',
          image: require('../assets/sendtodashen.png'),
          onPress: () => navigation.navigate('MiniApp'),
        },
        {
          id: '2',
          title: 'Send To Other Bank',
          image: require('../assets/IC_OtherBank.png'),
          onPress: () => navigation.navigate('SendOtherBank'),
        },
        {
          id: '3',
          title: 'Send To Wallet',
          image: require('../assets/IC_Wallet.png'),
        },
        {
          id: '4',
          title: 'Chat Banking',
          image: require('../assets/chat_banking.png'),
        },
        {
          id: '5',
          title: 'Mobile Top-up',
          image: require('../assets/mobiletopup.png'),
        },
        {
          id: '6',
          title: 'Bill   Payment',
          image: require('../assets/IC_Bill.png'),
        },
        {
          id: '7',
          title: 'Merchant Payment',
          image: require('../assets/merchant.png'),
        },
        {
          id: '8',
          title: 'Request Money',
          image: require('../assets/requestmany.png'),
        },
      ],
    },
    {
      id: '2',
      name: 'Solomon Kebede Taye',
      balance: '45,500.00 USD',
      budget: '10,000.00 USD',
      accountNumber: '9876 5432 1011',
      gridData: [
        {
          id: '1',
          title: 'Send To Dashen',
          image: require('../assets/sendtodashen.png'),
        },
        {
          id: '2',
          title: 'Other Bank',
          image: require('../assets/IC_OtherBank.png'),
        },
        { id: '3', title: 'Wallet', image: require('../assets/IC_Wallet.png') },
        {
          id: '4',
          title: 'Chat Banking',
          image: require('../assets/chat_banking.png'),
        },
      ],
    },
  ];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeGridPage, setActiveGridPage] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isAccountNumberVisible,setisAccountNumberVisible]=useState(false)

  const toggleAccount =()=>setisAccountNumberVisible(!isAccountNumberVisible)

  const toggleBalance = () => setIsBalanceVisible(!isBalanceVisible);

  const cardWidth = width * 0.9;
  const cardSpacing = 20;

  // ✅ Split grid data into pages of 4 icons each
  const getGridPages = (gridData: string | any[], pageSize = 4) => {
    const pages = [];
    for (let i = 0; i < gridData.length; i += pageSize) {
      pages.push(gridData.slice(i, i + pageSize));
    }
    return pages;
  };

  const renderGrid = (gridData: any) => {
    const pages = getGridPages(gridData);

    return (
      <View>
        {/* Grid pages */}
        <FlatList
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.gridPage}>
              {item.map(icon => (
                <TouchableOpacity
                  key={icon.id}
                  style={styles.gridItem}
                  onPress={icon.onPress} // ✅ attach the action here
                >
                  <Image source={icon.image} style={styles.gridIcon} />
                  <Text style={styles.gridText}>{icon.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          onMomentumScrollEnd={e => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveGridPage(index);
          }}
        />

        {/* Grid dots */}
        <View style={styles.dotsContainer}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeGridPage === index
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ width: cardWidth }}>
      {/* Card */}
      <ImageBackground
        source={require('../assets/card.png')}
        style={styles.cardImage}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.cardOverlay}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>My Balance</Text>
            <TouchableOpacity
              style={styles.hideContainer}
              onPress={toggleBalance}
            >
              <Text style={styles.hideText}>
                {isBalanceVisible ? 'Hide' : 'Show'}
              </Text>
              <Image
                source={require('../assets/Eyes.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.accountName}>{item.name}</Text>
            <Text style={styles.balanceAmount}>
              {isBalanceVisible ? item.balance : '**** **** ****'}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.botton}
            onPress={toggleAccount}
            
            
            
            >
              <View>
                <Image
                  source={require('../assets/bankhouese.png')}
                  style={styles.icon}
                />
              </View>
              <View style={{}}>
                <Text
                 style={styles.textinbutton}
                >
                  Account Number
                </Text>
                <Text
                  style={{
                    color: Colors.secondary,
                  }}
                >
                 {isAccountNumberVisible || isBalanceVisible ? item.accountNumber : '**** **** ****'} 
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botton}>
              <View>
                <Image
                  source={require('../assets/solarGraph.png')}
                  style={styles.icon}
                />
              </View>
              <View style={{}}>
                <Text style={styles.textinbutton}>Budget</Text>
                <Text
                  style={{
                    color: Colors.secondary,
                    fontWeight: 'bold',
                  }}
                >
                  5,000.00 USD{' '}
                </Text>
              </View>
            </TouchableOpacity>

           
           
          </View>
        </View>
      </ImageBackground>

      {/* Card Dots */}
      <View style={styles.dotsContainer}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeCardIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Grid with dots */}
      {renderGrid(item.gridData)}
    </View>
  );

  return (
    <FlatList
      data={cards}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      snapToInterval={cardWidth + cardSpacing}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: (width - cardWidth) / 2,
      }}
      onMomentumScrollEnd={e => {
        const index = Math.round(
          e.nativeEvent.contentOffset.x / (cardWidth + cardSpacing),
        );
        setActiveCardIndex(index);
        setActiveGridPage(0); // reset grid page when card changes
      }}
      ItemSeparatorComponent={() => <View style={{ width: cardSpacing }} />}
    />
  );
};

export default CardCarousel;

const styles = StyleSheet.create({
  cardImage: {
    width: width * 0.9,
    height: 200,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardOverlay: { flex: 1, justifyContent: 'space-between' },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%',
  },
  balanceText: { color: 'white', fontWeight: '600', fontSize: 16 },
  hideContainer: { flexDirection: 'row', alignItems: 'center' },
  hideText: { color: 'white', fontWeight: '600', fontSize: 16, marginRight: 5 },
  eyeIcon: { width: 20, height: 20 },
  amountContainer: { alignItems: 'center', marginTop: '5%' },
  accountName: { fontSize: 16, color: 'white' },
  balanceAmount: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botton: {
    flexDirection: 'row',
    gap: 10,
    width: 150,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
  icon: {
    width: 30,
    height: 50,
    resizeMode: 'contain',
  },
  textinbutton: {
    paddingVertical: 2,
    color: Colors.secondary,
  },

  gridPage: {
    width: width * 0.9, // ✅ same width as the card
    alignSelf: 'center', // ✅ center under the card
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // ✅ center items in each row
    paddingVertical: 10,
  },

  gridItem: {
    width: (width * 0.9) / 4, // ✅ 4 items per row inside card width
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gridIcon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    marginBottom: '2%', // ✅ spacing between icon and text
  },

  gridText: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 6,
  },

  // Dots
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: 'blue' },
  inactiveDot: { backgroundColor: 'rgba(0,0,0,0.2)' },
});
function setModalVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}
