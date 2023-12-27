import React, {createContext, useCallback, useMemo, useReducer, useRef, useState} from 'react';

/** 코드 스플릿팅을 위한 라이브버리
 * loadable을 사용하면 알아서 스플릿팅하고 알아서 불러온다.
 */
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const Main = loadable(() => import('@layouts/Main'));
const Webgl = loadable(() => import('@pages/Webgl'));
const MapPopup = loadable(() => import('@components/MapPopup'))

export const ON_MAP_CLICK = 'ON_MAP_CLICK';

export const WebGLContext = createContext({
    dispatch: (state: any):any => {}
    // dispatch: (action: {type: string; payload/?: any}) => {},
});

// useReducer에 사용 될 초기 데이터
const initialState = {
    weatherData2: {},
}

const reducer = (state: any, action: any):any => {

    switch(action.type) {
        case ON_MAP_CLICK : {
            return null;
        }
    }
}

const App = () => {

    //지도 초기 위도/경도 설정
    const [latLng, setLatlng] = useState([]);

    const [imgUrl, setImgUrl] = useState<string>();
    const [weatherData, setWeatherData] = useState<{} | undefined>({});

    const [state, dispatch] = useReducer(reducer, initialState);
    const { weatherData2 } = state;

    const value = useMemo( () => ({
        weatherData2, dispatch
    }), [])

    const onMapClick = useCallback((imgData: string, weatherData?: {}) => {
        // textureRef.current = imgData;
        setImgUrl(imgData);
        setWeatherData(weatherData);
    }, [latLng])

    return (
        <>
            <Switch>
                <Redirect exact path="/" to="/solar" />
                {/* <Route path="/solar" component={Main} /> */}
            </Switch>

            {/* Context API */}
            <WebGLContext.Provider value={value}>
                <MapPopup onMapClick={onMapClick} latLng={[37,127]} />
                <Webgl imgUrl={imgUrl} weatherData={weatherData}/>
            </WebGLContext.Provider>
        </>


    )
}

export default App;