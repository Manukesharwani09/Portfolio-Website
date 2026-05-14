import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";
import SectionHeader from "./SectionHeader";

const textureLoader = new THREE.TextureLoader();

const createTextTexture = (text: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#121010"; // Terminal black
    ctx.fillRect(0, 0, 512, 512);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#4ade80"; // Terminal green
    ctx.strokeRect(0, 0, 512, 512);
    ctx.font = "bold 60px monospace";
    ctx.fillStyle = "#4ade80";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (text.includes(" ")) {
      const parts = text.split(" ");
      ctx.fillText(parts[0], 256, 210);
      ctx.fillText(parts.slice(1).join(" "), 256, 300);
    } else {
      ctx.fillText(text, 256, 256);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const skillData = [
  { name: "React.js", image: "/images/react2.webp" },
  { name: "Next.js", image: "/images/next2.webp" },
  { name: "Node.js", image: "/images/node2.webp" },
  { name: "Express", image: "/images/express.webp" },
  { name: "MongoDB", image: "/images/mongo.webp" },
  { name: "MySQL", image: "/images/mysql.webp" },
  { name: "TypeScript", image: "/images/typescript.webp" },
  { name: "JavaScript", image: "/images/javascript.webp" },
  { name: "C++", image: "/images/cpp.png" },
  { name: "Python", image: "/images/python.png" },
  { name: "HTML", image: "/images/html.png" },
  { name: "CSS", image: "/images/css.png" },
  { name: "Tailwind CSS", image: "/images/tailwind.png" },
  { name: "Redis", image: "/images/redis.png" },
  { name: "AWS", image: "/images/aws.png" },
  { name: "Git", image: "/images/git.png" },
  { name: "GitHub", image: "/images/github.png" },
  { name: "VS Code", image: "/images/vscode.png" },
  { name: "SQL", image: "/images/sql.png" },
  { name: "REST APIs", image: "/images/api.png" },
];

const textures = skillData.map((skill) => {
  if (skill.image) {
    return textureLoader.load(skill.image);
  }
  return createTextTexture(skill.name);
});

const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

const spheres = textures.map(() => ({
  scale: [0.7, 0.8, 0.9, 1, 1][Math.floor(Math.random() * 5)],
}));

type BlockProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function BlockGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: BlockProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const translation = api.current.translation();
    if (!translation) return;
    const impulse = vec
      .copy(translation)
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.75 * scale, 0.75 * scale, 0.75 * scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={boxGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const Skills = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        const threshold = skillsSection.getBoundingClientRect().top;
        // Adjusted threshold logic to be active when in view
        setIsActive(threshold < window.innerHeight && threshold > -skillsSection.clientHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <section className="py-20" id="skills">
      <SectionHeader title="skills --interactive" />
      
      <div className="w-full h-[600px] mt-8 rounded-lg overflow-hidden border border-terminal-green/30 relative bg-black/50 backdrop-blur-sm">
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="w-full h-full cursor-crosshair"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <BlockGeo
                key={i}
                {...props}
                material={materials[i]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
        
        {/* Helper text overlay */}
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-50 text-sm">
          [ move mouse to interact with stack ]
        </div>
      </div>
    </section>
  );
};

export default Skills;