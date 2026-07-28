"use client";

/**
 * SamuraiIntro — the post-boot cinematic.
 *
 * The samurai stands deep in the fog → eyes ignite red → he flash-closes
 * the distance → knocks the viewer's screen twice → hurls three blades
 * that stick into the "glass" → then the résumé auto-downloads (once per
 * browser, via localStorage) and the overlay fades into the site.
 *
 * Fully skippable (click / Esc / button), muted-safe synthesized SFX,
 * and never rendered when prefers-reduced-motion is set (SiteShell
 * skips it entirely).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { SamuraiFigure, type SamuraiRig } from "@/components/samurai/samurai-figure";
import { playIgnite, playKnock, playWhoosh, playClink } from "@/lib/sfx";
import { withBase } from "@/lib/public-asset";
import { site } from "@/lib/content";

type Phase = "far" | "eyes" | "charge" | "knock" | "throw" | "outro";

const CAM_Z = 4.6;
const START_Z = -30;
const END_Z = -2.6;
const RESUME_FLAG = "sv-resume-offered";

/** Screen-space crack positions matching the blades' world targets. */
const CRACKS = [
  { left: "17%", top: "30%", rotate: -14 },
  { left: "73%", top: "56%", rotate: 22 },
  { left: "43%", top: "76%", rotate: 8 },
];
const BLADE_TARGETS = [
  new THREE.Vector3(-1.45, 2.25, CAM_Z - 1.15),
  new THREE.Vector3(1.35, 1.15, CAM_Z - 1.15),
  new THREE.Vector3(-0.35, 0.45, CAM_Z - 1.15),
];

const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/* ------------------------------------------------------------------ */
/*  Kunai                                                               */
/* ------------------------------------------------------------------ */
function Kunai({ innerRef }: { innerRef: (g: THREE.Group | null) => void }) {
  return (
    <group ref={innerRef} visible={false}>
      {/* blade points toward the viewer (+z) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.16]}>
        <coneGeometry args={[0.05, 0.34, 4]} />
        <meshStandardMaterial color="#c9cede" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <torusGeometry args={[0.045, 0.012, 8, 16]} />
        <meshStandardMaterial color="#54586e" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
        <cylinderGeometry args={[0.022, 0.022, 0.18, 8]} />
        <meshStandardMaterial color="#26222e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, -0.26]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.05, 0.012, 8, 16]} />
        <meshStandardMaterial color="#54586e" metalness={0.8} roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  The 3D scene — phase state machine running in useFrame              */
/* ------------------------------------------------------------------ */
function CinematicScene({ phaseRef }: { phaseRef: React.MutableRefObject<Phase> }) {
  const rig = useRef<SamuraiRig>(null);
  const { camera } = useThree();
  const local = useRef({ phase: "far" as Phase, start: 0 });
  const shake = useRef(0);

  // Speed streaks — tunnel lines during the charge
  const streakMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#8f9bff"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );
  const streaks = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2 + Math.random() * 0.4,
      radius: 1.6 + Math.random() * 2.6,
      z: -26 + Math.random() * 20,
      len: 2.5 + Math.random() * 4,
    }));
  }, []);
  const streakRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Blades
  const bladeRefs = useRef<(THREE.Group | null)[]>([]);
  const bladeAnim = useRef(
    BLADE_TARGETS.map(() => ({ t: 0, flying: false, stuck: false, tilt: (Math.random() - 0.5) * 0.7 }))
  );

  useFrame((state, dt) => {
    const now = state.clock.elapsedTime;
    const l = local.current;
    if (phaseRef.current !== l.phase) {
      l.phase = phaseRef.current;
      l.start = now;
    }
    const e = now - l.start;
    const r = rig.current;
    if (!r) return;

    const cam = camera as THREE.PerspectiveCamera;

    // decay shake
    shake.current = Math.max(0, shake.current - dt * 2.4);
    const s = shake.current;
    camera.position.set(
      (Math.random() - 0.5) * 0.09 * s,
      1.3 + (Math.random() - 0.5) * 0.09 * s,
      CAM_Z
    );

    // defaults across phases
    streakMat.opacity = Math.max(0, streakMat.opacity - dt * 2.5);

    switch (l.phase) {
      case "far": {
        r.root.position.set(0, 0, START_Z);
        r.torso.rotation.z = Math.sin(now * 0.7) * 0.028;
        r.head.rotation.y = Math.sin(now * 0.22) * 0.14;
        r.head.rotation.x = 0.14;
        r.eyeLight.intensity = 0;
        r.eyeGlowMat.opacity = 0;
        cam.fov = 50;
        cam.updateProjectionMatrix();
        break;
      }
      case "eyes": {
        const k = clamp01(e / 0.55);
        const flicker = k * (0.82 + Math.sin(now * 43) * 0.18 * k);
        r.eyeMat.color.lerpColors(
          new THREE.Color("#2a0505"),
          new THREE.Color("#ff2a2a"),
          k
        );
        r.eyeGlowMat.opacity = flicker * 0.9;
        r.eyeLight.intensity = flicker * 3.2;
        r.head.rotation.x = 0.14 - k * 0.18;
        r.head.rotation.y *= 1 - dt * 4;
        break;
      }
      case "charge": {
        const p = easeOutExpo(clamp01(e / 0.62));
        r.root.position.z = START_Z + (END_Z - START_Z) * p;
        cam.fov = 50 + Math.sin(p * Math.PI) * 13;
        cam.updateProjectionMatrix();
        streakMat.opacity = Math.sin(p * Math.PI) * 0.5;
        shake.current = Math.max(shake.current, Math.sin(p * Math.PI) * 0.45);
        r.head.rotation.x = -0.02;
        break;
      }
      case "knock": {
        r.root.position.z = END_Z;
        cam.fov += (50 - cam.fov) * dt * 4;
        cam.updateProjectionMatrix();
        // two knock cycles, each ~0.8s
        const cycle = Math.floor(e / 0.8);
        const ce = (e % 0.8) / 0.8;
        // arm raises fast, slams forward
        const raise = ce < 0.35 ? ce / 0.35 : ce < 0.5 ? 1 : 1 - (ce - 0.5) * 0.4;
        r.rightArm.rotation.x = -1.5 * easeInOut(clamp01(raise));
        if (ce > 0.48 && ce < 0.52 && cycle < 3) {
          shake.current = 1;
        }
        r.torso.rotation.x = 0.06 * Math.sin(e * 3);
        break;
      }
      case "throw": {
        r.rightArm.rotation.x = -0.9 + Math.sin(now * 2) * 0.06;
        bladeAnim.current.forEach((b, i) => {
          const g = bladeRefs.current[i];
          if (!g) return;
          const delay = i * 0.3;
          if (e > delay && !b.stuck) {
            g.visible = true;
            b.t = clamp01((e - delay) / 0.42);
            const p = b.t;
            const from = new THREE.Vector3(0.42, 1.28, END_Z + 0.2);
            const to = BLADE_TARGETS[i];
            g.position.lerpVectors(from, to, p);
            g.position.y += Math.sin(p * Math.PI) * 0.5; // slight arc
            g.rotation.x += dt * 22;
            g.rotation.z = b.tilt;
            if (p >= 1) {
              b.stuck = true;
              g.position.copy(to);
              shake.current = Math.max(shake.current, 0.35);
            }
          }
        });
        break;
      }
      case "outro": {
        const p = easeInOut(clamp01(e / 0.9));
        r.root.position.z = END_Z - 6.5 * p;
        r.eyeLight.intensity *= 1 - p;
        r.eyeGlowMat.opacity = (1 - p) * 0.6;
        break;
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#020203"]} />
      <fog attach="fog" args={["#020203", 3, 26]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.05} />
      <pointLight position={[-3.5, 2.2, -2.5]} intensity={26} distance={9} color="#5E6AD2" />
      <pointLight position={[0, 0.4, START_Z + 3]} intensity={7} distance={16} color="#5E6AD2" />

      {/* ground haze disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -6]}>
        <cylinderGeometry args={[9, 9, 0.02, 40]} />
        <meshStandardMaterial color="#07070c" roughness={1} />
      </mesh>

      {/* speed streaks */}
      {streaks.map((st, i) => (
        <mesh
          key={i}
          ref={(m) => {
            streakRefs.current[i] = m;
          }}
          position={[
            Math.cos(st.angle) * st.radius,
            1.1 + Math.sin(st.angle) * st.radius * 0.55,
            st.z,
          ]}
          scale={[0.012, 0.012, st.len]}
          material={streakMat}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}

      <SamuraiFigure ref={rig} eyesOn />

      {/* three blades */}
      {[0, 1, 2].map((i) => (
        <Kunai
          key={i}
          innerRef={(g) => {
            bladeRefs.current[i] = g;
          }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  DOM overlay — captions, cracks, flash rings, skip                  */
/* ------------------------------------------------------------------ */
const CAPTIONS: Record<Phase, string> = {
  far: "◇ anomaly detected — left perimeter",
  eyes: "◇ target locked",
  charge: "◇ contact",
  knock: "◇ knocking on your screen",
  throw: "◇ blades away",
  outro: "✓ delivery confirmed",
};

function CrackDecal({ left, top, rotate }: { left: string; top: string; rotate: number }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ position: "absolute", left, top, rotate }}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      aria-hidden
    >
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" fill="none">
        <path d="M60 60 L30 22 M60 60 L14 58 M60 60 L42 104 M60 60 L96 20 M60 60 L108 70 M60 60 L84 100" />
        <path d="M60 60 L38 40 M60 60 L78 44 M60 60 L66 88" strokeOpacity="0.6" strokeWidth="1" />
      </g>
      <circle cx="60" cy="60" r="7" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      <circle cx="60" cy="60" r="16" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
    </motion.svg>
  );
}

export default function SamuraiIntro({ onComplete }: { onComplete: () => void }) {
  const phaseRef = useRef<Phase>("far");
  const [phase, setPhase] = useState<Phase>("far");
  const [rings, setRings] = useState<number[]>([]);
  const [cracks, setCracks] = useState<number[]>([]);
  const [caption, setCaption] = useState(CAPTIONS.far);
  const done = useRef(false);

  const setBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
    setCaption(CAPTIONS[p]);
  }, []);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onComplete();
  }, [onComplete]);

  // Timeline
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(500, () => {
      setBoth("eyes");
      playIgnite();
    });
    at(1500, () => {
      setBoth("charge");
      playWhoosh();
    });
    at(2150, () => setBoth("knock"));
    // two screen knocks — flash rings + thumps
    at(2480, () => {
      playKnock();
      setRings((r) => [...r, 1]);
    });
    at(3280, () => {
      playKnock();
      setRings((r) => [...r, 2]);
    });
    at(4100, () => setBoth("throw"));
    // blades: whoosh then clink each
    [0, 1, 2].forEach((i) => {
      at(4250 + i * 300, playWhoosh);
      at(4610 + i * 300, () => {
        playClink();
        setCracks((c) => (c.includes(i) ? c : [...c, i]));
      });
    });
    // résumé delivery
    at(5700, () => {
      try {
        if (!localStorage.getItem(RESUME_FLAG)) {
          const a = document.createElement("a");
          a.href = withBase(site.resume);
          a.download = "Shubham-Vishwakarma-Resume.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          localStorage.setItem(RESUME_FLAG, "1");
          setCaption("✓ résumé acquired :: Shubham-Vishwakarma-Resume.pdf");
        } else {
          setCaption("✓ résumé already secured on an earlier visit");
        }
      } catch {
        setCaption("◇ résumé available in the contact section below");
      }
    });
    at(6150, () => setBoth("outro"));
    at(7200, finish);

    return () => timers.forEach(clearTimeout);
  }, [finish, setBoth]);

  // Skip on Esc or click
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  return (
    <motion.div
      role="dialog"
      aria-label="Samurai intro sequence"
      className="scanlines fixed inset-0 z-[95] bg-background-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      onClick={finish}
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.3, CAM_Z], fov: 50, near: 0.1, far: 80 }}
      >
        <CinematicScene phaseRef={phaseRef} />
      </Canvas>

      {/* knock flash rings */}
      {rings.map((id) => (
        <motion.div
          key={id}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2 border-white/50"
          initial={{ width: 30, height: 30, x: "-50%", y: "-50%", opacity: 0.9 }}
          animate={{ width: 420, height: 420, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onAnimationComplete={() => setRings((r) => r.filter((x) => x !== id))}
        />
      ))}

      {/* blade crack decals */}
      {cracks.map((i) => (
        <CrackDecal key={i} {...CRACKS[i]} />
      ))}

      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(2,2,3,0.75) 100%)",
        }}
      />

      {/* caption */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.p
          key={caption}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="whitespace-nowrap font-mono text-[11px] tracking-[0.3em] text-foreground-muted sm:text-xs"
        >
          {caption}
        </motion.p>
      </div>

      {/* top-left module chip */}
      <div className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] tracking-[0.3em] text-foreground-subtle sm:left-8 sm:top-6">
        SV://PERIMETER — {phase.toUpperCase()}
      </div>

      {/* skip */}
      <button
        type="button"
        onClick={(ev) => {
          ev.stopPropagation();
          finish();
        }}
        className="absolute right-5 top-5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-foreground-muted backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:text-foreground sm:right-8 sm:top-6"
      >
        SKIP ▸▸
      </button>
    </motion.div>
  );
}