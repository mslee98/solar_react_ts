import React, { VFC, Suspense, useState, useRef, useEffect, FC, MutableRefObject, useCallback, useTransition, useContext } from 'react';

/** --force 강제 설치 함 */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Cloud, Clouds, Environment, OrbitControls, Sky, useGLTF, useHelper, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { WebGLContext } from '@layouts/App';
// import image from '@pages/Webgl/test_dem.jpeg';

// interface WebglProps {
//     imgUrl?: string;
//     weatherData? : {}
// }

const Webgl: VFC = () => {
    const { imgUrl, dispatch, weatherData} = useContext(WebGLContext);

    //원래 초기값 이미지 데이터 불러와서 사용하려고 함
    const [textureLoaded, setTextureLoaded] = useState(false)
    const textureRef = useRef<THREE.Texture | undefined>();
    
    const textureLoader = new THREE.TextureLoader();
    
    // const [weather, setWeather] = useState('');
    let weather, clouds;

    console.log("@@@",weatherData)

    let [cloudsCnt, setCloudsCnt] = useState(10);

    // if (Object.keys(weatherData).length > 0) {
    //     /**
    //      * clear shy - 맑은 하늘
    //      * few clouds - 구름의 거의 없음
    //      * scattered clouds - 흩어져있는 구름
    //      * broken clouds - 부서진 구름
    //      * shower rain - 샤워 비
    //      * rain -비
    //      * thunderstorm - 뇌우
    //      * snow - 눈
    //      * mist - 안개
    //     */

    //     //이거 왜 state로 관리하려니깐.. loop Error가 나는데 다시 살펴봐야 하긴할듯
    //     setCloudsCnt(weatherData.clouds.all);
    //     console.log(cloudsCnt)
    //     weather = (weatherData.weather[0]['description']);
    // }


    if(imgUrl) {
        textureLoader.load(imgUrl,(texture) => {
            textureRef.current = texture;
            setTextureLoaded(true)
        })
    } else {
        textureLoader.load('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/worldColour.5400x2700.jpg',(texture) => {
            textureRef.current = texture;
            setTextureLoaded(true)
        })
    }


    // const sunRef = useRef<THREE.Vector3 | undefined>();

    // useFrame(({clock}) => {
    //     const elapsedTime = clock.getElapsedTime();
    //     const radius = 10;
    //     const angle = elapsedTime * 0.2;

    //     const x = Math.cos(angle) * radius;
    //     const y = Math.sin(angle) * radius;
    //     const z= 5

    //     sunRef.current = new THREE.Vector3(x, y, z);
    // })

    return (
        <>  

            {
                Object.keys(weatherData).length > 0 ?
                <div style={{
                    width: '300px',
                    height: '350px',
                    zIndex: 15,
                    background: 'lightgray',
                    position: 'absolute',
                    left: '0px',
                }}>
                    <ul style={{listStyleType: 'none'}}>
                        <li>base: {weatherData.base}</li>
                        <li>clouds: {weatherData.clouds.all}</li>
                        <li>coord: {weatherData.coord.lat} / {weatherData.coord.lon}</li>
                        <li>feels_like: {weatherData.main.feels_like}</li>
                        <li>humidity: {weatherData.main.humidity}</li>
                        <li>pressure: {weatherData.main.pressure}</li>
                        <li>temp: {weatherData.main.temp}</li>
                        <li>temp_max: {weatherData.main.temp_max}</li>
                        <li>temp_min: {weatherData.main.temp_min}</li>
                        <li>name: {weatherData.name}</li>
                        <li>main/description: {weatherData.weather[0]['main']} / {weatherData.weather[0]['description']}</li>
                        {/* {weatherData.weather.map(({id, main, descroption, icon}) => {
                            return (
                                <li>날씨/설명:{main} / {descroption}</li>
                            )
                        })} */}
                        <li>visibility: {weatherData.visibility}</li>
                        <li>wind(속도/각): {weatherData.wind.speed} / {weatherData.wind.deg}</li>
                    </ul>
                </div>
                : null
            }
            <Canvas shadows dpr={[1,2]} camera={{ position: [-1, 1.5, 2], fov: 25, far: 2500 }}>
                {/* <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} /> */}
                <ambientLight intensity={0.2} color={'white'} />
                <directionalLight color="gray" position={[5, 50, 5]} castShadow/>
                <SunLight />

                <line>

                </line>

                {/* 클릭 이벤트에 따른 지형 선택 */}
                {   textureLoaded &&
                    <>
                    <mesh rotation={[-Math.PI/2, 0, 0]} castShadow receiveShadow>
                        <planeGeometry args={[512,512,512,512]} />
                        <meshPhongMaterial
                            // color={'#000000'}
                            // map = {textureRef.current}
                            wireframe={true}
                            displacementMap={textureRef.current}
                            displacementBias={-0.1}
                            displacementScale={3}
                        />
                    </mesh>
                    <mesh rotation={[-Math.PI/2, 0, 0]} castShadow receiveShadow>
                        <planeGeometry args={[512,512,512,512]} />
                        <meshPhongMaterial
                            color={'brown'}
                            displacementMap={textureRef.current}
                            displacementBias={-0.1}
                            displacementScale={3}
                        />
                    </mesh>
                    {/* <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                        <planeGeometry args={[512,512,50,50]} />
                        <meshPhongMaterial
                            color={'brown'}
                            wireframe={true}
                        />
                    </mesh> */}
                    </>
                }

                 {/* <Sky 
                    sunPosition={sunRef.current} 
                    turbidity={10}
                    rayleigh={1}
                    mieCoefficient={0.5}
                    mieDirectionalG={1}
                /> */}
                 <Suspense fallback="..loading">
                    <CloudsComponent weather={weather} clouds={cloudsCnt}/>

                    {/* <Cloud receiveShadow castShadow position={[-4, 15, 2]} speed={0.4} opacity={0.6} color={'#ffffff'}/>
                    <Cloud receiveShadow castShadow position={[-8, 15, 4]} speed={0.4} opacity={0.6} />
                    <Cloud receiveShadow castShadow position={[-12, 15, 2]} speed={0.4} opacity={0.6} />
                    <Cloud receiveShadow castShadow position={[-16, 15, -2]} speed={0.4} opacity={0.6} />
                    <Cloud receiveShadow castShadow position={[-20, 15, 6]} speed={0.4} opacity={0.6} /> */}

                    {/* <Model/> */}
                    {/* 동기식 입력에 응답하는 동안 구성 요소가 중단되어 발생하는 오류임
                    React Suspense는 컴포넌트의 랜더링을 어떤 작업이 끝날 때까지 잠시 중단시키고 다른 컴포넌트를 먼저 랜더링할 수 있음 */}
                    {/* <Environment preset="forest" background blur={0.5}/> */}
                    
                 </Suspense>
                 <fog attach={"fog"} args={["#da6953", 0, 500]} />
                <OrbitControls/>
            </Canvas>
        </>
    );
}

const SunLight = () => {
    const [sunPosition, setSunPosition] = useState(new THREE.Vector3(0, 125, 0));
    // useFrame(({clock}) => {
    //     const elapsedTime = clock.getElapsedTime();
    //     const radius = 500; // 원의 반지름
    //     const angle = elapsedTime * 2; //속도 조절

    //     const x = Math.cos(angle) * radius;
    //     const y = Math.sin(angle) * radius;
    //     const z= 5 //z축 위치
    //     console.log(x,y,z)
    //     setSunPosition(new THREE.Vector3(x, y, z));
    // })

    return (
        <>
            <directionalLight
                castShadow
                color={'white'}
                position={sunPosition}
                intensity={1}
            />
            <mesh position={sunPosition}>
                <sphereGeometry args={[10,10,10]} />
                <meshPhongMaterial color={'black'} />
            </mesh>
        </>
    )
}

interface CloudsProps {
    weather?: string,
    clouds?: number,
}

const CloudsComponent: FC<CloudsProps> = ({weather, clouds}) => {

    let [cloudsCnt, setCloudsCnt] = useState(clouds? new Array(clouds).fill(0) : new Array(Math.floor(Math.random() * 10) + 10).fill(0));
    // let [cloudsCnt, setCloudsCnt] = useState(clouds? clouds : Math.floor(Math.random() * 10) + 10);
    console.log(cloudsCnt)

    //타일 크기는 -256 ~ 256까지
    return (
        <>
            {cloudsCnt.map((v) => {
                <Cloud receiveShadow castShadow position={[Math.floor((Math.random() * 250)- 250), 40, Math.floor((Math.random() * 250)- 250)]} speed={0.4} opacity={0.1} />
            })}
        </>
    )

}

export default Webgl;

function Model({...props}) {

    const {scene} =  useGLTF('/public/models/bipv1.glb');
    console.log(scene);
    // if(!scene) {
    //     return null;
    // }

    return (
        <primitive object={scene} children-0-castShadow />
    )
}
