import React, { FC, useCallback, useContext, useRef, useState } from 'react';
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
import THREE from 'three';
import { ON_MAP_CLICK, WebGLContext} from '@layouts/App'

const OpenWeatherAPIKey = 'f28106d4f3b17bba32b71b3e8bde723c';

interface MapPopupProps {
    latLng: [number, number];
    onMapClick: (imgUrl: string, weatherData?: {}) => void;
}

const MapPopup: FC<MapPopupProps> = ({onMapClick, latLng}) => {

    const center = latLng;

    const [southWest, setSouthWest] = useState([center[0]-0.05, center[1]-0.05]);
    const [northEast, setNorthEast] = useState([center[0]+0.05, center[1]+0.05]);

    const { dispatch } = useContext(WebGLContext);
    console.log("@@@@@@@@@@@@@@@@@@@",dispatch)

    /**
     * 지도 이벤트
     * 
     */
    const MapEvents = () => {
        const map = useMapEvents({
            click(e) {

                // 지도 클릭 시 Rectangle 영역 설정(임의임)
                setSouthWest([e.latlng.lat - 0.05, e.latlng.lng - 0.05]);
                setNorthEast([e.latlng.lat + 0.05, e.latlng.lng + 0.05]);

                latLng = [e.latlng.lat, e.latlng.lng]

                const tileSize = 256; //응답 데이터 타일 사이즈 512*512임

                const zoomLevel = 11;
                const x = Math.floor((e.latlng.lng + 180) / 360 * (1 << zoomLevel));
                const y = Math.floor((1 - Math.log(Math.tan(e.latlng.lat * Math.PI / 180) + 1 / Math.cos(e.latlng.lat * Math.PI / 180)) / Math.PI) / 2 * (1 << zoomLevel));

                console.log("Request Image coordinates : ",zoomLevel, x, y);

                const imgUrl =  `https://api.mapbox.com/v4/mapbox.satellite/${zoomLevel}/${x}/${y}@2x.jpg90?access_token=pk.eyJ1IjoibG1zOTgwMzIxIiwiYSI6ImNsN2s4eXRyODAzenQzcHQ1NXN5dWtsZzUifQ.m4tSGL_nEpUlWBngHXt7Xw`;
                
                
                /**
                 * OpenWeatherAPI 
                 */
                let weatherData;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${OpenWeatherAPIKey}`)
                    .then((res) => {
                        console.log(res.data)
                        weatherData = res.data;
                    })
                
                console.log("dispatch before............................................")
                dispatch({type: ON_MAP_CLICK})
                console.log("dispatch after............................................")
                
                onMapClick(imgUrl, weatherData);
            }
        })

        return <Rectangle bounds={new L.LatLngBounds(new L.LatLng(southWest[0], southWest[1]), new L.LatLng(northEast[0], northEast[1]))}/>;
    };

    return (
        <>
            {/* <canvas ref={canvasRef} width={"800px"} height={"800px"} style={{zIndex:15}}/> */}
        <MapContainer center={[37,127]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <MapEvents />
        </MapContainer>
        </>
    )
}

export default MapPopup;