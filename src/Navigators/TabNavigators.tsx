import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';

// Your screens
import Screen1 from '../Screens/HomeScreens';
import Screen2 from '../Screens/MiniApp';
import Screen3 from '../Screens/ProfileScreen';
import Screen4 from '../Screens/TransactionsScreen';

export default function BottomTabs({ navigation }) {
  // Function to render image + label
  const _renderIcon = (routeName, selectedTab) => {
    let iconSource;
    let label = '';

    switch (routeName) {
      case 'title1':
        iconSource = require('../assets/home-2.png');
        label = 'Home';
        break;
      case 'title2':
        iconSource = require('../assets/nearHomeimage.png');
        label = 'Transactions';
        break;
      case 'title3':
        iconSource = require('../assets/miniapp.png');
        label = 'Mini Apps';
        break;
      case 'title4':
        iconSource = require('../assets/profile.png');
        label = 'Profile';
        break;
    }

    return (
      <>
        <Image
          source={iconSource}
          style={[
            styles.icon,
            { tintColor: routeName === selectedTab ? '#012169' : 'gray' },
          ]}
        />
        <Text
          style={[
            styles.label,
            { color: routeName === selectedTab ? '#131C66' : 'gray' },
          ]}
        >
          {label}
        </Text>
      </>
    );
  };

  // Custom tabBar button
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={70}
      circleWidth={80}
      bgColor="white"
      initialRouteName="title1"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity onPress={() => navigation.navigate('QrScreen')}>
            <Image
              source={require('../assets/QR.png')}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      {/* LEFT side icons */}
      <CurvedBottomBar.Screen
        name="title1"
        position="LEFT"
        options={{
          headerShown: false,
        }}
        component={Screen1}
      />
      <CurvedBottomBar.Screen
        name="title3"
        position="LEFT"
        options={{
          headerShown: false,
        }}
        component={Screen3}
      />

      {/* RIGHT side icons */}
      <CurvedBottomBar.Screen
        name="title2"
        position="RIGHT"
        component={Screen2}
        options={{
          headerShown: false,
        }}
      />
      <CurvedBottomBar.Screen
        name="title4"
        position="RIGHT"
        component={Screen4}
        options={{
          headerShown: false, // removes the top header
        }}
      />
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  bottomBar: {},
  btnCircleUp: {
    bottom: 40, // pushes QR higher above bar
    alignItems: 'center',
    justifyContent: 'center',
    // no background, only the QR image is shown
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});
