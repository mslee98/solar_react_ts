import React, { VFC, Suspense, useState, useRef, useEffect, FC, MutableRefObject, useCallback, useTransition } from 'react';

/** --force 강제 설치 함 */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Cloud, Clouds, Environment, OrbitControls, Sky, useGLTF, useHelper, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import image from '@pages/Webgl/test_dem.jpeg';

interface WebglProps {
    imgUrl?: string;
    weatherData? : {}
}

const Webgl: FC<WebglProps> = ({imgUrl, weatherData}) => {
    
    //원래 초기값 이미지 데이터 불러와서 사용하려고 함
    const [textureLoaded, setTextureLoaded] = useState(false)
    const textureRef = useRef<THREE.Texture | undefined>();
    
    // textureRef.current = useLoader(THREE.TextureLoader,'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/worldColour.5400x2700.jpg')

    const textureLoader = new THREE.TextureLoader();

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
            <Canvas shadows dpr={[1,2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
                {/* <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} /> */}
                <ambientLight intensity={0.2} color={'white'} />
                <directionalLight color="gray" position={[5, 50, 5]} castShadow/>
                <SunLight />


                {/* <mesh position={[0,50,0]}>
                    <boxGeometry args={[20, 20, 20]} />
                    <meshPhongMaterial />
                </mesh> */}


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
                    <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                        <planeGeometry args={[1000,1000,50,50]} />
                        <meshPhongMaterial
                            color={'brown'}
                            wireframe={true}
                        />
                    </mesh>
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
                    <Cloud receiveShadow castShadow position={[-4, 15, 2]} speed={0.4} opacity={0.6} color={'#ffffff'}/>
                    <Cloud receiveShadow castShadow position={[-8, 15, 4]} speed={0.4} opacity={0.6} />
                    <Cloud receiveShadow castShadow position={[-12, 15, 2]} speed={0.4} opacity={0.6} />
                    <Cloud receiveShadow castShadow position={[-16, 15, -2]} speed={0.4} opacity={0.6} />
                    <Cloud receiveShadow castShadow position={[-20, 15, 6]} speed={0.4} opacity={0.6} />

                    {/* <Model/> */}
                    {/* 동기식 입력에 응답하는 동안 구성 요소가 중단되어 발생하는 오류임
                    React Suspense는 컴포넌트의 랜더링을 어떤 작업이 끝날 때까지 잠시 중단시키고 다른 컴포넌트를 먼저 랜더링할 수 있음 */}
                    {/* <Environment preset="forest" background blur={0.5}/> */}
                    
                 </Suspense>
                <OrbitControls/>
            </Canvas>
        </>
    );
}


const SunLight = () => {
    const [sunPosition, setSunPosition] = useState(new THREE.Vector3(0, 10, 0));

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
