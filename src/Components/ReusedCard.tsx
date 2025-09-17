import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../Components/Logo';
import Colors from '../Components/Colors';
import CustomButton from '../Components/CustomButton';

const { width } = Dimensions.get('window');

const HomeScreens = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Header */}
        

        {/* Card Section */}
        <View style={styles.cardContainer}>
          <ImageBackground
            source={require('../assets/card.png')}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 16 }}
          >
            {/* Overlay Info */}
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
                <Text style={styles.accountName}>Solomon Kebede Taye</Text>
                <Text style={styles.balanceAmount}>
                  {isBalanceVisible ? '30,000.00 USD' : '**** **** ****'}
                </Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <CustomButton
               
                  width="48%"
                  height={60}
                  disabledTitle="Disabled"
                  onPress={() => console.log('Pressed!')}
                 backgroundColor="rgba(255,255,255,0.1)"
                  borderRadius={10}
                  title="Account Number"
                  subtitle="****************"
                  disabledSubtitle="Unavailable"
                  onPress={() => console.log("Pressed!")}
                   
                  imageSource={require('../assets/bankhouese.png')}
                  // disabled image
                  
                />
                <CustomButton
                
                  width="45%"
                  height={60}
                  backgroundColor="rgba(255,255,255,0.1)"
                  borderRadius={10}
                  title="Budget"
                  subtitle="5,000.00 USD "
                  onPress={() => console.log("Pressed!")}
                  imageSource={require('../assets/solarGraph.png')} // enabled image
                  // disabled image
                  disabled={false}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#fff',
  },

 
  cardContainer: {
    marginTop: 10,
    marginHorizontal: '2%',
  },
  cardImage: {
    width: width * 0.90,
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
    fontWeight: 'semibold',
    fontSize: 16,
  },
  hideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hideText: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 16,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  amountContainer: {
    alignItems: 'center',
    
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
    gap: 10,
    justifyContent: 'center',
  },
  cardButton: {
    flex: 1,
    backgroundColor: '#012169',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
