#!/bin/bash

# Make sure the Android SDK directory exists
mkdir -p /opt/android-sdk

# Set environment variables
export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools

# Accept all licenses
yes | sdkmanager --licenses

echo "Android SDK licenses accepted successfully."
