import React from 'react';
import {Canvas} from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';


const Webgl = () => {
    return (
        <>
            <Canvas shadows dpr={[1,2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
                <spotLight position={[-4, 4, -4]} angle={0.06} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
                {/* <ambientLight intensity={0.1}/>
                <directionalLight color="red" position={[0, 0, 5]} /> */}
                
                {/* <mesh>
                    <boxGeometry args={[1,1,1]}/>
                    <meshStandardMaterial/>
                </mesh> */}
                <group>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
                        <planeGeometry args={[10,10,10,10]}/>
                        <shadowMaterial transparent opacity={0.15} />
                    </mesh>
                </group>
                <Environment preset="city"/>
                {/* <OrbitControls/> */}
            </Canvas>
        </>
    );
}

export default Webgl;