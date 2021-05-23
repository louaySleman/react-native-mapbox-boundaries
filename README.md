<p align="center">
  Cross Platform <a href="https://reactnative.dev">React Native</a> UI Toolkit
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-mapbox-boundaries"><img src="https://img.shields.io/badge/npm-v1.1-blue"></a>
  <a href="https://travis-ci.org/react-native-mapbox-boundaries/react-native-mapbox-boundaries"><img src="https://img.shields.io/travis/react-native-elements/react-native-elements/master.svg"></a>
  <a href="https://github.com/react-native-elements/react-native-elements"><img src="https://img.shields.io/badge/stars-5-blue"></a>
</p>

<p align="center">
  <a><img src="https://img.shields.io/badge/sponsors-2-green"></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

</p>

## Get Started

### Installation

```js
npm i react - native - mapbox - boundaries
```

### Usage

Start using the components

```js
import {getBoundaries} from 'react-native-mapbox-boundaries';

const boundries = getBoundaries(area, location);
```

## Methods included:

- [x] getBoundaries
- [x] getCircleRadiusByPx

## React Native Web support

As a cross platform UI Toolkit, you can now use RNE on the web & share your codebase between your React Native + React
web apps. RNE components are rendered perfectly on browser. You can achieve this to target iOS, Android and Web by
collaborating RNE and [React Native for Web](https://github.com/necolas/react-native-web).

## Get Boundaries

Allow you to get the mapBox boundaries for offline download using a center point, and a radius size [km]

```js
import {getBoundaries} from 'react-native-mapbox-boundaries';

const area = 15;
const location = {coords: {latitude: 51.509865, longitude: -0.118092}}
const boundaries = getBoundaries(area, location);
```

and after that we can use the download map using mapbox and our new boundaries

```js
    await MapboxGL.offlineManager.createPack(
    {
        name: 'offlinePack',
        styleURL: MapboxGL.StyleURL.Street,
        bounds: [
            [boundries.neLng, boundries.neLat],
            [boundries.swLng, boundries.swLat],
        ],
    },
    progressListener,
    errorListener
);
```

## Get Dynamic Marker Circle Radius

Allow you to get a dynamic marker radius that's can change by the zoom level, you can use it by adding the marker
element on a `MapboxGL.MarkerView` and use it inside the `radius` this function take 3 params an `area` [m], `zoomLevel`
and must by dynamic depending the mapBox zoom level and a `location` center coordinates.

```js
import {getCircleRadiusByPx} from 'react-native-mapbox-boundaries';

..

<Marker
    type="area"
    radius={getCircleRadiusByPx(area, zoomLevel, location)}
    color={theme.primary}
/>

...
/>
```

## Demo App

Coming soon.

If there is something you's like to see or request a new feature, please submit an
[issue](https://github.com/louaySleman/react-native-mapbox-boundaries/issues/new)
or a
[pull request](https://github.com/louaySleman/react-native-mapbox-boundaries/pulls).

### Core Contributors

We are currently looking for new core contributors that can help lead this project.

[Learn more here](mailto:louayakram12@hotmail.com)

### react-native-mapbox-boundaries
