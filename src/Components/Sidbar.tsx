import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ title,top,left }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container,{ top,left }]}>
      <View style={styles.headerRow}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/lefticons.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {/* Dynamic Title */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // only works on RN >= 0.71, otherwise use marginRight
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
