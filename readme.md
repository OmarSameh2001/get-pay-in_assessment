# GetPayIn Assessment
## E-commerce with caching and biometrics.

### Features
- 🔐 Login via dummy JSON
- 🔐 Biometric Login (available after first successful login & verification)
- 🛒 All Products page — includes delete access for Super Admin
- 📱 Categories page (smartphones)
- ⏱️ Auto App Lock — locks when inactive or backgrounded for 10 seconds
- 🔓 Unlocking with biometrics or password fallback(`0000`)
- ⚡ Caching with React Query and Persistence with MMKV
- 🌗 Dark Mode, Toasts, Prompts, and Alerts
- ✅ Strict TypeScript Typing used

### Setup
```
npx expo install
expo prebuild
cd android
//connect an android phone with usb debugging
//or a connect to android emulator
./gradelw installDebug
npx expo start --dev-client
```

#### Login
*normal*
username: emilys
password: emilyspass

*super admin*
username: mateon
password: mateonpass

### Trade-offs
- The UI is functional but not styled to production quality.
- With a Figma design, I can match the visual spec precisely.
- Didnt have time for making test cases

### UI