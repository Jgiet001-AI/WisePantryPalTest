#!/bin/bash

echo "Building Android APK..."

# Build web app
npm run build

# Sync with Android
npx cap sync android

# Build debug APK
cd android && ./gradlew assembleDebug

# Check if build was successful
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
  echo "APK built successfully at: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
  echo "You can find the APK in the android/app/build/outputs/apk/debug/ directory"
  echo "To download it, you'll need to use the 'File' tab in Tempo, navigate to this path, and download it manually"
  echo "Or use 'cp' to copy it to a more accessible location"
  
  # Copy to project root for easier access
  cp app/build/outputs/apk/debug/app-debug.apk ../../smart-pantry.apk
  echo "APK also copied to project root as smart-pantry.apk for easier access"
else
  echo "APK build failed. Check the logs above for errors."
fi
