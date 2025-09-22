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
    [showDecimal ? '.' : '', '0', '⌫'], 
  ];

  const handleKeyPress = (key: string) => {
    if (!key) return; 
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
    backgroundColor: 'white',
    marginHorizontal:"2%"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '3%',
  },
  key: {
    width: "30%",
    height: 70,
    borderRadius: 8,
    borderWidth:2,
    borderColor:'#FBFBFB',
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 31 },
});
