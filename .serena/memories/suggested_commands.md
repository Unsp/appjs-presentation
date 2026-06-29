# Suggested commands

## Setup
npm install

## Slides (Slidev)
npm run slides              # dev server http://localhost:3030
npm run slides:build        # build deck (required after slides/** changes)
npm run slides:export       # PDF export

## Demo app (Expo)
npm start                   # expo start --dev-client -c
npm run ios                 # expo run:ios
npm run android             # expo run:android
npm run prebuild            # expo prebuild (required for WebGPU native module)

## Quality gates
npm run lint                # eslint
npm run typecheck           # tsc --noEmit

## Notes
- postinstall runs patch-package (react-native-webgpu patch in patches/)
- slides/ excluded from tsc
- Presenter mode: http://localhost:3030/presenter