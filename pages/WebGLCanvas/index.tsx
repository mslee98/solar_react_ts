import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';



const WebGLCanvas = () => {


    return (
        <>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />

                <mesh>
                    <boxGeometry args={[1,1,1]}/>
                    <meshPhongMaterial color={'orange'}/>
                </mesh>
                <OrbitControls/>
            </Canvas>
        </>
    )
}

export default WebGLCanvas;