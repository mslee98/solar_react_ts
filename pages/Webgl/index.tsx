import React, { VFC, Suspense, useState, useRef, useEffect } from 'react';

/** --force 강제 설치 함 */
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
// import image from '@pages/Webgl/test_dem.jpeg';

const Webgl = () => {
    const [textureLoaded, setTextureLoaded] = useState(false)
    const textureRef = useRef<THREE.Texture | undefined>();

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        // textureLoader.load('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/worldColour.5400x2700.jpg', (texture) => {
        //     textureRef.current = texture;
        //     setTextureLoaded(true)
        //     console.log(textureRef.current)
        // });

        textureLoader.load('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/worldColour.5400x2700.jpg', (texture) => {
            textureRef.current = texture;
            setTextureLoaded(true)
            console.log(textureRef.current)
        });
    })
    // const demMap = useLoader(TextureLoader, 'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@displacementMap/public/img/worldColour.5400x2700.jpg')

    return (
        <>  
            <Canvas shadows dpr={[1,2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
                <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
                <ambientLight intensity={0.2} color={'#ffffff'}/>
                <directionalLight color="red" position={[0, 5, 5]} />
                
                <mesh>
                    <boxGeometry args={[1,1,1]}/>
                    <meshStandardMaterial/>
                </mesh>
                {/* <Sky sunPosition={[500,150,-1000]} turbidity={0.1}/> */}


                {textureLoaded && textureRef.current &&
                    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI/2, 0, 0]}>
                        <planeGeometry args={[100, 100, 100, 100]} />
                        <meshStandardMaterial displacementMap={textureRef.current} side={THREE.DoubleSide} wireframe={true} />
                    </mesh>
                 }
                <OrbitControls/>
            </Canvas>
        </>
    );
}

export default Webgl;