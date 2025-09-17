

import React from "react";
import PinScreen from "../Components/page";

export default function Page1({navigation}) {
  return (
    <PinScreen
      title="Confirm PIN"
      introTitle="You are almost finished"
      introSub="You're just one step away! Set up your secure PIN to complete the setup and access your account."
      pinTitle="Confirm PIN"
      pinSub="Re-enter your PIN to confirm and ensure it's correct."
       buttonText="Continue"
      onSubmit={() => navigation.navigate("Tab")}
    />
  );
}















// import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
// import React, { useRef } from "react";
// import { useNavigation } from "@react-navigation/native";

// const Confrim = () => {
//   const navigation = useNavigation();
//   const inputs = Array(6)
//     .fill(0)
//     .map(() => useRef(null));

//   const handleChange = (text, index) => {
//     if (text && index < 5) {
//       inputs[index + 1].current.focus(); // jump to next box
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Topbar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require("../assets/lefticons.png")}
//             style={styles.backIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.topTitle}>Confirm PIN</Text>
//       </View>

//       {/* Intro Text */}
//       <View style={styles.introText}>
//         <Text style={styles.title}>You are almost finished</Text>
//         <Text style={styles.subtitle}>
//           You're just one step away! Set up your secure PIN to complete the
//           setup and access your account.
//         </Text>
//       </View>

//       {/* Logo */}
//       <Image
//         source={require("../assets/dashenlogo.png")}
//         style={styles.logo}
//       />

//       {/* Confirm PIN Section */}
//       <View style={styles.confirmSection}>
//         <Text style={styles.title}>Confirm PIN</Text>
//         <Text style={styles.subtitle}>
//           Re-enter your PIN to confirm and ensure it's correct.
//         </Text>
//       </View>

//       {/* PIN Input Boxes */}
//       <View style={styles.pinContainer}>
//         {inputs.map((inputRef, index) => (
//           <TextInput
//             key={index}
//             ref={inputRef}
//             style={styles.pinInput}
//             keyboardType="numeric"
//             maxLength={1}
//             onChangeText={(text) => handleChange(text, index)}
//           />
//         ))}
//       </View>

//       {/* Continue Button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate("confrim")}
//         style={styles.continueButton}
//       >
//         <Text style={styles.continueButtonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Confrim;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   topBar: {
//     flexDirection: "row",
//     gap: 20,
//     marginTop: 50,
//     marginLeft: 10,
//     alignItems: "center",
//   },
//   backIcon: {
//     width: 20,
//     height: 20,
//   },
//   topTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   introText: {
//     marginLeft: 20,
//     marginTop: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: "400",
//     color: "#8A8A8A",
//     marginRight: 20,
//   },
//   logo: {
//     width: 72,
//     height: 72,
//     alignSelf: "center",
//     marginTop: 60,
//   },
//   confirmSection: {
//     alignItems: "center",
//     marginTop: 100,
//     paddingHorizontal: 40,
//   },
//   pinContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     margin: 20,
//   },
//   pinInput: {
//     borderWidth: 1,
//     borderColor: "#333",
//     borderRadius: 8,
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 20,
//   },
//   continueButton: {
//     width: "90%",
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#131C66",
//     borderRadius: 50,
//     alignSelf: "center",
//     marginTop: 20,
//     elevation: 5,
//   },
//   continueButtonText: {
//     fontWeight: "600",
//     fontSize: 16,
//     color: "#FFFFFF",
//   },
// });
