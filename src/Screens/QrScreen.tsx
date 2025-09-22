import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
  getCameraDevice,
  CodeScanner,
} from 'react-native-vision-camera';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const QrScreen: React.FC = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [flash, setFlash] = useState<'off' | 'on'>('off');

  const devices = useCameraDevices();
  const device = getCameraDevice(devices, 'back');

  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    getPermissions();
  }, []);

  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      for (const code of codes) {
        setIsScanning(false);
        try {
          const data = code.value;
          const parsed = Object.fromEntries(
            data.split(';').map(pair => pair.split(':')),
          );

          const amount = parsed.amount ? parseFloat(parsed.amount) : null;
          const tip = parsed.tip ? parseFloat(parsed.tip) : null;
          const recipientName = parsed.recipientName;
          const recipientAccount = parsed.recipientAccount;

          if (!recipientName || !recipientAccount) {
            throw new Error('Invalid QR');
          }

          if (amount && !isNaN(amount)) {
            navigation.navigate('AmountScreen', {
              amount,
              tip: tip && !isNaN(tip) ? tip : null, 
              requestType: 'qr',
              recipient: {
                holder: recipientName,
                AccountNumber: recipientAccount,
              },
            });
          } 
          
          // else if (amount && !isNaN(amount)) {
          //   navigation.navigate('AmountScreen', {
          //     amount,
          //     recipient: {
          //       holder: recipientName,
          //       AccountNumber: recipientAccount,
          //     },
          //   });
          // } 
          
          else {
            navigation.navigate('MerchantPaymentScreen', {
              requestType: 'qr',
              recipient: {
                holder: recipientName,
                AccountNumber: recipientAccount,
              },
            });
          }
        } catch (e) {
          Alert.alert('Error', 'Invalid QR code');
          setIsScanning(true);
        }
      }
    },
  });

  if (!device) return <Text style={{ color: 'white' }}>Loading camera...</Text>;
  if (!hasPermission)
    return <Text style={{ color: 'white' }}>No camera permission</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessorFps={2}
        torch={flash}
        codeScanner={isScanning ? codeScanner : undefined}
      />

      {/* Top bar */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/closeXicons.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={styles.scanTitle}>SCAN QR CODE</Text>
      </View>

      {/* Dimmed background with hole */}
      <View style={styles.overlay}>
        {/* Dark areas around scan box */}
        <View style={styles.overlayTop} />
        <View style={styles.row}>
          <View style={styles.overlaySide} />
          <View
            style={[
              styles.scanFrame,
              {
                borderWidth: 1,
                borderRadius: 2,
              },
            ]}
          />
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />

        {/* Buttons below scan box */}
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            padding: 100,
            position: 'absolute',
            marginTop: 400,
          }}
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.buttonText}>Scan From Gallery</Text>
              <Image
                source={require('../assets/gallaryimage.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}
            >
              <Text style={styles.buttonText}>
                {flash === 'off' ? 'Light' : 'Light On'}
              </Text>
              <Image
                source={require('../assets/flashlight.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          <CustomButton
            title={'Cancel'}
            onPress={() => navigation.goBack()}
            width="85%"
            height={55}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const BOX_SIZE = 260;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  topRow: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 80,
    alignItems: 'center',
    zIndex: 10,
  },
  scanTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  row: { flexDirection: 'row', alignItems: 'center' },

  scanFrame: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: 'black',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },

  overlayTop: { flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' },
  overlayBottom: { flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' },
  overlaySide: {
    width: 100,
    height: BOX_SIZE,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  buttonRow: {
    flexDirection: 'row',
    marginVertical: 10,
    width: 400,
    justifyContent: 'center',
  },
  smallButton: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: '22%',
  },
  buttonText: { color: '#fff', fontSize: 14 },
});

export default QrScreen;
