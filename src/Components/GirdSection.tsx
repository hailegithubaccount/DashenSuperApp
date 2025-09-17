import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const GridSection = ({
  data = [],
  backgroundColor = "#f0f0f0",
  numColumns = 4,
  disabledItems = [],
  onpress = () => {},
  headerTitle,
  onHeaderPress = () => {},
}) => {
  const renderItem = ({ item }) => {
    const isDisabled = disabledItems.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.gridItem,
          backgroundColor ? { backgroundColor } : {},
          isDisabled && { opacity: 0.4 },
        ]}
        onPress={item.onpress ? item.onpress : () => onpress(item)}
        disabled={isDisabled}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: 10 }}>
      {headerTitle && (
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>{headerTitle}</Text>
          <TouchableOpacity onPress={onHeaderPress}>
            <Text style={styles.headerRightText}>See All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default GridSection;

const styles = StyleSheet.create({
  gridContainer: { padding: 10 },
  row: { justifyContent: 'space-between' },
  gridItem: {
    flex: 1,
    margin: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  image: { width: 56, height: 56, marginBottom: 10, resizeMode: 'contain' },
  itemText: { fontSize: 14, textAlign: 'center' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  headerText: { fontSize: 16, color: 'gray', fontWeight: '600' },
  headerRightText: { fontSize: 16, color: 'gray', fontWeight: '600' },
});
