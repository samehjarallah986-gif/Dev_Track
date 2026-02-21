// Reusable UI components that displays friendly greetings

import { StyleSheet, Text } from 'react-native';

export default function HelloWave() {
  return <Text style={styles.text}> Hello!       </Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 36,                // slightly bigger
    fontWeight: '700',            // bold
    color: '#ff6b6b',            // friendly color
    textAlign: 'center',          // center alignment
    marginBottom: 20,             // spacing below
    letterSpacing: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,       
  },
});