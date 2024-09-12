vite.config.js
Needs Https for development on ios browser for camera usage
Remove this for when loading on to camera

npm run ios:sync - update ios app (build and copy data)
npm run 404 - copies index.html file to 404.html file so that github pages works

npm run ios:run - runs the ios app in dev mode (remove ssl for this)

npm run serve - runs the wpa app in dev mode (need ssl for this)

Building: github/development
For Unix-based systems (Linux/macOS):

MODE=github npm run build

windows:
cross-env MODE=github npm run build
