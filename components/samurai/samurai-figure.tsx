"use client";

/**
 * SamuraiFigure — a procedurally-modeled low-poly samurai (no external
 * 3D assets). Built from primitives so it renders anywhere, weighs
 * ~0 KB of model data, and matches the site's palette: near-black
 * lacquer armor, straw kasa, indigo obi — and red eyes when provoked.
 *
 * The rig (root/torso/head/arms/legs/eyes) is exposed via ref so the
 * intro cinematic and the hero panel can choreograph it per-frame.
 */
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

export interface SamuraiRig {
  root: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  hat: THREE.Group;
  rightArm: THREE.Group;
  leftArm: THREE.Group;
  rightLeg: THREE.Group;
  leftLeg: THREE.Group;
  eyeMat: THREE.MeshBasicMaterial;
  eyeGlowMat: THREE.SpriteMaterial;
  eyeLight: THREE.PointLight;
  headphones: THREE.Group;
}

const LACQUER = "#241f2e";
const LACQUER_DARK = "#191521";
const HAKAMA = "#1b2030";
const KASA = "#3d352a";
const FACE = "#0c0a08";
const OBI = "#5E6AD2";

export const SamuraiFigure = forwardRef<
  SamuraiRig,
  { eyesOn?: boolean; headphones?: boolean }
>(function SamuraiFigure({ eyesOn = false, headphones = false }, ref) {
  const root = useRef<THREE.Group>(null!);
  const torso = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Group>(null!);
  const hat = useRef<THREE.Group>(null!);
  const rightArm = useRef<THREE.Group>(null!);
  const leftArm = useRef<THREE.Group>(null!);
  const rightLeg = useRef<THREE.Group>(null!);
  const leftLeg = useRef<THREE.Group>(null!);
  const eyeLight = useRef<THREE.PointLight>(null!);
  const phones = useRef<THREE.Group>(null!);

  /** Soft radial sprite texture for eye glow (client-only, memoized). */
  const glowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    if (!g) return null;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,42,42,0.95)");
    grad.addColorStop(0.35, "rgba(255,42,42,0.35)");
    grad.addColorStop(1, "rgba(255,42,42,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  const eyeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#2a0505"),
        toneMapped: false,
      }),
    []
  );

  const eyeGlowMat = useMemo(
    () =>
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: new THREE.Color("#ff2a2a"),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [glowTexture]
  );

  useImperativeHandle(
    ref,
    () => ({
      root: root.current,
      torso: torso.current,
      head: head.current,
      hat: hat.current,
      rightArm: rightArm.current,
      leftArm: leftArm.current,
      rightLeg: rightLeg.current,
      leftLeg: leftLeg.current,
      eyeMat,
      eyeGlowMat,
      eyeLight: eyeLight.current,
      headphones: phones.current,
    }),
    [eyeMat, eyeGlowMat]
  );

  return (
    <group ref={root}>
      {/* ---------------- legs / hakama ---------------- */}
      <group ref={leftLeg} position={[-0.13, 0.56, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <cylinderGeometry args={[0.085, 0.1, 0.56, 10]} />
          <meshStandardMaterial color={HAKAMA} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.54, 0.04]}>
          <boxGeometry args={[0.11, 0.05, 0.2]} />
          <meshStandardMaterial color={LACQUER_DARK} roughness={0.6} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.13, 0.56, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <cylinderGeometry args={[0.085, 0.1, 0.56, 10]} />
          <meshStandardMaterial color={HAKAMA} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.54, 0.04]}>
          <boxGeometry args={[0.11, 0.05, 0.2]} />
          <meshStandardMaterial color={LACQUER_DARK} roughness={0.6} />
        </mesh>
      </group>

      {/* kusazuri skirt plates */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.sin(a) * 0.2, 0.78, Math.cos(a) * 0.2]}
            rotation={[0.35 * Math.cos(a), a, -0.35 * Math.sin(a)]}
          >
            <boxGeometry args={[0.16, 0.24, 0.02]} />
            <meshStandardMaterial color={LACQUER_DARK} roughness={0.65} />
          </mesh>
        );
      })}

      {/* ---------------- torso / do armor ---------------- */}
      <group ref={torso} position={[0, 1.06, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.56, 0.3]} />
          <meshStandardMaterial color={LACQUER} roughness={0.5} metalness={0.25} />
        </mesh>
        {/* cuirass ridge lines */}
        {[-0.12, 0, 0.12].map((x) => (
          <mesh key={x} position={[x, 0.02, 0.152]}>
            <boxGeometry args={[0.02, 0.48, 0.006]} />
            <meshStandardMaterial color={LACQUER_DARK} roughness={0.6} />
          </mesh>
        ))}
        {/* indigo obi */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.52, 0.09, 0.32]} />
          <meshStandardMaterial
            color={OBI}
            roughness={0.4}
            emissive={OBI}
            emissiveIntensity={0.14}
          />
        </mesh>
        {/* katana at hip */}
        <group position={[-0.3, -0.16, -0.02]} rotation={[0.12, 0, 1.25]}>
          <mesh>
            <boxGeometry args={[0.05, 0.72, 0.05]} />
            <meshStandardMaterial color="#101014" roughness={0.35} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[0.06, 0.14, 0.06]} />
            <meshStandardMaterial color="#2e2540" roughness={0.55} />
          </mesh>
        </group>

        {/* sode shoulder plates */}
        <mesh position={[-0.36, 0.22, 0]} rotation={[0, 0, 0.22]} castShadow>
          <boxGeometry args={[0.24, 0.15, 0.3]} />
          <meshStandardMaterial color={LACQUER_DARK} roughness={0.6} />
        </mesh>
        <mesh position={[0.36, 0.22, 0]} rotation={[0, 0, -0.22]} castShadow>
          <boxGeometry args={[0.24, 0.15, 0.3]} />
          <meshStandardMaterial color={LACQUER_DARK} roughness={0.6} />
        </mesh>

        {/* ---------------- arms ---------------- */}
        <group ref={leftArm} position={[-0.34, 0.18, 0]}>
          <mesh position={[-0.05, -0.2, 0]} rotation={[0, 0, 0.24]} castShadow>
            <cylinderGeometry args={[0.055, 0.05, 0.4, 8]} />
            <meshStandardMaterial color={LACQUER} roughness={0.55} />
          </mesh>
          <mesh position={[-0.14, -0.44, 0.02]}>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshStandardMaterial color={FACE} roughness={0.7} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.34, 0.18, 0]}>
          <mesh position={[0.05, -0.2, 0]} rotation={[0, 0, -0.24]} castShadow>
            <cylinderGeometry args={[0.055, 0.05, 0.4, 8]} />
            <meshStandardMaterial color={LACQUER} roughness={0.55} />
          </mesh>
          <mesh position={[0.14, -0.44, 0.02]}>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshStandardMaterial color={FACE} roughness={0.7} />
          </mesh>
        </group>

        {/* ---------------- head / kasa / eyes ---------------- */}
        <group ref={head} position={[0, 0.48, 0]}>
          <mesh position={[0, 0.02, 0.01]} castShadow>
            <sphereGeometry args={[0.185, 20, 20]} />
            <meshStandardMaterial color={FACE} roughness={0.8} />
          </mesh>

          {/* eyes (small emissive spheres + additive glow sprites) */}
          {[-0.068, 0.068].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.035, 0.16]} material={eyeMat}>
                <sphereGeometry args={[0.026, 10, 10]} />
              </mesh>
              <sprite position={[x, 0.035, 0.17]} scale={[0.34, 0.34, 1]} material={eyeGlowMat} />
            </group>
          ))}
          <pointLight
            ref={eyeLight}
            position={[0, 0.05, 0.4]}
            color="#ff2a2a"
            intensity={0}
            distance={2.6}
            decay={2}
          />

          {/* kasa — conical straw hat */}
          <group ref={hat} position={[0, 0.17, -0.01]} rotation={[0.06, 0, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.37, 0.2, 24]} />
              <meshStandardMaterial color={KASA} roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.085, 0]}>
              <cylinderGeometry args={[0.41, 0.41, 0.012, 24]} />
              <meshStandardMaterial color="#2c261d" roughness={0.9} />
            </mesh>
          </group>

          {/* headphones — dj mood */}
          <group ref={phones} position={[0, 0.06, 0]} visible={headphones}>
            <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>