## To Generate APK (use this untuk have google playstore for developer account):

1. `mkdir ./android/app/src/main/assets`/

2. `touch ./android/app/src/main/assets/index.android.bundle`

3. `react-native bundle --dev false --platform android --entry-file index.tsx --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/`

4. `cd android/ && ./gradlew assembleDebug`
