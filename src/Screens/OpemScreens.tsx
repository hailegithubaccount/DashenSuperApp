import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const OpenPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignUp');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/openScreens.png')} 
      style={styles.background}
    >
      <View style={styles.centerWrapper}>
        <Image
          source={require('../assets/dashenopenlogo.png')}
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

export default OpenPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
  logo: {
    width: 126,
    height: 151,
    resizeMode: 'contain',   
  },
});
