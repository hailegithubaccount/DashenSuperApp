// components/CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import Colors from "../Components/Colors";

const CustomButton = ({
  title,
  subtitle = null,
  disabledSubtitle = null,
  onPress,
  backgroundColor = Colors.primary,
  textColor = "#fff",
  titleSize = 16,      
  subtitleColor = "#eee",
  subtitleSize = 13,   
  borderColor = null,
  width = "95%",
  height = 60,
  borderRadius = 50,
  disabled = false,
  layout = "row", 
}) => {
  return (
    
    <TouchableOpacity
      style={[
        styles.button,
        
        {
          backgroundColor: disabled ? Colors.third : backgroundColor,
          width,
          height,
          borderRadius,
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor || "transparent",

         
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          styles.content,
          layout === "column" && { flexDirection: "column" },
        ]}
      >
        {/* ✅ Image */}
       

        {/* ✅ Texts */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor, fontSize: titleSize }]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: subtitleColor, fontSize: subtitleSize },
              ]}
            >
              {disabled ? disabledSubtitle || subtitle : subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    paddingHorizontal: 16,
    
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    
  },
  subtitle: {
    fontWeight: "400",
    
  },
});

export default CustomButton;
