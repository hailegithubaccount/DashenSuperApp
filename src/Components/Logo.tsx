import { StyleSheet, View, Image } from 'react-native';
import React from 'react';

const Logo = ({ width , height,top  }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Dashen.png")}
        style={[styles.logo, { width, height,top }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    alignSelf:'center'// center the logo horizontally

  },
  logo: {
    // width & height will be overridden by props
  },
});
