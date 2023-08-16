//@ts-nocheck
import { useRef, useState, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Vector3, TextureLoader, RepeatWrapping, LinearSRGBColorSpace } from "three"
import { MeshReflectorMaterial } from "@react-three/drei";

export const Box = ({ color }: { color: any }) => {
    const box = useRef<any>()
    const time = useRef(0)
    const [xRotSpeed] = useState<number>(() => Math.random())
    const [yRotSpeed] = useState<number>(() => Math.random())
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05)
    const getInitialPosition = () => {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15)
        if (v.x < 0) v.x -= 1.75
        if (v.x > 0) v.x += 1.75

        // setPosition(v)
        return v
    }

    const resetPosition = () => {
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10)
        if (v.x < 0) v.x -= 1.75
        if (v.x > 0) v.x += 1.75

        setPosition(v)
        // return v
    }
    const [roughness, normal] = useLoader(TextureLoader, [
        "/textures/terrain-roughness.jpg",
        "/textures/terrain-normal.jpg",
    ]);
    useEffect(() => {
        [normal, roughness].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
            t.offset.set(0, 0);
        });

        normal.encoding = LinearSRGBColorSpace;
    }, [normal, roughness]);
    const [position, setPosition] = useState<{ x: number, y: number, z: number }>(getInitialPosition())

    useFrame((state, delta) => {
        time.current += delta * 1.2
        let newZ = position.z - (time.current)

        if (newZ < -10) {
            resetPosition()
            time.current = 0
        }
        box.current.position.set(position.x, position.y, newZ)
        box.current.rotation.x += delta * xRotSpeed
        box.current.rotation.y += delta * yRotSpeed
    }, [xRotSpeed, yRotSpeed, position])
    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <MeshReflectorMaterial
                color={color}
                envMapIntensity={0.15}
                normalMap={normal}
                normalScale={[0.15, 0.15]}
                roughnessMap={roughness} />
        </mesh>
    )
}

export const Boxes = () => {
    return (
        [...Array(100)].map((e, i) => <Box key={i} color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />)
    )
}