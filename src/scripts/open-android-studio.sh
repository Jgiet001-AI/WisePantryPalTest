#!/bin/bash

# This script helps open Android Studio from the Docker container
echo "Attempting to open Android Studio at D:\\Android\\bin\\studio64.exe"
echo "Please note: Docker containers cannot directly open applications on the host machine."
echo "You'll need to manually open Android Studio and open the project at:"
echo "$(pwd)/android"

# For future reference, you can set this in your host environment:
# export CAPACITOR_ANDROID_STUDIO_PATH="D:\\Android\\bin\\studio64.exe"
