import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, useColorScheme, View
} from 'react-native';

type WeatherLocation = {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

type WeeklyDay = {
  label: string;
  dateKey: string;
  min: number;
  max: number;
  code: number;
};

type WeatherState = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  summary: string;
  condition: 'sunny' | 'partly' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'misty';
  sunrise: string;
  sunset: string;
  weekly: WeeklyDay[];
};

const weatherLocations: WeatherLocation[] = [
  { id: 1, city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  { id: 2, city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006 },
  { id: 3, city: 'London', country: 'United Kingdom', latitude: 51.5072, longitude: -0.1276 },
  { id: 4, city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
  { id: 5, city: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405 },
  { id: 6, city: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964 },
  { id: 7, city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { id: 8, city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708 },
  { id: 9, city: 'Mumbai', country: 'India', latitude: 19.076, longitude: 72.8777 },
  { id: 10, city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  { id: 11, city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
  { id: 12, city: 'Cape Town', country: 'South Africa', latitude: -33.9249, longitude: 18.4241 },
  { id: 13, city: 'Rio de Janeiro', country: 'Brazil', latitude: -22.9068, longitude: -43.1729 },
  { id: 14, city: 'Mexico City', country: 'Mexico', latitude: 19.4326, longitude: -99.1332 },
  { id: 15, city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
  { id: 16, city: 'Jerusalem', country: 'Israel', latitude: 31.7683, longitude: 35.2137 },
  { id: 17, city: 'Seoul', country: 'South Korea', latitude: 37.5665, longitude: 126.978 },
  { id: 18, city: 'Bangkok', country: 'Thailand', latitude: 13.7563, longitude: 100.5018 },
  { id: 19, city: 'Johannesburg', country: 'South Africa', latitude: -26.2041, longitude: 28.0473 },
  { id: 20, city: 'Buenos Aires', country: 'Argentina', latitude: -34.6037, longitude: -58.3816 },
  { id: 21, city: 'Nairobi', country: 'Kenya', latitude: -1.2864, longitude: 36.8172 },
  { id: 22, city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { id: 23, city: 'Lagos', country: 'Nigeria', latitude: 6.5244, longitude: 3.3792 },
  { id: 24, city: 'Barcelona', country: 'Spain', latitude: 41.3851, longitude: 2.1734 },
];

const getConditionFromCode = (code: number): WeatherState['condition'] => {
  if ([0].includes(code)) return 'sunny';
  if ([1, 2].includes(code)) return 'partly';
  if ([3, 45, 48].includes(code)) return 'cloudy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy';
  if ([95, 96, 99].includes(code)) return 'stormy';
  return 'misty';
};

const getConditionLabel = (code: number) => {
  const condition = getConditionFromCode(code);
  const labels: Record<WeatherState['condition'], string> = {
    sunny: 'Sunny',
    partly: 'Partly sunny',
    cloudy: 'Cloudy',
    rainy: 'Rainy',
    stormy: 'Stormy',
    snowy: 'Snowy',
    misty: 'Misty',
  };

  return labels[condition];
};

const toLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const buildWeeklyDates = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  const dayIndex = startOfWeek.getDay();
  startOfWeek.setDate(today.getDate() - dayIndex);
  startOfWeek.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(startOfWeek);
    next.setDate(startOfWeek.getDate() + index);
    return next;
  });
};

const weatherTheme = (condition: WeatherState['condition'], isDark: boolean) => {
  const themes: Record<WeatherState['condition'], { sky: string; glow: string; card: string; accent: string; text: string }> = {
    sunny: {
      sky: isDark ? '#0d1d40' : '#f9d77a',
      glow: '#ffd76a',
      card: isDark ? '#0f1a2f' : '#fff9f2',
      accent: '#ffb703',
      text: isDark ? '#f7f9ff' : '#1c1d26',
    },
    partly: {
      sky: isDark ? '#163a5c' : '#cfe7ff',
      glow: '#ffd166',
      card: isDark ? '#11263d' : '#f6fbff',
      accent: '#7fc8ff',
      text: isDark ? '#eef5ff' : '#132238',
    },
    cloudy: {
      sky: isDark ? '#2b3747' : '#dfeaf7',
      glow: '#c1d7ef',
      card: isDark ? '#1d2630' : '#f5f9ff',
      accent: '#a7bdd9',
      text: isDark ? '#edf3ff' : '#1b2430',
    },
    rainy: {
      sky: isDark ? '#14273b' : '#c6d8f0',
      glow: '#6ba7ff',
      card: isDark ? '#132130' : '#f4f8ff',
      accent: '#5aa9ff',
      text: isDark ? '#eff8ff' : '#122030',
    },
    stormy: {
      sky: isDark ? '#0a1524' : '#d3dbe8',
      glow: '#7f8ebd',
      card: isDark ? '#0e1722' : '#f3f5fa',
      accent: '#6a6eff',
      text: isDark ? '#f3f7ff' : '#191f2d',
    },
    snowy: {
      sky: isDark ? '#23364d' : '#eaf5ff',
      glow: '#dfeeff',
      card: isDark ? '#1b2c3f' : '#f9fcff',
      accent: '#8bd3ff',
      text: isDark ? '#f3f9ff' : '#18293d',
    },
    misty: {
      sky: isDark ? '#2d3943' : '#d9e4eb',
      glow: '#b4c3d3',
      card: isDark ? '#202d36' : '#f4f7fa',
      accent: '#8ea5b7',
      text: isDark ? '#edf3f8' : '#1d2b35',
    },
  };

  return themes[condition];
};

const getWeatherSummary = (location: WeatherLocation, data: any): WeatherState => {
  const current = data.current;
  const daily = data.daily;
  const code = Number(current.weather_code ?? 0);
  const condition = getConditionFromCode(code);
  const summary = getConditionLabel(code);

  const weeklyDates = buildWeeklyDates();
  const weekly = weeklyDates.map((date, index) => {
    const dateKey = toLocalDateKey(date);
    const matchIndex = Array.isArray(daily.time)
      ? daily.time.findIndex((entry: string) => entry === dateKey)
      : -1;
    const actualIndex = matchIndex >= 0 ? matchIndex : Math.min(index, (daily.time?.length ?? 1) - 1);
    const todayData = {
      min: Number(daily.temperature_2m_min?.[actualIndex] ?? 0),
      max: Number(daily.temperature_2m_max?.[actualIndex] ?? 0),
      code: Number(daily.weather_code?.[actualIndex] ?? code),
    };

    return {
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateKey,
      min: Math.round(todayData.min),
      max: Math.round(todayData.max),
      code: todayData.code,
    };
  });

  return {
    temperature: Number(current.temperature_2m ?? 0),
    feelsLike: Number(current.apparent_temperature ?? 0),
    humidity: Number(current.relative_humidity_2m ?? 0),
    windSpeed: Number(current.wind_speed_10m ?? 0),
    summary,
    condition,
    sunrise: (data.daily.sunrise?.[0] ?? '').slice(11, 16),
    sunset: (data.daily.sunset?.[0] ?? '').slice(11, 16),
    weekly,
  };
};

const RainOverlay = ({ color }: { color: string }) => {
  const drops = Array.from({ length: 18 }, (_, index) => index);
  const animatedValues = useRef(drops.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animatedValues.forEach((value, index) => {
      const delay = index * 100;
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 850,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [animatedValues]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      {drops.map((drop, index) => {
        const translateY = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 45],
        });

        return (
          <Animated.View
            key={drop}
            style={{
              position: 'absolute',
              left: `${(index * 13) % 100}%`,
              top: -20,
              width: 2,
              height: 26,
              borderRadius: 999,
              backgroundColor: color,
              opacity: 0.7,
              transform: [{ translateY }],
            }}
          />
        );
      })}
    </View>
  );
};

const SkyVisual = ({ condition, accent, isDark }: { condition: WeatherState['condition']; accent: string; isDark: boolean }) => {
  const isBright = condition === 'sunny' || condition === 'partly';
  const sunColor = condition === 'partly' ? '#f7d35c' : '#ffd54a';
  const sunHalo = condition === 'partly' ? 'rgba(255, 213, 74, 0.35)' : 'rgba(255, 213, 74, 0.8)';
  const cloudColor = condition === 'partly' ? '#ffffff' : condition === 'cloudy' ? '#c9d3df' : '#dfeaf7';
  const cloudOpacity = condition === 'cloudy' || condition === 'partly' || condition === 'rainy' || condition === 'misty' ? 1 : 0.35;

  return (
    <View pointerEvents="none" style={styles.visualWrapper}>
      <View style={[styles.sunGlow, { opacity: isBright ? 1 : 0.35, backgroundColor: sunHalo }]} />
      {(condition === 'sunny' || condition === 'partly') && (
        <View style={[styles.sun, { backgroundColor: sunColor, shadowColor: sunColor }]}> 
          <View style={[styles.sunRays, { borderColor: condition === 'partly' ? '#fbe7a6' : '#ffe791' }]} />
        </View>
      )}
      {(condition === 'cloudy' || condition === 'partly' || condition === 'rainy' || condition === 'misty') && (
        <>
          <View style={[styles.cloud, { opacity: cloudOpacity, backgroundColor: cloudColor }, styles.cloudOne]} />
          <View style={[styles.cloud, { opacity: cloudOpacity * 0.9, backgroundColor: condition === 'partly' ? '#f5f7fb' : cloudColor }, styles.cloudTwo]} />
          <View style={[styles.cloud, { opacity: cloudOpacity * 0.8, backgroundColor: condition === 'partly' ? '#eef3fb' : cloudColor }, styles.cloudThree]} />
        </>
      )}
      {condition === 'rainy' && <RainOverlay color={isDark ? '#bfe1ff' : '#5aa9ff'} />}
      {condition === 'stormy' && (
        <>
          <View style={[styles.cloud, { opacity: 0.8, backgroundColor: '#dfe7ff' }, styles.cloudOne]} />
          <View style={[styles.thunderBolt]} />
        </>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(weatherLocations[0]);
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(colorScheme === 'dark' ? 'dark' : 'light');
  const isDark = themeMode === 'dark';

  useEffect(() => {
    setThemeMode(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  const fetchWeather = async (location: WeatherLocation) => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=7`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.current || !data.daily) {
        throw new Error('Weather service did not return valid forecast data.');
      }

      setWeather(getWeatherSummary(location, data));
    } catch (err) {
      console.error(err);
      setError('Could not load the weather right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedLocation);
  }, [selectedLocation]);

  const theme = useMemo(() => {
    if (!weather) {
      return weatherTheme('sunny', isDark);
    }
    return weatherTheme(weather.condition, isDark);
  }, [weather, isDark]);

  const locationLabel = `${selectedLocation.city}, ${selectedLocation.country}`;

  return (
    <View style={[styles.page, { backgroundColor: theme.sky }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: `${theme.card}CC` }]}> 
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.kicker, { color: theme.text }]}>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</Text>
              <Text style={[styles.heading, { color: theme.text }]}>Weather Bloom</Text>
            </View>
            <Pressable
              onPress={() => setThemeMode((current) => (current === 'dark' ? 'light' : 'dark'))}
              style={[styles.modeButton, { backgroundColor: theme.accent }]}
            >
              <Text style={styles.modeText}>{isDark ? 'Dark' : 'Light'}</Text>
            </Pressable>
          </View>

          <SkyVisual condition={weather?.condition ?? 'sunny'} accent={theme.accent} isDark={isDark} />

          <View style={styles.locationRow}>
            <Text style={[styles.cityText, { color: theme.text }]}>{locationLabel}</Text>
            <Text style={[styles.tempText, { color: theme.text }]}>
              {weather ? `${Math.round(weather.temperature)}°` : '—°'}
            </Text>
          </View>

          <Text style={[styles.summaryText, { color: theme.text }]}>
            {weather ? weather.summary : 'Loading forecast...'}
          </Text>

          <View style={styles.metricRow}>
            <View style={[styles.metricCard, { backgroundColor: `${theme.accent}22` }]}>
              <Text style={[styles.metricLabel, { color: theme.text }]}>Feels like</Text>
              <Text style={[styles.metricValue, { color: theme.text }]}>{weather ? `${Math.round(weather.feelsLike)}°` : '—'}</Text>
            </View>
            <View style={[styles.metricCard, { backgroundColor: `${theme.accent}22` }]}>
              <Text style={[styles.metricLabel, { color: theme.text }]}>Humidity</Text>
              <Text style={[styles.metricValue, { color: theme.text }]}>{weather ? `${weather.humidity}%` : '—'}</Text>
            </View>
            <View style={[styles.metricCard, { backgroundColor: `${theme.accent}22` }]}>
              <Text style={[styles.metricLabel, { color: theme.text }]}>Wind</Text>
              <Text style={[styles.metricValue, { color: theme.text }]}>{weather ? `${Math.round(weather.windSpeed)} km/h` : '—'}</Text>
            </View>
          </View>

          {loading && <ActivityIndicator size="large" style={styles.loader} color={theme.accent} />}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={[styles.sectionCard, { backgroundColor: `${theme.card}CC` }]}> 
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore cities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityScroller}>
            {weatherLocations.map((location) => {
              const isSelected = selectedLocation.id === location.id;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={location.id}
                  onPress={() => setSelectedLocation(location)}
                  style={[
                    styles.cityPill,
                    { backgroundColor: isSelected ? theme.accent : isDark ? '#1a2430' : '#edf4ff' },
                  ]}
                >
                  <Text style={[styles.cityPillText, { color: isSelected ? '#ffffff' : theme.text }]}>{location.city}</Text>
                  <Text style={[styles.cityPillCountry, { color: isSelected ? '#ffffff' : theme.text }]}>{location.country}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: `${theme.card}CC` }]}> 
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly forecast</Text>
          <View style={styles.weeklyRow}>
            {weather?.weekly.map((day) => (
              <View key={day.dateKey} style={[styles.weekCard, { backgroundColor: isDark ? '#0d1724' : '#f7fbff' }]}> 
                <Text style={[styles.weekDay, { color: theme.text }]}>{day.label}</Text>
                <Text style={[styles.weekCode, { color: theme.accent }]}>{getConditionLabel(day.code)}</Text>
                <Text style={[styles.weekTemp, { color: theme.text }]}>{day.max}°</Text>
                <Text style={[styles.weekLow, { color: isDark ? '#d8e5ff' : '#5b6273' }]}>{day.min}°</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.sectionCard, { backgroundColor: `${theme.card}CC` }]}> 
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Sunrise & sunset</Text>
          <View style={styles.sunRow}>
            <View style={styles.sunMeta}>
              <Text style={[styles.sunLabel, { color: theme.text }]}>Sunrise</Text>
              <Text style={[styles.sunValue, { color: theme.text }]}>{weather ? weather.sunrise : '--:--'}</Text>
            </View>
            <View style={styles.sunMeta}>
              <Text style={[styles.sunLabel, { color: theme.text }]}>Sunset</Text>
              <Text style={[styles.sunValue, { color: theme.text }]}>{weather ? weather.sunset : '--:--'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 36,
  },
  hero: {
    borderRadius: 30,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 26,
    elevation: 8,
    minHeight: 440,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    marginTop: 6,
  },
  modeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  modeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  visualWrapper: {
    height: 170,
    position: 'relative',
    marginBottom: 12,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sunGlow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 100,
    top: 6,
    right: 18,
    opacity: 0.7,
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  sun: {
    position: 'absolute',
    right: 44,
    top: 30,
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOpacity: 0.7,
    shadowRadius: 14,
  },
  sunRays: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.8,
  },
  cloud: {
    position: 'absolute',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  cloudOne: {
    width: 120,
    height: 52,
    left: 22,
    top: 42,
  },
  cloudTwo: {
    width: 140,
    height: 56,
    left: 90,
    top: 68,
  },
  cloudThree: {
    width: 110,
    height: 44,
    left: 90,
    top: 54,
  },
  thunderBolt: {
    position: 'absolute',
    right: 98,
    top: 58,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 32,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f4d35e',
    transform: [{ rotate: '12deg' }],
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  cityText: {
    fontSize: 22,
    fontWeight: '700',
    maxWidth: '72%',
  },
  tempText: {
    fontSize: 52,
    fontWeight: '800',
    lineHeight: 52,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    opacity: 0.8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.7,
  },
  metricValue: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 16,
    color: '#ff5d73',
    fontWeight: '700',
  },
  sectionCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  cityScroller: {
    paddingBottom: 4,
    paddingRight: 8,
  },
  cityPill: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginRight: 12,
    minWidth: 130,
  },
  cityPillText: {
    fontSize: 16,
    fontWeight: '700',
  },
  cityPillCountry: {
    fontSize: 11,
    opacity: 0.8,
    marginTop: 4,
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  weekCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 18,
    alignItems: 'center',
  },
  weekDay: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  weekCode: {
    marginTop: 8,
    fontSize: 10,
    textAlign: 'center',
  },
  weekTemp: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
  },
  weekLow: {
    marginTop: 2,
    fontSize: 14,
    opacity: 0.85,
  },
  sunRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sunMeta: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 4,
  },
  sunLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  sunValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
  },
});