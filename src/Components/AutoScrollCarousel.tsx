import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85; // slightly smaller than full width
const SPACING = 15; // space between items

const images = [
  require('../assets/realImage.png'),
  require('../assets/realImage.png'),
  require('../assets/realImage.png'),
];

const AutoScrollCarousel = () => {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScrollEnd = (e) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / (ITEM_WIDTH + SPACING));
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled={false} // we handle snapping manually
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: SPACING / 2 }}
        snapToInterval={ITEM_WIDTH + SPACING} // snap to item
        decelerationRate="fast"
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: SPACING / 2 }}>
            <Image source={item} style={styles.image} />
          </TouchableOpacity>
        )}
      />
      {/* Pagination dots */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: index === currentIndex ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 20,
  },
  image: {
    width: ITEM_WIDTH,
    height: 100,
    borderRadius: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: 'blue',
    marginHorizontal: 4,
  },
});

export default AutoScrollCarousel;
