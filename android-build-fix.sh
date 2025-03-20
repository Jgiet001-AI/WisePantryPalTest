#!/bin/bash

# This script helps build Android APKs without requiring Android Studio to be installed
# and handles JDK version differences between local and Tempo environments

# Print current Java version
echo "Current Java version:"
java -version

# Check if we're running in the Tempo environment (which has JDK 17)
if java -version 2>&1 | grep -q "17.0"; then
  echo "Detected JDK 17 in Tempo environment (while local environment uses JDK 23)"
  
  # Set JAVA_HOME to JDK 17 for the build process
  export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
  echo "Set JAVA_HOME to: $JAVA_HOME"
  
  # Modify Android Gradle properties to work with JDK 17
  if [ -f "android/gradle.properties" ]; then
    echo "Updating Android Gradle properties for JDK 17 compatibility"
    
    # Add or update properties for JDK 17 compatibility
    if ! grep -q "org.gradle.java.home" "android/gradle.properties"; then
      echo "org.gradle.java.home=$JAVA_HOME" >> "android/gradle.properties"
    else
      sed -i "s|org.gradle.java.home=.*|org.gradle.java.home=$JAVA_HOME|g" "android/gradle.properties"
    fi
    
    # Ensure we're using compatible Gradle version
    if ! grep -q "android.useAndroidX" "android/gradle.properties"; then
      echo "android.useAndroidX=true" >> "android/gradle.properties"
      echo "android.enableJetifier=true" >> "android/gradle.properties"
    fi
  else
    echo "Warning: android/gradle.properties not found"
  fi
else
  echo "Not running in Tempo environment with JDK 17"
  echo "Your environment appears to be using JDK 23"
  echo "No JDK-specific changes needed for local development"
fi

# Make the script executable
chmod +x ./build-android-apk.sh

# Accept Android SDK licenses
mkdir -p "D:\Android"
export ANDROID_HOME="D:\Android"
export PATH=$PATH:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools

# Try to find sdkmanager in different possible locations
SDKMANAGER_PATHS=(
  "$ANDROID_HOME/tools/bin/sdkmanager"
  "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager"
  "$ANDROID_HOME/cmdline-tools/tools/bin/sdkmanager"
  "D:\Android\tools\bin\sdkmanager"
  "D:\Android\cmdline-tools\latest\bin\sdkmanager"
)

for sdkmanager_path in "${SDKMANAGER_PATHS[@]}"; do
  if [ -f "$sdkmanager_path" ]; then
    echo "Found sdkmanager at $sdkmanager_path"
    yes | "$sdkmanager_path" --licenses
    break
  fi
done

# Run the build script
./build-android-apk.sh
