// The app's home screen 
// This page demostartes UseEffect, useState, and reusable UI components
// This screen demostrates API integration using hugging face


import HelloWave from '@/components/HelloWave';
import { ThemedText } from '@/components/themed-text';
import { useTime } from '@/hooks/useTime';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  //This code stores the user's name displayed on the home screen
   const [username, setUsername] = useState('Guest') ;


   const currentTime = useTime() ;



   // API intergration (milestone #2)

   const [temperature, setTemperature] = useState<number | null>(null);
   const [windspeed, setWindSpeed] = useState<number | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

  // This code runs once the screen loads to perform setup logic
   useEffect (() => {
    console.log('Home Screen Loaded') ;
   }, []) ;


   //Weather api function

   const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=31.7683&longitude=35.2137&current_weather=true',
      );

      const data = await response.json();

      if (!data.current_weather) {
        throw new Error ('No weather data available');
      }

      setTemperature(data.current_weather.temperature);
      setWindSpeed(data.current_weather.windspeed);
    } catch (err) {
      console.error(err);
      setError('Failed to load weather data')
    } finally {
      setLoading(false);
    }
   };



   return (
      <View style={styles.container}>
    <HelloWave />
    <ThemedText style={styles.title}>
      Weather App
    </ThemedText>
    <ThemedText style={styles.subtitle}>
      Welcome , {username}
    </ThemedText>
    <ThemedText style={styles.timeText}>
      {currentTime}
    </ThemedText>
    
    {/* Wrap the weather content in the card View */}
    <View style={styles.card}>
      <ThemedText style={styles.cardTitle}>
        Jerusalem's Weather
      </ThemedText>
      <Button title='Get Weather of Jerusalem' onPress={fetchWeather} />
      {loading && (<ActivityIndicator size='large' style={{ marginTop: 10}} />)}
      {error && (
        <ThemedText style={{ color: 'red', marginTop: 10}} >
          {error}
        </ThemedText>
      )}
      {temperature !== null && windspeed !== null && (
         <>
          <ThemedText style={styles.tempText}>
            {temperature}°C
          </ThemedText>
          <ThemedText style={styles.windText}>
            {windspeed.toFixed(1)} km/h
          </ThemedText>
        </>
      )}
    </View>
  </View>
);
}

const  styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#cfe9ff',
    alignItems: 'center',
    paddingTop: 60,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },

  timeText: {
    fontSize: 14,
    marginBottom: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  tempText: {
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 48,
    marginTop: 15,
  },

  windText: {
    fontSize: 18,
    marginTop: 5,
  },

  errorText: {
    color: 'red',
    marginTop: 10,
  },
});