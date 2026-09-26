import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeWrap}>
          <Text style={styles.badge}>Weather Bloom</Text>
        </View>

        <Text style={styles.title}>{`Your day,\nin full color.`}</Text>

        <Text style={styles.subtitle}>
          Explore a playful weekly forecast, switch effortlessly between light and dark modes,
          and watch the sky match the weather in real time.
        </Text>

        <View style={styles.heroCard}>
          <View style={styles.sunCircle} />
          <View style={styles.cloudOne} />
          <View style={styles.cloudTwo} />
          <View style={styles.rainDrop} />
          <View style={styles.rainDropTwo} />
          <View style={styles.rainDropThree} />
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>City list</Text>
            <Text style={styles.featureText}>Worldwide places with city and country details.</Text>
          </View>
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Weekly view</Text>
            <Text style={styles.featureText}>Sun-Sat forecast with accurate daily temps.</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.buttonText}>Enter forecast</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f2f5ff',
  },
  content: {
    flexGrow: 1,
    padding: 26,
    justifyContent: 'center',
  },
  badgeWrap: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#ffffffaa',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 18,
  },
  badge: {
    color: '#1e3a8a',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '900',
    color: '#101827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: '#384150',
    lineHeight: 28,
    marginBottom: 24,
  },
  heroCard: {
    height: 220,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#f7d67d',
    marginBottom: 22,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ffffff66',
  },
  sunCircle: {
    position: 'absolute',
    right: 42,
    top: 34,
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#ffd166',
    shadowColor: '#ffd166',
    shadowOpacity: 0.65,
    shadowRadius: 22,
  },
  cloudOne: {
    position: 'absolute',
    width: 120,
    height: 42,
    borderRadius: 24,
    backgroundColor: '#ffffffcc',
    left: 28,
    top: 92,
  },
  cloudTwo: {
    position: 'absolute',
    width: 136,
    height: 48,
    borderRadius: 26,
    backgroundColor: '#f8fbffcc',
    left: 104,
    top: 110,
  },
  rainDrop: {
    position: 'absolute',
    left: 80,
    top: 138,
    width: 4,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#5da8ff',
  },
  rainDropTwo: {
    position: 'absolute',
    left: 118,
    top: 152,
    width: 4,
    height: 26,
    borderRadius: 999,
    backgroundColor: '#5da8ff',
  },
  rainDropThree: {
    position: 'absolute',
    left: 156,
    top: 146,
    width: 4,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#5da8ff',
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 26,
  },
  featureBox: {
    flex: 1,
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dfe7ff',
  },
  featureTitle: {
    color: '#0f172a',
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 6,
  },
  featureText: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1d4ed8',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#1d4ed8',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});
