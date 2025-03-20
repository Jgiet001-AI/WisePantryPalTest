#!/bin/bash

# Check if a path was provided
if [ "$1" = "" ]; then
  # Try to auto-detect JDK location
  if [ -d "/usr/lib/jvm/default-java" ]; then
    JAVA_HOME="/usr/lib/jvm/default-java"
  elif [ -d "/usr/lib/jvm/java-11-openjdk-amd64" ]; then
    JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
  elif [ -d "/usr/lib/jvm/java-17-openjdk-amd64" ]; then
    JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
  elif [ -d "$ANDROID_SDK_ROOT/jdk" ]; then
    JAVA_HOME="$ANDROID_SDK_ROOT/jdk"
  elif [ -d "$HOME/Library/Java/JavaVirtualMachines" ]; then
    # macOS location
    JAVA_HOME=$(find "$HOME/Library/Java/JavaVirtualMachines" -type d -name "Home" | head -n 1)
    if [ -z "$JAVA_HOME" ]; then
      JAVA_HOME=$(find "$HOME/Library/Java/JavaVirtualMachines" -type d -name "Contents/Home" | head -n 1)
    fi
  elif [ -d "/Library/Java/JavaVirtualMachines" ]; then
    # macOS system location
    JAVA_HOME=$(find "/Library/Java/JavaVirtualMachines" -type d -name "Home" | head -n 1)
    if [ -z "$JAVA_HOME" ]; then
      JAVA_HOME=$(find "/Library/Java/JavaVirtualMachines" -type d -name "Contents/Home" | head -n 1)
    fi
  elif [ -d "C:\\Program Files\\Java" ]; then
    # Windows location
    JAVA_HOME="C:\\Program Files\\Java\\$(ls -1 "C:\\Program Files\\Java" 2>/dev/null | grep jdk | sort -r | head -n 1)"
  elif [ -d "C:\\Program Files (x86)\\Java" ]; then
    # Windows location (x86)
    JAVA_HOME="C:\\Program Files (x86)\\Java\\$(ls -1 "C:\\Program Files (x86)\\Java" 2>/dev/null | grep jdk | sort -r | head -n 1)"
  elif ls "C:\\Windows (C)\\Java" > /dev/null 2>&1; then
    # Windows C drive location with spaces
    WIN_JDK_DIR=$(ls -1 "C:\\Windows (C)\\Java" 2>/dev/null | grep jdk | sort -r | head -n 1)
    JAVA_HOME="C:\\Windows (C)\\Java\\$WIN_JDK_DIR"
  elif [ -d "C:\\Java" ]; then
    # Custom Windows location
    JAVA_HOME="C:\\Java\\$(ls -1 "C:\\Java" 2>/dev/null | grep jdk | sort -r | head -n 1)"
  else
    echo "Could not auto-detect JDK location. Please provide the path as an argument."
    echo "Usage: $0 /path/to/jdk"
    echo "For Windows: $0 'C:\\Windows (C)\\Java\\jdk-23.0.2'"
    exit 1
  fi
else
  # Use the path provided as an argument
  JAVA_HOME="$1"
fi

# Print original path for debugging
echo "Original path: $JAVA_HOME"

# Handle Windows paths with spaces properly
if [[ "$JAVA_HOME" == *"\\"* ]]; then
  # For Windows paths, keep the backslashes for the directory check
  CHECK_PATH="$JAVA_HOME"
  # For display purposes only
  DISPLAY_PATH="$JAVA_HOME"
else
  # For Unix paths
  CHECK_PATH="$JAVA_HOME"
  DISPLAY_PATH="$JAVA_HOME"
fi

# Print debug information
echo "Looking for JDK in: $DISPLAY_PATH"

# Check if the directory exists - use ls to handle paths with spaces
if ! ls "$CHECK_PATH" > /dev/null 2>&1; then
  echo "ERROR: The specified JDK directory does not exist: $DISPLAY_PATH"
  echo "Please check the path and try again."
  echo "For Windows, use: ./set-java-home.sh '/usr/lib/jvm/jdk-23.0.2'"
  exit 1
fi

# Export JAVA_HOME
export JAVA_HOME="$JAVA_HOME"

echo "JAVA_HOME has been set to: $DISPLAY_PATH"

# Display java version to confirm
if [ -x "$JAVA_HOME/bin/java" ]; then
  "$JAVA_HOME/bin/java" -version
else
  echo "WARNING: Could not find java executable in $JAVA_HOME/bin"
  # Try to find java executable in subdirectories
  JAVA_EXEC=$(find "$JAVA_HOME" -name java -type f -executable | head -n 1)
  if [ -n "$JAVA_EXEC" ]; then
    echo "Found java executable at: $JAVA_EXEC"
    "$JAVA_EXEC" -version
  fi
fi
