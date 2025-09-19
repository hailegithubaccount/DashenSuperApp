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
  ];

  const handleKeyPress = (key: string) => {
    if (key === '.' && !showDecimal) return;
    // avoid multiple dots
    if (key === '.' && value.includes('.')) return;
    onChange(value + key);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.numberGrid}>
        {numberKeys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                style={styles.key}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress('.')}
            disabled={!showDecimal}
          >
            <Text style={styles.keyText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress('0')}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.key} onPress={handleBackspace}>
            <Text style={styles.keyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NumberPad;

const styles = StyleSheet.create({
  keyboardContainer: {
  
    backgroundColor: '#FBFBFB',
    flexGrow: 0,
    // padding: 10,
  },
  numberGrid: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    width: 124,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 31 },
  rmBtn: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
});
