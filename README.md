# Weather Bloom

A playful weather app built with Expo and React Native. It gives users a bright, dynamic interface with weather-reactive visuals, a welcome screen, a global city list, and a weekly forecast that updates based on the selected location.

## Features

- Welcome intro screen before entering the app
- Light and dark mode toggle
- Global city and country selector
- Real-time weather data with Open-Meteo
- Weather-reactive background visuals for:
  - sunny
  - partly sunny
  - cloudy
  - rainy
  - stormy
  - snowy
  - misty
- Weekly forecast from Sunday through Saturday
- Temperature, feels-like, humidity, wind, sunrise, and sunset details
- Responsive, colorful UI designed to feel lively and friendly

## Project structure

- `app/` — app screens and routing
- `app/index.tsx` — welcome/intro screen
- `app/(tabs)/index.tsx` — main weather dashboard
- `app/(tabs)/profile.tsx` — city/country selection screen
- `components/` — reusable UI pieces
- `hooks/` — custom hooks
- `constants/` — theme and app constants

## Requirements

Before running the app, make sure you have:

- Node.js installed
- npm or yarn installed
- Expo CLI available through npm
- Android Studio or iOS simulator if you want to run the app on emulators

## Install

From the project root:

```bash
npm install
```

## Run the app

Start the Expo development server:

```bash
npx expo start
```

Then choose one of the following:

- press `a` to open in Android emulator
- press `i` to open in iOS simulator
- press `w` to open in the web browser
- scan the QR code with the Expo Go app on your phone

## App navigation

1. Open the app and you will land on the welcome screen.
2. Tap the main button to enter the weather dashboard.
3. Use the city list to switch between locations worldwide.
4. Select a city to see current weather and its weekly forecast.
5. Toggle dark/light mode using the mode button in the top-right of the weather screen.
6. View the current condition, humidity, wind, sunrise, and sunset information.

## Weather data

The app uses the Open-Meteo API to fetch:

- current weather conditions
- hourly and daily forecast data
- sunrise and sunset times
- weekly temperature ranges

## Notes for developers

- The app uses Expo Router for file-based navigation.
- Weather logic and UI are handled in the main dashboard screen.
- The app is designed to be easy to extend if you want to add search, favorites, or more weather metrics.

## Useful commands

```bash
npm install
npx expo start
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Troubleshooting

If the app does not start:

- delete `node_modules` and reinstall with `npm install`
- make sure the Expo development server is running
- check that your environment has the necessary emulator or device access
- verify that your device or emulator is connected properly

## License

This project is for educational and personal use.
