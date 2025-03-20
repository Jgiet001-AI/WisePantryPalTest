#!/bin/bash

# Build the web app first
npm run build

# Sync the web build to the Android project
npx cap sync android

# Navigate to the Android directory
cd android

# Build the release APK
./gradlew assembleRelease

echo "Release build completed. APK should be in android/app/build/outputs/apk/release/"
