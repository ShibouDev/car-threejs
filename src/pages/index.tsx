
//@ts-nocheck
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls, PerspectiveCamera, CubeCamera, Environment } from "@react-three/drei"

import { Car } from "@/components/three-ui/car"
import { Ground } from "@/components/three-ui/ground"
import { Rings } from "@/components/three-ui/rings"
import { Boxes } from "@/components/three-ui/boxes"
import { FloatingGrid } from "@/components/three-ui/FloatingGrid"

import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
export default function Home() {
  const CarShow = () => {
    return (
      <>
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <color args={[0, 0, 0]} attach={"background"} />

        <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )}
        </CubeCamera>
        <Rings />
        <Boxes />
        <FloatingGrid />
        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={1.5 * 100}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={2 * 100}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <Ground />

        <EffectComposer>
          <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} />
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.3}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={1.5}
            luminanceSmoothing={0.025}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0012]}
          />
        </EffectComposer>
      </>
    )
  }
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  )
}
