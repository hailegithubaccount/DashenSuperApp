import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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

  // Request camera permission
  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    getPermissions();
  }, []);

  // Setup QR code scanner to read amount, recipientName, recipientAccount
  const codeScanner: CodeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      for (const code of codes) {
        setIsScanning(false);

        try {
          // Expect QR code data in format: amount:100;recipientName:John Doe;recipientAccount:1234567890
          const data = code.value;
          const parsed = Object.fromEntries(
            data.split(';').map(pair => pair.split(':')),
          );

          const amount = parsed.amount ? parseFloat(parsed.amount) : null;
          const recipientName = parsed.recipientName;
          const recipientAccount = parsed.recipientAccount;

          if (!recipientName || !recipientAccount) {
            throw new Error('Invalid QR');
          }

          if (amount && !isNaN(amount)) {
            // ✅ Case 1: QR contains amount → go to PaymentScreen
            navigation.navigate('QrWithAmount', {
              amount,
              recipient: {
                holder: recipientName,
                AccountNumber: recipientAccount,
              },
            });
          } else {
            // ✅ Case 2: QR has no amount → go to MerchantPaymentScreen
            navigation.navigate('MerchantPaymentScreen', {
              recipient: {
                holder: recipientName,
                AccountNumber: recipientAccount,
              },
            });
          }
        } catch (e) {
          alert('Invalid QR code');
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

      {/* Overlay */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/closeXicons.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={styles.scanTitle}>SCAN QR CODE</Text>
      </View>

      <View style={styles.overlay}>
        <View style={styles.scanFrame} />

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

        <CustomButton title={'cancel'} onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  topRow: {
    flexDirection: 'row',
    paddingVertical: 40,
    marginHorizontal: '3%',
    gap: 70,
    alignItems: 'center',
  },
  scanTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  scanFrame: {
    width: 260,
    height: 260,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  buttonRow: { flexDirection: 'row', marginBottom: 20 },
  smallButton: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: { color: '#fff', fontSize: 14 },
});

export default QrScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
