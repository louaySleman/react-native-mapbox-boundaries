/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import styled, { useTheme } from 'styled-components/native';
import { Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import { ProgressBar, Button } from 'react-native-paper';
import { getBoundaries, getCircleRadiusByPx } from 'react-native-mapbox-boundaries';
import Marker from '../../components/Marker';
import config from '../../config';
import { grantLocationPermissions } from '../../utils/permissions';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  width: 100%;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
`;

const SliderContainer = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: column;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 200;
  width: 100%;
`;

const DownloadingContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  flex: 1;
  justify-content: center;
  background-color: #0000006f;
  z-index: 1000;
  width: 100%;
  height: 100%;
  padding: 4%;
  color: white;
`;
const Home = () => {
    const theme = useTheme();
    const map = useRef();
    const camera = useRef();
    useEffect(() => {
        grantLocationPermissions();
        MapboxGL.setAccessToken(config.MAP_BOX_ACCESS_TOKEN);
    }, []);
    const [markers, updateMarkers] = useState([]);
    const [area, updateArea] = useState(0);
    const [userLocation, updateUserLocation] = useState(0);
    const [location, updateLocation] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(7);
    const [progressValue, setProgressValue] = useState(0);
    const [downloading, setDownloadStatus] = useState(false);
    const [cameraRef, onCameraRefChange] = useState();
    const [cameraCoordinates, setCameraCoordinates] = useState();
    const [userWasFocused, setUserWasFocused] = useState(false);

    const progressListener = useCallback(
        (offlineRegion, status) => {
            /**
             * This function create progress bar for offline downloading
             */
            setProgressValue(status.percentage / 100);
            if (status.percentage === 100) {
                setDownloadStatus(false);
            }
        },
        []
    );


    const errorListener = () => {
        setDownloadStatus(false);
    };

    const removePack = async () => {
        await MapboxGL.offlineManager.deletePack('offlinePack');
    };

    const downloadMap = useCallback(async () => {
        /**
         * This function download new pack
         */
        const boundries = getBoundaries(area, location || userLocation);
        setDownloadStatus(true);
        removePack().then(async () => {
            await MapboxGL.offlineManager.createPack(
                {
                    name: 'offlinePack',
                    styleURL: MapboxGL.StyleURL.Street,
                    minZoom: 0,
                    maxZoom: 22,
                    bounds: [
                        [boundries.neLng, boundries.neLat],
                        [boundries.swLng, boundries.swLat],
                    ],
                },
                progressListener,
                errorListener
            );
        });
    }, [area, location, progressListener, userLocation]);

    const handlePin = useCallback(async (e) => {
        console.log('clicked', e);
        const pointInView = e.geometry.coordinates;
        updateLocation({ coords: { longitude: pointInView[0], latitude: pointInView[1] } });
        updateMarkers([{ coordinate: pointInView }]);
    }, []);

    useEffect(() => {
        if (cameraRef && cameraCoordinates) {
            cameraRef.setCamera({
                centerCoordinate: cameraCoordinates,
                zoomLevel: 5,
                animated: false,
            });
        } else if (cameraRef && userLocation && !userWasFocused) {
            cameraRef.setCamera({
                centerCoordinate: [userLocation.coords.longitude, userLocation.coords.latitude],
                zoomLevel: 5,
                animated: false,
            });
            setUserWasFocused(true);
        }
    }, [cameraRef, cameraCoordinates, userLocation, userWasFocused]);

    useEffect(() => {
        if (location) {
            console.log('location updated', location);
            updateArea(5);
            const temp = [location?.coords?.longitude, location?.coords?.latitude];
            updateMarkers([{ coordinate: temp }]);
        }
    }, [location]);

    return (
        <Container>
            <MapContainer>
                <MapboxGL.MapView
                    ref={map}
                    style={{ flex: 1 }}
                    logoEnabled={false}
                    attributionEnabled={false}
                    styleURL={MapboxGL.StyleURL.Street}
                    onPress={handlePin}
                    onRegionDidChange={(ev) => {
                        if (ev.properties.zoomLevel !== zoomLevel) {
                            setZoomLevel(ev.properties.zoomLevel);
                        }
                    }}
                    zoomLevel={10}
                    minZoomLevel={8}
                    compassEnabled={false}>
                    <MapboxGL.UserLocation
                        animated
                        onUpdate={(ev) => {
                            updateUserLocation(ev);
                            if (!location) {
                                updateLocation(ev);
                            }
                        }}
                    />
                    <MapboxGL.Camera
                        ref={(ref) => onCameraRefChange(ref)}
                        minZoomLevel={8}
                        zoomLevel={8}
                        animationMode="flyTo"
                    />
                    {markers.map((point) => (
                        <MapboxGL.MarkerView
                            anchor={{ x: 0.5, y: 0.5 }}
                            draggable={false}
                            key={JSON.stringify(point.coordinate)}
                            coordinate={point.coordinate}>
                            <Marker
                                type="area"
                                radius={getCircleRadiusByPx(area * 1000, zoomLevel, location || userLocation)}
                                color="rgba(255,255,255,0.6)"
                            />
                        </MapboxGL.MarkerView>
                    ))}
                </MapboxGL.MapView>
            </MapContainer>

            <SliderContainer>
                <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgb(255,255,255)']} style={{ padding: 12, height: 200, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>

                    <Text>Set Radius</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Slider
                            style={{ width: '86%' }}
                            value={area}
                            minimumTrackTintColor="blue"
                            onValueChange={useCallback((value) => {
                                updateArea(value);
                                if (location) {
                                    const temp = [location?.coords?.longitude, location?.coords?.latitude];
                                    updateMarkers([{ coordinate: temp }]);
                                }
                            }, [location])}
                            thumbStyle={{
                                height: 20,
                                width: 20,
                                borderWidth: 1,
                                backgroundColor: "white"
                            }}
                            color="green"
                            maximumValue={20}
                            minimumValue={0}
                            step={1}
                            allowTouchTrack
                        />
                        <Text style={{ fontSize: 14 }}>{area} Km</Text>
                    </View>
                    <Button onPress={() => downloadMap()}>Download</Button>
                </LinearGradient>
            </SliderContainer>
            {downloading && (
                <DownloadingContainer>
                    <Text style={{color: 'white'}}>Downloading...</Text>
                    <ProgressBar progress={progressValue} color="#5a189a" />
                </DownloadingContainer>
            )}
        </Container>
    );
};

export default Home;
