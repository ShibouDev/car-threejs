import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Mesh } from "three"

export const Car = () => {
    const gltf = useLoader(GLTFLoader, "/models/car/scene.gltf")
    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005)
        gltf.scene.position.set(0, -0.035, 0)
        gltf.scene.traverse((object: Object) => {
            if (object instanceof Mesh) {
                object.castShadow = true
                object.receiveShadow = true
                object.material.envMapIntensity = 20
            }
        })
    }, [gltf])
    return <primitive object={gltf.scene} />
}