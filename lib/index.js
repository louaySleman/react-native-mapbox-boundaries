import { PixelRatio } from 'react-native';

export const getBoundaries = (area, location) => {
    /**
     * This function return map boundaries
     * [
     *  {area: '232653', location: {coords: {latitude, longitude}}}
     * ]
     * @param {number} area Miles
     * @param {$ObjMap} location The location coordinates from mapbox //ex: coords: {latitude: number, longitude: number}
     * @return {$ObjMap} //ex: { neLng: '11' ,neLat: '12',swLng: '12', swLat: '12' }
     */
        // 1° of latitude ~= 69 miles ~= 111 kms, 1° of longitude ~= cos(latitude)*69 ~= cos(latitude)*111
    const deltaLat = area / 111;
    const data = location; // location || userLocation
    const lat = location.coords.latitude;
    const deltaLng = area / Math.abs(Math.cos((lat * Math.PI) / 180) * 111);
    const neLng = data.coords.longitude + deltaLng;
    const neLat = data.coords.latitude + deltaLat;
    const swLng = data.coords.longitude - deltaLng;
    const swLat = data.coords.latitude - deltaLat;
    return {
        neLng,
        neLat,
        swLng,
        swLat,
    };
};

export const getCircleRadiusByPx = (meters, zoomLevel, location) => {
    /**
     * This function return map point radius for offline map
     * [
     *  {meters: '12', zoomLevel: '10',  location: {coords: {latitude, longitude}}}
     * ]
     * @return {number} 12.2
     */
    const mapPixels =
        meters / (78271.484 / 2 ** zoomLevel) / Math.cos((location.coords.latitude * Math.PI) / 180);
    return mapPixels * Math.floor(PixelRatio.get());
};
