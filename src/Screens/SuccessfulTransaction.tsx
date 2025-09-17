import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Colors from '../Components/Colors';
import OtherBanktopbar from '../Components/otherBanktopbar';

const SuccessfulTransaction = ({ route, navigation }) => {
  const { amount, recipientAccount, recipientName, isBudgetEnabled } =
    route.params || {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={require('../assets/successfully-done2.png')}
            style={styles.imageofrigth}
          />
          <Image
            source={require('../assets/backof.png')}
            style={styles.backoffimage}
          />

          <Text style={styles.bigtext}>Money Successfully Sent!</Text>
          <Text style={styles.nexttext}>
            You have successfully sent money! Thank you for using our service.
          </Text>
          <Text style={styles.Amounttext}>
            {amount}.00
            <Text style={styles.currencyText}>(ETB)</Text>
          </Text>
        </View>

        <View style={styles.transactionBox}>
          <View style={styles.content}>
            <Text style={styles.firstText}>Sender Account:</Text>
            <Text style={styles.secondText}>Abebe Ayele Girma</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Recipient Account:</Text>
            <Text style={styles.secondText}>{recipientAccount}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Recipient Name:</Text>
            <Text style={styles.secondText}>{recipientName}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Transaction ID:</Text>
            <Text style={styles.secondText}>FT328098MNH6</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Transaction Reference:</Text>
            <Text style={styles.secondText}>101204954873844</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Budget Type:</Text>
            <Text style={styles.secondText}>
              {isBudgetEnabled ? 'ON Budget' : 'OFF Budget'}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.firstText}>Fee:</Text>
            <Text style={styles.secondText}>0.00 ETB</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.totalText}>Total Amount:</Text>
            <Text style={styles.secondText}>{amount} ETB</Text>
          </View>
          <View style={styles.content2}>
            <Text style={styles.totalText2}>Status:</Text>
            <View style={styles.successBox}>
              <Image
                source={require('../assets/righticons.png')}
                style={styles.successIcon}
              />
              <Text style={styles.seccuessText}>Success</Text>
            </View>
          </View>
        </View>

        <View style={styles.rowButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={require('../assets/uit_print.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={require('../assets/uit_print.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Print</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButton}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Tab')}
          >
            <Text style={styles.nextButtonText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SuccessfulTransaction;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 },

  box: {
    backgroundColor: '#F2FFF7',
    marginTop: '20%',
  },
  imageofrigth: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    position: 'absolute',
  },
  backoffimage: {
    width: 175,
    height: 175,
    alignSelf: 'center',
  },
  bigtext: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nexttext: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    marginTop: '1%',
  },
  Amounttext: {
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '7%',
  },
  currencyText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },

  transactionBox: {
    marginTop: 10,

    borderRadius: 10,
    padding: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  content2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  firstText: { fontSize: 14 },
  secondText: { fontSize: 16 },
  totalText: { fontSize: 14 },
  totalText2: {
    fontSize: 14,
    alignSelf: 'flex-end',
  },

  successBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#ddf5d6ff',
    padding: 6,
    borderRadius: 20,
  },
  successIcon: {
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  seccuessText: {
    color: 'rgba(11,156,49,0.8)',
    fontSize: 16,
    fontWeight: '500',
  },

  rowButtons: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.third,
    width: 150,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  actionText: {
    fontSize: 16,
  },

  bottomButton: { marginHorizontal: '3%', marginTop: '5%' },
  nextButton: {
    backgroundColor: Colors.primary || '#007bff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
