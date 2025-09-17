import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

const CardItem = ({
  title,
  subtitle,
  image,
  imageTitle=String,    // optional overlay title
  imageSubtitle, // optional overlay subtitle
  enabled = true,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, !enabled && { opacity: 0.5 }]}
      disabled={!enabled}
      onPress={onPress}
    >
      {/* Image with optional overlay text */}
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 8 }}
      >
        {/* {enabled && (imageTitle || imageSubtitle) && (
          <View style={styles.overlayText}>
            {imageTitle && <Text style={styles.imageTitle}>{imageTitle}</Text>}
            {imageSubtitle && <Text style={styles.imageSubtitle}>{imageSubtitle}</Text>}
          </View> 
        )} */}
      </ImageBackground>

      {/* Main title & subtitle beside the image */}
      <View style={styles.rightContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Next arrow */}
      <Image
        source={require("../assets/ic_round-navigate-next.png")}
        style={[styles.nextIcon, !enabled && { opacity: 0.5 }]}
      />
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: "4%",
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
  imageBackground: {
    width: 70,
    height: 70,
    justifyContent: "flex-end",
    padding: 5,
  },
  overlayText: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 4,
    padding: 2,
  },
  imageTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageSubtitle: {
    color: "#fff",
    fontSize: 10,
  },
  rightContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
  },
  nextIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginLeft: 5,
  },
});
