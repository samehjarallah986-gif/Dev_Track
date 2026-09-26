import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const cityList = [
  { city: 'Tokyo', country: 'Japan' },
  { city: 'New York', country: 'United States' },
  { city: 'London', country: 'United Kingdom' },
  { city: 'Paris', country: 'France' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Rome', country: 'Italy' },
  { city: 'Cairo', country: 'Egypt' },
  { city: 'Dubai', country: 'United Arab Emirates' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Cape Town', country: 'South Africa' },
  { city: 'Rio de Janeiro', country: 'Brazil' },
  { city: 'Mexico City', country: 'Mexico' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'Jerusalem', country: 'Israel' },
  { city: 'Seoul', country: 'South Korea' },
  { city: 'Bangkok', country: 'Thailand' },
  { city: 'Johannesburg', country: 'South Africa' },
  { city: 'Buenos Aires', country: 'Argentina' },
  { city: 'Nairobi', country: 'Kenya' },
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Lagos', country: 'Nigeria' },
  { city: 'Barcelona', country: 'Spain' },
];

export default function ProfileScreen() {
  const cityGroups = useMemo(() => {
    return cityList.reduce<Record<string, typeof cityList>>((groups, item) => {
      const groupKey = item.country.charAt(0).toUpperCase();
      groups[groupKey] = groups[groupKey] ? [...groups[groupKey], item] : [item];
      return groups;
    }, {});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a city</Text>
      <Text style={styles.subtitle}>All cities and countries available for forecast.</Text>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {Object.entries(cityGroups).map(([letter, items]) => (
          <View key={letter} style={styles.groupWrap}>
            <Text style={styles.groupTitle}>{letter}</Text>
            {items.map((item) => (
              <Pressable key={`${item.city}-${item.country}`} style={styles.cityCard}>
                <Text style={styles.cityName}>{item.city}</Text>
                <Text style={styles.countryName}>{item.country}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf4ff',
    padding: 22,
  },
  heading: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0f172a',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
    marginBottom: 18,
  },
  listContainer: {
    paddingBottom: 30,
  },
  groupWrap: {
    marginBottom: 18,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1d4ed8',
    marginBottom: 10,
    letterSpacing: 1.1,
  },
  cityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d7e2ff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  countryName: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
  },
});