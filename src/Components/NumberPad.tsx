import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type NumberPadProps = {
  value: string;
  onChange: (val: string) => void;
  showDecimal?: boolean;
};

const NumberPad: React.FC<NumberPadProps> = ({
  value,
  onChange,
  showDecimal = true,
}) => {
  const numberKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [showDecimal ? '.' : '', '0', '⌫'], // last row with 0 centered
  ];

  const handleKeyPress = (key: string) => {
    if (!key) return; // skip empty
    if (key === '.' && !showDecimal) return;
    if (key === '.' && value.includes('.')) return;
    if (key === '⌫') {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + key);
    }
  };

  return (
    <View style={styles.keyboardContainer}>
      {numberKeys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={styles.key}
              onPress={() => handleKeyPress(key)}
              disabled={!key}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  keyboardContainer: {
    backgroundColor: '#FBFBFB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    width: 80,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 28 },
});
