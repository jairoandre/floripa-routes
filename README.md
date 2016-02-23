# floripa-routes
Hybrid react.js app for search routes in Florianópolis.

## Requirements

- [Node.js](https://nodejs.org/)
- [Phonegap](http://phonegap.com)

```
npm install -g phonegap
```

### Optional

- [Android SDK](http://developer.android.com/sdk/installing/index.html?pkg=tools)
- [Cordova](https://cordova.apache.org/)

## Setup

```
npm install
```

## Run the app

You can run this app in the [browser](http://localhost:3030):

```
npm start
```

To run on mobile through phonegap:

```
npm run phonegap
```

After the server is up, open the phonegap app in your phone/emulator and connect to the server.

### Other scripts (cordova)

```
npm run build
npm run android
npm run ios
```

To run this scripts, you need to add a platform:

```
cordova platform add <platform name>
```

## Test

To run tests, you need to install `mocha` as global dependency:

```
npm install -g mocha
```

And run the test script:

```
npm test
```

That's it!




