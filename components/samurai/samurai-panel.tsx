"use client";

/**
 * SamuraiPanel — the hero's left pane: a framed dojo where the samurai
 * lives permanently. He cycles moods on a lazy loop; chips let visitors
 * force a mood (Swords / Football / Chess / DJ).
 *
 * All motion is procedural — no model or animation assets. Canvas is
 * transparent so the site's ambient background glows through.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Swords,
  Footprints,
  Crown,
  Disc3,
  type LucideIcon,
} from "lucide-react";
import { SamuraiFigure, type SamuraiRig } from "@/components/samurai/samurai-figure";

export type Mood = "standby" | "juggle" | "chess" | "dj";

const MOOD_ORDER: Mood[] = ["standby", "juggle", "chess", "dj"];
const MOOD_LABEL: Record<Mood, string> = {
  standby: "resting guard",
  juggle: "kick-ups · footwork drill",
  chess: "ruy lopez, again",
  dj: "lo-fi beats to threat-hunt to",
};

const OBI = "#5E6AD2";
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/* ---------------- checkerboard texture for the chess board ---------------- */
function useCheckerTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d");
    if (!g) return null;
    const s = 16;
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++) {
        g.fillStyle = (x + y) % 2 ? "#23232e" : "#3a3a48";
        g.fillRect(x * s, y * s, s, s);
      }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, []);
}

/* ---------------- the scene ---------------- */
function PanelScene({ mood }: { mood: Mood }) {
  const rig = useRef<SamuraiRig>(null);
  const ball = useRef<THREE.Mesh>(null!);
  const board = useRef<THREE.Group>(null!);
  const deck = useRef<THREE.Group>(null!);
  const pawn = useRef<THREE.Group>(null!);
  const discs = useRef<(THREE.Mesh | null)[]>([]);
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const checker = useCheckerTexture();

  useFrame((state, dt) => {
    const r = rig.current;
    if (!r) return;
    const t = state.clock.elapsedTime;

    // eyes: permanent low ember, breathing flicker
    const ember = 0.55 + Math.sin(t * 9) * 0.08;
    r.eyeMat.color.setRGB(ember, 0.05, 0.05);
    r.eyeGlowMat.opacity = 0.5 + Math.sin(t * 9) * 0.08;
    r.eyeLight.intensity = 1.4;

    // props visibility
    const isJuggle = mood === "juggle";
    const isChess = mood === "chess";
    const isDj = mood === "dj";
    if (ball.current) ball.current.visible = isJuggle;
    if (board.current) board.current.visible = isChess;
    if (deck.current) deck.current.visible = isDj;
    if (r.headphones) r.headphones.visible = isDj;

    // reset neutral pose each frame (each mood then layers on top)
    r.root.position.set(0, 0, 0);
    r.root.rotation.y = 0;
    r.torso.rotation.set(0, 0, Math.sin(t * 0.8) * 0.024);
    r.torso.scale.setScalar(1);
    r.head.rotation.set(0.06, Math.sin(t * 0.25) * 0.13, 0);
    r.rightArm.rotation.set(0, 0, 0);
    r.leftArm.rotation.set(0, 0, 0);
    r.rightLeg.rotation.set(0, 0, 0);
    r.leftLeg.rotation.set(0, 0, 0);

    switch (mood) {
      case "standby": {
        // hand rests near katana; occasional twitch
        const twitch = Math.max(0, Math.sin(t * 1.4)) ** 8;
        r.rightArm.rotation.x = -0.38 - twitch * 0.18;
        r.root.rotation.y = Math.sin(t * 0.16) * 0.1;
        r.head.rotation.x = 0.02;
        break;
      }
      case "juggle": {
        const cyc = t * 1.5;
        const ph = cyc % 1; // hang phase
        const foot = Math.floor(cyc) % 2 === 0 ? 1 : -1; // active foot side
        const y = 0.1 + Math.abs(Math.sin(ph * Math.PI)) * 0.85;
        const x = foot * 0.17 * (0.6 + 0.4 * Math.cos(ph * Math.PI * 2));
        ball.current.position.set(x, y, 0.32);
        ball.current.rotation.x += dt * 7;
        ball.current.rotation.z += dt * 3;
        // active knee lifts as ball dips low
        const lift = Math.max(0, Math.sin(ph * Math.PI + 2.2)) * 0.55;
        if (foot > 0) r.rightLeg.rotation.x = -lift;
        else r.leftLeg.rotation.x = -lift;
        r.torso.rotation.z = Math.sin(t * 0.8) * 0.024 + foot * -0.05 * lift;
        r.head.rotation.x = -0.3 * clamp01(y - 0.15) + 0.12;
        r.head.rotation.y = x * 0.5;
        r.rightArm.rotation.x = -0.25 + foot * lift * 0.35;
        break;
      }
      case "chess": {
        r.head.rotation.set(0.42 + Math.sin(t * 0.6) * 0.05, 0.06, 0.1);
        // pondering hand hovering over the board
        r.rightArm.rotation.x = -1.02 + Math.sin(t * 0.7) * 0.07;
        r.rightArm.rotation.z = Math.sin(t * 0.5) * 0.1;
        r.leftArm.rotation.x = -0.55;
        r.torso.rotation.x = 0.1;
        // a pawn commits every 6s: hop one square toward the enemy,
        // hold, then hop back on the next window
        if (pawn.current) {
          const win = t % 6;
          const p = clamp01(win / 0.7);
          const advanced = Math.floor(t / 6) % 2 === 1;
          const zFrom = advanced ? 0 : -0.125;
          const zTo = advanced ? -0.125 : 0;
          pawn.current.position.z = 0.72 + zFrom + (zTo - zFrom) * p;
          pawn.current.position.y = 0.79 + Math.sin(p * Math.PI) * 0.05;
        }
        break;
      }
      case "dj": {
        const beat = t * 5.4;
        r.torso.rotation.z = Math.sin(beat) * 0.045;
        r.torso.scale.setScalar(1 + Math.max(0, Math.sin(beat)) * 0.012);
        r.head.rotation.z = Math.sin(beat) * 0.07;
        r.head.rotation.y = Math.sin(beat / 2) * 0.14;
        // scratching hand + hand near earcup
        r.rightArm.rotation.x = -1.08 + Math.sin(t * 11) * 0.12;
        r.rightArm.rotation.z = Math.sin(t * 11) * 0.06;
        r.leftArm.rotation.x = -1.9;
        r.leftArm.rotation.z = 0.5;
        discs.current.forEach((d, i) => {
          if (d) d.rotation.y += dt * (i === 0 ? 7 : -5.5);
        });
        bars.current.forEach((b, i) => {
          if (b) b.scale.y = 0.25 + Math.abs(Math.sin(beat * 0.5 + i * 1.3)) * 0.75;
        });
        break;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 4, 3]} intensity={1.15} />
      <pointLight position={[-2.5, 2, 1.5]} intensity={9} distance={8} color={OBI} />
      <pointLight position={[0, 2.4, 2.4]} intensity={4} distance={6} color="#ffffff" />

      {/* dojo floor disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.02, 40]} />
        <meshStandardMaterial color="#0a0a10" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[1.42, 1.5, 40]} />
        <meshBasicMaterial color={OBI} transparent opacity={0.35} />
      </mesh>

      <SamuraiFigure ref={rig} eyesOn headphones />

      {/* football */}
      <mesh ref={ball} position={[0.2, 0.4, 0.32]} visible={false} castShadow>
        <sphereGeometry args={[0.11, 18, 18]} />
        <meshStandardMaterial color="#e9e9ef" roughness={0.5} />
      </mesh>

      {/* chess board + pieces */}
      <group ref={board} position={[0.04, 0, 0]} visible={false}>
        <mesh position={[0.05, 0.75, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial map={checker} roughness={0.6} />
        </mesh>
        <mesh position={[0.05, 0.74, 0.62]}>
          <boxGeometry args={[0.54, 0.02, 0.54]} />
          <meshStandardMaterial color="#16161f" roughness={0.6} />
        </mesh>
        {/* simplified pieces */}
        {[
          [-0.14, 0.47],
          [0.0, 0.47],
          [0.16, 0.47],
          [-0.07, 0.75],
          [0.1, 0.75],
        ].map(([x, z], i) => (
          <group key={i} position={[x + 0.05, 0.79, z - 0.02]}>
            <mesh>
              <cylinderGeometry args={[0.022, 0.03, 0.07, 8]} />
              <meshStandardMaterial
                color={i < 3 ? "#40435c" : "#a9adc4"}
                roughness={0.4}
              />
            </mesh>
          </group>
        ))}
        <group ref={pawn} position={[0.02, 0.79, 0.1 + 0.62]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.028, 0.06, 8]} />
            <meshStandardMaterial color="#a9adc4" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.045, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#a9adc4" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* dj deck */}
      <group ref={deck} position={[0.02, 0, 0]} visible={false}>
        <mesh position={[0.15, 0.84, 0.58]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.62, 0.045, 0.32]} />
          <meshStandardMaterial color="#14141d" roughness={0.45} metalness={0.3} />
        </mesh>
        {[0.02, 0.28].map((x, i) => (
          <group key={x} position={[x, 0.872, 0.56]}>
            <mesh
              ref={(m) => {
                discs.current[i] = m;
              }}
              rotation={[0.12, 0, 0]}
            >
              <cylinderGeometry args={[0.085, 0.085, 0.016, 24]} />
              <meshStandardMaterial
                color="#08080c"
                roughness={0.3}
                metalness={0.6}
                emissive={OBI}
                emissiveIntensity={0.12}
              />
            </mesh>
            <mesh position={[0, 0.014, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.01, 10]} />
              <meshStandardMaterial color="#c9cede" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}
        {/* EQ bars */}
        {[-0.05, 0.0, 0.05].map((dx, i) => (
          <mesh
            key={dx}
            ref={(m) => {
              bars.current[i] = m;
            }}
            position={[0.15 + dx, 0.89, 0.7]}
          >
            <boxGeometry args={[0.03, 0.06, 0.01]} />
            <meshStandardMaterial
              color={OBI}
              emissive={OBI}
              emissiveIntensity={0.9}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ---------------- the panel shell ---------------- */
const MOOD_ICONS: Record<Mood, LucideIcon> = {
  standby: Swords,
  juggle: Footprints,
  chess: Crown,
  dj: Disc3,
};

export default function SamuraiPanel() {
  const [mood, setMood] = useState<Mood>("standby");

  // lazy auto-cycle, resets whenever the visitor picks a mood
  useEffect(() => {
    const id = setInterval(() => {
      setMood((m) => MOOD_ORDER[(MOOD_ORDER.indexOf(m) + 1) % MOOD_ORDER.length]);
    }, 7000);
    return () => clearInterval(id);
  }, [mood]);

  return (
    <div className="card-top-glow group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(0,0,0,0.2)]">
      {/* dojo top bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="font-mono text-[10px] tracking-[0.28em] text-foreground-subtle">
          DOJO://LEFT-PANE
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-emerald-400/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          LIVE
        </span>
      </div>

      {/* 3D canvas */}
      <div className="relative h-[260px] sm:h-[340px] lg:h-[380px]" aria-hidden>
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 1.25, 3.1], fov: 42 }}
        >
          <PanelScene mood={mood} />
        </Canvas>
        {/* soft floor glow */}
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-16 bg-[radial-gradient(ellipse_at_bottom,rgba(94,106,210,0.16),transparent_70%)]" />
      </div>

      {/* mood controls */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-t border-white/[0.06] px-3 py-3">
        <p className="min-w-0 truncate pl-1 font-mono text-[10px] tracking-wider text-foreground-muted">
          <span className="text-accent-bright">▸</span> {MOOD_LABEL[mood]}
        </p>
        <div className="flex shrink-0 gap-1.5">
          {MOOD_ORDER.map((m) => {
            const Icon = MOOD_ICONS[m];
            const active = mood === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                aria-pressed={active}
                aria-label={`Samurai mood: ${m}`}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 active:scale-[0.94] ${
                  active
                    ? "border-accent/50 bg-accent/20 text-white shadow-[0_0_16px_rgba(94,106,210,0.35)]"
                    : "border-white/[0.08] bg-white/[0.03] text-foreground-muted hover:border-white/[0.16] hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}