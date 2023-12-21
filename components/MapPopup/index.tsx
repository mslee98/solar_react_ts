import React, { useCallback, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    useMap,
    useMapEvents,
    Rectangle
} from 'react-leaflet';
import './styles.css';

/**
 * leaflet-container이걸 정의하지 않으면 css를 가져올 수 없음 주의
 */
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import axios from 'axios';

const MapPopup = () => {

    const center = [37,127]

    const [southWest, setSouthWest] = useState([center[0]-0.05, center[1]-0.05]);
    const [northEast, setNorthEast] = useState([center[0]+0.05, center[1]+0.05]);

    const MapEvents = () => {
        const map = useMapEvents({
            click(e) {
                setSouthWest([e.latlng.lat - 0.05, e.latlng.lng - 0.05]);
                setNorthEast([e.latlng.lat + 0.05, e.latlng.lng + 0.05]);

                console.log(e.target);

                const tileSize = 256;
                const zoomLevel = 11;
                const x = Math.floor((e.latlng.lng + 180) / 360 * (1 << zoomLevel));
                const y = Math.floor((1 - Math.log(Math.tan(e.latlng.lat * Math.PI / 180) + 1 / Math.cos(e.latlng.lat * Math.PI / 180)) / Math.PI) / 2 * (1 << zoomLevel));

                console.log(zoomLevel, x, y);

                axios.get(`https://api.mapbox.com/v4/mapbox.satellite/${zoomLevel}/${x}/${y}@2x.jpg90?access_token=pk.eyJ1IjoibG1zOTgwMzIxIiwiYSI6ImNsN2s4eXRyODAzenQzcHQ1NXN5dWtsZzUifQ.m4tSGL_nEpUlWBngHXt7Xw`)
                    .then((res) => {
                        console.log("res : ",res)
                    })
                    .catch((error: any) => {
                        console.log("error : ", error)
                    })
            }
        })

        return <Rectangle bounds={new L.LatLngBounds(new L.LatLng(southWest[0], southWest[1]), new L.LatLng(northEast[0], northEast[1]))}/>;
    };

    return (
        <MapContainer center={[37,127]} zoom={11} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <MapEvents />
        </MapContainer>
    )
}

export default MapPopup;