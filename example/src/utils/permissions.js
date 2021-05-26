/* eslint-disable import/prefer-default-export */
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const grantLocationPermissions = async () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ],
      {
        title: 'Give Location Permission',
        message: 'App needs location permission to find your position.',
      }
    );
  } else {
    Geolocation.requestAuthorization();
  }
};
