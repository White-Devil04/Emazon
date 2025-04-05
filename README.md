# Emazon App 🛒

[![Expo](https://img.shields.io/badge/Expo-SDK-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-Latest-green)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A modern e-commerce mobile application built with React Native and Expo.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer) or [Bun](https://bun.sh/) (latest version)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (optional, but recommended)
- Android Studio (for Android development) or Xcode (for iOS development)

## Get started

You can use either Node.js with npm or Bun as your package manager. Choose the option that works best for your workflow.

### Option 1: Setup with Node.js

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/emazon-app.git
   cd emazon-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

### Option 2: Setup with Bun

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/emazon-app.git
   cd emazon-app
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Start the development server
   ```bash
   bun run expo start
   ```

## Development Options

In the terminal output after starting the app, you'll find options to open it in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) - A limited sandbox for trying out app development with Expo

## Project Structure

```
emazon-app/
├── app/                # Main application code with file-based routing
├── assets/             # Static assets like images, fonts, etc.
├── components/         # Reusable UI components
├── constants/          # App constants and configuration
├── hooks/              # Custom React hooks
├── services/           # API and third-party service integrations
└── utils/              # Helper functions and utilities
```

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project # for npm
# or
bun run reset-project # for bun
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [React Native documentation](https://reactnative.dev/docs/getting-started)

## Troubleshooting

- **Metro bundler issues**: Clear the cache with `npx expo start --clear` or `bun run expo start --clear`
- **Dependency conflicts**: Make sure your Node.js/Bun version matches the project requirements
- **Emulator/Simulator problems**: Refer to the [Android](https://docs.expo.dev/workflow/android-studio-emulator/) or [iOS](https://docs.expo.dev/workflow/ios-simulator/) setup guides

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
