import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../Components/CustomButton";
import Logo from "../Components/Logo";
import Colors from "../Components/Colors";

const SignUp = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/dot.png")}
      style={styles.background}
    >
     
      <View style={styles.TheThreeMainComponent}>
           {/* Top bar */}
        <View>
          <SafeAreaView style={styles.topBar}>
            <View style={styles.dashboardIconBox}>
              <Image
                source={require("../assets/mage_dashboard-fill.png")}
                style={styles.icon}
              />
            </View>

            <View style={styles.rightBoxes}>
              <View style={styles.feedbackBox}>
                <Image
                  source={require("../assets/feedback.png")}
                  style={styles.icon}
                />
                <Text>Feedback</Text>
              </View>

              <View style={styles.languageBox}>
                <Image
                  source={require("../assets/iconoir_language.png")}
                  style={styles.icon}
                />
                <Text>English</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View style={{ alignItems: "center" }}>
         <Logo width={124} height={124} />



          <Text style={styles.welcomeText}>Welcome to Dashen Super App</Text>
          <Text style={styles.subText}>
            Experience advanced banking and lifestyle services—all in one Super
            App. Sign up or log in to access secure, smart, and seamless
            features designed for every part of your life.
          </Text>
        </View>

        {/* Buttons */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CustomButton
            title="Register"
            onPress={() => navigation.navigate("AccountCreate")}
            borderRadius={50}
          />

          <CustomButton
            title="Log In"
            backgroundColor="#fff"
            textColor="#131C66"
            borderColor="#131C66"
            borderRadius={50}
            onPress={() => navigation.navigate("Login")}
          />
        </View>

      </View>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  TheThreeMainComponent:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between'


  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  dashboardIconBox: {
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 5,
    borderColor:Colors.fourth,
    backgroundColor: Colors.fourth,
    padding: 3,
    marginTop: 15,
  },
  icon: {
    width: 27,
    height: 27,
    borderRadius:20
  },
  rightBoxes: {
    flexDirection: "row",
    gap: 10,
    marginRight: 15,
  },
  feedbackBox: {
    flexDirection: "row",
    borderWidth: 1,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.fifth,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    marginTop: 20,
  },
  languageBox: {
    flexDirection: "row",
    borderWidth: 1,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.fifth,
    borderStyle: "solid",
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
  },
  // logo: {
  //   width: 124,
  //   height: 124,
  //   marginBottom: 10,
  // },
  welcomeText: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginTop:'3%'
  },
  subText: {
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
    color: Colors.third,
    paddingHorizontal: 20,
     marginTop:'2%'
  },
});
