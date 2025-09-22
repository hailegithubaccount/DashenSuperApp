import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../Components/Logo';
import CustomButton from '../Components/CustomButton';
import Carditem from '../Components/CardItems';
import GridSection from '../Components/GirdSection';
import Colors from '../Components/Colors';
import TransactionCard from '../Components/MoneyRequesCard';
import RecentTransactions from '../Components/RecentTransactions';
import CurrencyRow from '../Components/CurrencyRow';
import AutoScrollCarousel from '../Components/AutoScrollCarousel';
import Card from '../Components/cards'

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreens = ({ navigation }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const toggleBalance = () => setIsBalanceVisible(!isBalanceVisible);

  // Auto-scrolling images
 

 

  // Data sets
  const data = [
    {
      id: '1',
      title: 'Send To Dashen',
      image: require('../assets/sendtodashen.png'),
      onpress: () => {
        navigation.navigate('NumberPad');
      },
    },
    {
      id: '2',
      title: 'Send To Other Bank',
      image: require('../assets/IC_OtherBank.png'),
      onpress: () => {
        setModalVisible(true);
      },
    },
    {
      id: '3',
      title: 'Send To Wallet',
      image: require('../assets/IC_Wallet.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '4',
      title: 'Chat Banking',
      image: require('../assets/chat_banking.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '5',
      title: 'Mobile Top-up',
      image: require('../assets/mobiletopup.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '6',
      title: 'Bill Payment',
      image: require('../assets/IC_Bill.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '7',
      title: 'Merchant Payment',
      image: require('../assets/merchant.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
    {
      id: '8',
      title: 'Request Money',
      image: require('../assets/requestmany.png'),
      onpress: () => {
        navigation.navigate('');
      },
    },
  ];

  const seconddata = [
    {
      id: '1',
      title: 'request',
      image: require('../assets/requestblow.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '2',
      title: 'IPS',
      image: require('../assets/IC_IPS.png'),
      screen: 'ProfileScreen',
    },
    {
      id: '3',
      title: 'Budget',
      image: require('../assets/IC_Budget.png'),
      screen: 'OrdersScreen',
    },
    {
      id: '4',
      title: 'Statement',
      image: require('../assets/IC_Statement.png'),
      screen: 'SettingsScreen',
    },
  ];

  const thirddata = [
    {
      id: '1',
      title: 'Dube Ale',
      image: require('../assets/DubeAle.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '2',
      title: 'Z-Mall',
      image: require('../assets/Z_Mall.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '3',
      title: 'Adika',
      image: require('../assets/Adika.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '4',
      title: 'DSTV',
      image: require('../assets/DSTV.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '5',
      title: 'WebSprix',
      image: require('../assets/WEbs.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '6',
      title: 'ichereta',
      image: require('../assets/IChertat.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '7',
      title: 'Ride',
      image: require('../assets/Ride.png'),
      screen: 'BudgetScreen',
    },
    {
      id: '8',
      title: 'Airlines',
      image: require('../assets/airlines.png'),
      screen: 'BudgetScreen',
    },
  ];

 

  

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <Logo width={36} height={36} top={0} />
          <Text style={styles.headerTitle}>Dashen Bank Super App</Text>
          <View style={styles.headerIcons}>
            <Image
              source={require('../assets/refresh.png')}
              style={styles.iconImage}
            />
            <Image
              source={require('../assets/iconoir_refresh.png')}
              style={styles.iconImage}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Card/>
          
        </View>

        {/* Grids */}
       

        {/* Auto-scrolling images */}
        <AutoScrollCarousel/>

        {/* Cards Section */}
        <Carditem
          title="My Cards"
          subtitle="FCY Request, Get Cards & Card Management"
          image={require('../assets/MYcard.png')}
        />

        <Carditem
          title="Smart Pay"
          subtitle="Add Beneficiary, Schedule Payments..."
          image={require('../assets/smartPay.png')}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>More for you</Text>
        </View>

        <GridSection
          data={seconddata}
          showHeader={true}
          backgroundColor={'white'}
        />

        {/* Header outside the container */}
        <View style={styles.sectionHeaderWithButton}>
          <Text style={styles.sectionTitle}>Mini App</Text>
          <TouchableOpacity onPress={() => console.log('See All Pressed')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* White background container for grid items only */}
        <View style={styles.miniAppContainer}>
          <GridSection
            data={thirddata}
            backgroundColor={'white'}
            navigation={navigation}
            showHeader={false}
          />
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Image
              source={require('../assets/ic_round-navigate-next.png')}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderWithButton}>
          <Text style={styles.sectionTitle}>Money Requests</Text>
          <TouchableOpacity onPress={() => console.log('See All Pressed')}>
            <Text style={[styles.seeAllText, { color: Colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionContainer}>
          <TransactionCard
            name="Solomon Kebede"
            date="Jun 14, 2024"
            amount="35,300.00 USD"
            status="Pending"
            image={require('../assets/solomon_kebede.png')}
            borderWidth={1}
            borderStyleType="dashed"
          />
          <TransactionCard
            name="Solomon Kebede"
            date="Jun 14, 2024"
            amount="35,300.00 USD"
            status="Pending"
            image={require('../assets/solomon_kebede.png')}
            borderWidth={1}
            borderStyleType="dashed"
          />
          <TransactionCard
            name="Solomon Kebede"
            date="Jun 14, 2024"
            amount="35,300.00 USD"
            status="Pending"
            image={require('../assets/solomon_kebede.png')}
          />
        </View>

        <View style={styles.sectionHeaderWithButton}>
          <Text style={styles.sectionTitle}>Recent Transaction</Text>
          <TouchableOpacity onPress={() => console.log('See All Pressed')}>
            <Text style={[styles.seeAllText, { color: Colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionContainer}>
          <RecentTransactions
            name="Tena Furniture"
            purchasing="Purchasing chair"
            amount="35,300.00 USD"
            date="Jun 14, 2024"
            image={require('../assets/Down_arrow.png')}
            borderWidth={1}
            borderStyleType="dashed"
          />
          <RecentTransactions
            name="Tena Furniture"
            purchasing="Purchasing chair"
            amount="35,300.00 USD"
            date="Jun 14, 2024"
            image={require('../assets/Down_arrow.png')}
            borderWidth={1}
            borderStyleType="dashed"
          />
          <RecentTransactions
            name="Tena Furniture"
            purchasing="Purchasing chair"
            amount="35,300.00 USD"
            date="Jun 14, 2024"
            image={require('../assets/up_arrow.png')}
          />
        </View>

        <View style={styles.cardContaine2}>
          <ImageBackground
            source={require('../assets/AccountBanners.png')}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.cardOverlay}>
              <View style={styles.balanceContainerd}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/Dashen.png')}
                    style={styles.logoincard}
                  />
                </View>
                <View style={styles.logoTextContainer}>
                  <Text style={styles.logoTitle}>Add Accounts</Text>
                  <Text style={styles.logoSubtitle}>
                    Add new or link additional Dashen Bank accounts.
                  </Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cardButton}>
                  <Image
                    source={require('../assets/bank-account.png')}
                    style={styles.cardButtonImage}
                  />
                  <Text style={styles.cardButtonTitle}>Open New Account</Text>
                  <Text style={styles.cardButtonSubtitle}>
                    Open a new Dashen Bank account
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButton}>
                  <Image
                    source={require('../assets/add-bank-accountwithplus.png')}
                    style={styles.cardButtonImage}
                  />
                  <Text style={styles.cardButtonTitle}>Link Other Account</Text>
                  <Text style={styles.cardButtonSubtitle}>
                    Link your additional Dashen Bank account.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.exchangeHeader}>
          <Text style={styles.exchangeTitle}>Exchange Rates</Text>
          <Text style={styles.exchangeSubtitle}>
            Latest currency exchange rates to USD updates.
          </Text>
        </View>

        <View style={styles.currencyContainer}>
          <CurrencyRow
            flag={require('../assets/usaflag.png')}
            title="USD"
            subtitle="1.00"
            rightIcon={require('../assets/upgreen.png')}
            rightText="104.43"
            onPress={() => console.log('USD clicked')}
            borderWidth={1}
            borderStyleType="dashed"
          />
          <CurrencyRow
            flag={require('../assets/usaflag.png')}
            title="EUR"
            subtitle="1.00"
            rightIcon={require('../assets/reddown.png')}
            rightText="112.60"
            onPress={() => console.log('USD clicked')}
          />
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Image
              source={require('../assets/ic_round-navigate-next.png')}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSafe: {
    backgroundColor: '#fff',
    zIndex: 999,
    height: 100,
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
    alignItems: 'center',
    height: 60,
  },
  headerTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconImage: {
    width: 34,
    height: 34,
  },
  cardContainer: {
    width: width * 0.9, // ✅ matches snapToInterval
    marginHorizontal: width * 0.08,
  },
  cardContaine2: {
    width: width * 0.9, // ✅ matches snapToInterval
    marginHorizontal: width * 0.03,
    marginTop: '5%',
  },

  cardImage: {
    width: width * 0.95,
    height: 200,
    justifyContent: 'space-between',
    padding: 6,
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '3%',
  },
  balanceText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  hideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hideText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  amountContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  accountName: {
    fontSize: 16,
    color: 'white',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  containerofreal: {
 
   
  },
  imageofreal: {
    width: 315,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  balanceContainerd: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: '3%',
  },
  logoContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  logoincard: {
    width: 27,
    height: 27,
  },
  logoTextContainer: {
    justifyContent: 'center',
  },
  logoTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'semibold',
  },
  logoSubtitle: {
    fontSize: 12,
    color: 'white',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'blue',
    width: 5,
    height: 5,
  },
  sectionHeader: {
    marginHorizontal: '3%',
    marginBottom: 5,
  },
  sectionHeaderWithButton: {
    marginHorizontal: '3%',
    marginBottom: 5,
    marginTop:'10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '600',
  },
  miniAppContainer: {
    backgroundColor: 'white',
    marginHorizontal: '3%',
    borderRadius: 20,
    paddingVertical: 10,
  },
  viewAllButton: {
    alignSelf: 'center',
    justifyContent:'center',
    
    flexDirection: 'row',
    gap:5,
    backgroundColor: 'rgba(71,99,255,0.1)',
    padding:7,
   
    borderRadius: 25,
    marginBottom: '3%',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: Colors.primary,
    textAlign:'center',
    alignSelf:'center'
  },
  navIcon: {
    width: 20,
    height: 20,
    alignSelf:'center'
  },
  transactionContainer: {
    backgroundColor: 'white',
    marginHorizontal: '2%',
    borderRadius: 20,
  },
  exchangeHeader: {
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    marginTop: '5%',
  },
  exchangeTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  exchangeSubtitle: {
    fontSize: 16,
    color: Colors.third,
  },
  currencyContainer: {
    backgroundColor: 'white',
    marginHorizontal: '3%',
    borderRadius: 20,
    marginTop: '5%',
  },
  bottomSpacer: {
    marginBottom: 100,
  },
  cardButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width:'45%',
    height: 'auto',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom:10
  },
  cardButtonImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  cardButtonTitle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardButtonSubtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ddd',
  },
});

export default HomeScreens;
