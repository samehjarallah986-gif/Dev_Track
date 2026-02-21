// Secondary screen of the app

import { ThemedText } from '@/components/themed-text';
import { StyleSheet, View } from 'react-native';

export default function ProfileScreen(){
  return (
    <View style={styles.container}>
      <ThemedText type = 'title'>Profile</ThemedText>
      <ThemedText>This is a secondary screen for the app </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,                
    backgroundColor: '#f2f5fa', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {                  
    fontSize: 28,
    fontWeight: '700',
    color: '#1f1f1f',
    marginBottom: 20,
    textAlign: 'center',
  },
  normalText: {                 
    fontSize: 16,
    color: '#3a3a3a',
    textAlign: 'center',
    lineHeight: 22,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});