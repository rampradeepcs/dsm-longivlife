"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

/* ---------- helpers ---------- */

/** Clamped 0→1 progress inside [a, b]. */
function range(p: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}
/** Smooth ease for a range value. */
function ease(x: number) {
  return x * x * (3 - 2 * x);
}
/** Bell curve: 0 at a, 1 at middle, 0 at b. */
function bell(p: number, a: number, b: number) {
  const x = range(p, a, b);
  return Math.sin(x * Math.PI);
}
/** Deterministic pseudo-random, stable across renders. */
function rand(i: number, k: number) {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const lerp = THREE.MathUtils.lerp;

/* ---------- product label texture (green LONGIV AM design) ---------- */

/** Draw the LONGIVlife lockup (wave + wordmark) in white at (x, y). */
function drawLockup(g: CanvasRenderingContext2D, x: number, y: number, s: number) {
  g.save();
  g.translate(x, y);
  g.scale(s, s);
  // waveform
  g.strokeStyle = "#FFFFFF";
  g.lineWidth = 3.2;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(0, 21);
  g.lineTo(8, 21);
  g.bezierCurveTo(11, 21, 12, 13, 15, 13);
  g.bezierCurveTo(18, 13, 19, 21, 22, 21);
  g.bezierCurveTo(25, 21, 26, 4, 29, 4);
  g.bezierCurveTo(32.5, 4, 33.5, 38, 37, 38);
  g.bezierCurveTo(40.5, 38, 41.5, 6, 45, 6);
  g.bezierCurveTo(48.5, 6, 49, 21, 52, 21);
  g.lineTo(60, 21);
  g.stroke();
  // gold tip
  g.strokeStyle = "#F2CE73";
  g.beginPath();
  g.moveTo(25.9, 7.4);
  g.bezierCurveTo(26.8, 5, 27.7, 4, 29, 4);
  g.bezierCurveTo(30.3, 4, 31.2, 5.1, 32, 7.4);
  g.stroke();
  // wordmark
  g.fillStyle = "#FFFFFF";
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
  g.font = "300 30px 'Helvetica Neue', Arial, sans-serif";
  g.fillText("L O N G I V", 68, 32);
  g.font = "italic 34px Georgia, 'Times New Roman', serif";
  g.fillText("life", 232, 32);
  g.restore();
}

/** Small sunrise icon, white line art. */
function drawSun(g: CanvasRenderingContext2D, x: number, y: number, s: number) {
  g.save();
  g.translate(x, y);
  g.scale(s, s);
  g.strokeStyle = "#FFFFFF";
  g.lineWidth = 3;
  g.lineCap = "round";
  // dome
  g.beginPath();
  g.arc(0, 0, 16, Math.PI, 0);
  g.stroke();
  // horizon lines
  for (const [w, yy] of [
    [22, 6],
    [15, 13],
  ] as const) {
    g.beginPath();
    g.moveTo(-w, yy);
    g.lineTo(w, yy);
    g.stroke();
  }
  // rays
  for (const a of [-150, -120, -90, -60, -30]) {
    const r = (a * Math.PI) / 180;
    g.beginPath();
    g.moveTo(Math.cos(r) * 22, Math.sin(r) * 22);
    g.lineTo(Math.cos(r) * 30, Math.sin(r) * 30);
    g.stroke();
  }
  g.restore();
}

function useLabelTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 640;
    const g = c.getContext("2d")!;

    // bright product green, subtly darker at the wrap edges
    const grad = g.createLinearGradient(0, 0, c.width, 0);
    grad.addColorStop(0, "#6FAC32");
    grad.addColorStop(0.25, "#7FBC3C");
    grad.addColorStop(0.5, "#6FAC32");
    grad.addColorStop(0.75, "#7FBC3C");
    grad.addColorStop(1, "#6FAC32");
    g.fillStyle = grad;
    g.fillRect(0, 0, c.width, c.height);

    // cream bottom strip
    g.fillStyle = "#F5F1E3";
    g.fillRect(0, 552, c.width, 88);

    // two identical panels so the front reads from most angles
    for (const cx of [512, 1536]) {
      drawLockup(g, cx - 250, 42, 1.05);
      drawSun(g, cx + 220, 80, 1.15);

      g.textAlign = "center";
      g.fillStyle = "#FFFFFF";

      g.font = "700 74px 'Helvetica Neue', Arial, sans-serif";
      g.fillText("LONGIV AM", cx, 218);

      g.font = "400 40px 'Helvetica Neue', Arial, sans-serif";
      g.fillText("For Her", cx, 278);
      // rule lines beside "For Her"
      g.fillRect(cx - 210, 264, 110, 2);
      g.fillRect(cx + 100, 264, 110, 2);

      g.font = "600 44px 'Helvetica Neue', Arial, sans-serif";
      g.fillText("Hormonal Balance, Vitality, Glow", cx, 348);

      g.font = "500 30px 'Helvetica Neue', Arial, sans-serif";
      g.fillText("Daily hormone harmony with active folate & KSM-66", cx, 404);

      g.font = "300 26px 'Helvetica Neue', Arial, sans-serif";
      g.fillText("Isoflavones — calm menopause symptoms", cx, 452);
      g.fillText("Ashwagandha — stress & anxiety reduction", cx, 488);
      g.fillText("Vitamin B8 (active folate) — reproductive support & glow", cx, 524);

      // bottom strip: dose + veg mark
      g.fillStyle = "#10201A";
      g.font = "500 34px 'Helvetica Neue', Arial, sans-serif";
      g.fillText("30 Mornings", cx, 610);
      g.strokeStyle = "#1B5E44";
      g.lineWidth = 4;
      g.strokeRect(cx + 130, 578, 44, 44);
      g.fillStyle = "#1B5E44";
      g.beginPath();
      g.arc(cx + 152, 600, 12, 0, Math.PI * 2);
      g.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

/* ---------- ribbed white cap texture ---------- */

function useCapTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 64;
    const g = c.getContext("2d")!;
    g.fillStyle = "#F4F1E9";
    g.fillRect(0, 0, 256, 64);
    g.fillStyle = "rgba(16,32,26,0.10)";
    for (let x = 0; x < 256; x += 8) {
      g.fillRect(x, 0, 3, 64);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(6, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ---------- capsule (two-tone, for the story moments) ---------- */

const CAPSULE_COLORS = ["#5E93BA", "#E0A43C", "#4B4A7A"];

function TwoToneCapsule({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.085, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.17, 28]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <sphereGeometry args={[0.155, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.085, 0]}>
        <cylinderGeometry args={[0.155, 0.155, 0.17, 28]} />
        <meshStandardMaterial color="#F3EFE4" roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.17, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.155, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#F3EFE4" roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ---------- capsules packed inside the glass jar ---------- */

function InteriorFill() {
  const fill = useMemo(() => {
    const items: {
      pos: [number, number, number];
      rot: [number, number, number];
    }[] = [];
    // bottom heap + top layer near the shoulder, like the packshots
    const zones: [number, number, number, number][] = [
      [-1.22, -0.92, 14, 0.55],
      [0.55, 0.78, 9, 0.4],
    ];
    let n = 0;
    for (const [y0, y1, count, rMax] of zones) {
      for (let i = 0; i < count; i++) {
        n++;
        const r = Math.sqrt(rand(n, 1)) * rMax;
        const a = rand(n, 2) * Math.PI * 2;
        items.push({
          pos: [
            Math.cos(a) * r,
            y0 + rand(n, 3) * (y1 - y0),
            Math.sin(a) * r,
          ],
          rot: [rand(n, 4) * Math.PI, rand(n, 5) * Math.PI, rand(n, 6) * Math.PI],
        });
      }
    }
    return items;
  }, []);

  return (
    <group>
      {fill.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={f.rot}>
          <capsuleGeometry args={[0.085, 0.16, 6, 12]} />
          <meshStandardMaterial
            color={i % 3 ? "#F7F4EA" : "#EFE9D8"}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- floating micro particles ---------- */

function Particles({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const { positions, seeds } = useMemo(() => {
    const n = 260;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const r = 2.2 + rand(i, 1) * 2.6;
      const theta = rand(i, 2) * Math.PI * 2;
      const y = (rand(i, 3) - 0.35) * 4.5;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r - 0.5;
      seed[i] = rand(i, 4) * Math.PI * 2;
    }
    return { positions: pos, seeds: seed };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.get();
    if (ref.current) {
      ref.current.rotation.y = t * 0.03;
      const arr = ref.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < seeds.length; i++) {
        arr[i * 3 + 1] += Math.sin(t * 0.6 + seeds[i]) * 0.0012;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
    if (mat.current) {
      // denser sparkle while capsules are out ("ingredient particles")
      mat.current.opacity = 0.35 + bell(p, 0.42, 0.8) * 0.45;
      mat.current.size = 0.02 + bell(p, 0.42, 0.8) * 0.025;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        color="#C9A24B"
        size={0.02}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- the bottle rig ---------- */

const CAPSULE_TARGETS: [number, number, number][] = [
  [-1.85, 1.05, 0.5],
  [0, 2.05, 0.3],
  [1.85, 1.25, 0.5],
];

function BottleRig({ progress }: { progress: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const bottle = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const capsuleRefs = useRef<(THREE.Group | null)[]>([]);
  const label = useLabelTexture();
  const ribs = useCapTexture();

  // wide-mouth jar silhouette, like the packshots
  const bodyProfile = useMemo(() => {
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.001, -1.38),
      new THREE.Vector2(0.66, -1.38),
      new THREE.Vector2(0.8, -1.3),
      new THREE.Vector2(0.84, -1.1),
      new THREE.Vector2(0.84, 0.78),
      new THREE.Vector2(0.78, 0.98),
      new THREE.Vector2(0.62, 1.12),
      new THREE.Vector2(0.53, 1.22),
      new THREE.Vector2(0.52, 1.48),
    ];
    return pts;
  }, []);

  useFrame((state, delta) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;
    // narrow-viewport compensation: shrink + lower the rig and zoom less,
    // so the bottle never swallows the headline / CTA on phones
    const aspect = state.size.width / state.size.height;
    const fitW = Math.min(1, 0.45 + aspect * 0.5);
    // short viewports also need a smaller, lower bottle
    const fit = fitW * Math.min(1, 0.55 + (state.size.height / 812) * 0.45);

    if (root.current) {
      // breathing idle, dampened once the sequence begins
      const calm = 1 - ease(range(p, 0.05, 0.25));
      root.current.position.y =
        Math.sin(t * 1.1) * 0.07 * calm - 1.5 - (1 - fit) * 1.4;
      root.current.scale.setScalar(0.9 * fit);
      // camera zoom in, then pull back for the finale
      const zIn = ease(range(p, 0.1, 0.36));
      const zOut = ease(range(p, 0.84, 1));
      const zNear = 5.6 + (1 - fit) * 2.4;
      state.camera.position.z = lerp(lerp(8.6, zNear, zIn), 9.0, zOut);
      state.camera.position.y = lerp(0.1, 0.55, zIn);
      state.camera.lookAt(0, lerp(-0.35, 0.1, zIn), 0);
    }

    if (bottle.current) {
      bottle.current.rotation.y =
        t * 0.12 + ease(range(p, 0.05, 0.5)) * Math.PI * 2;
    }

    if (cap.current) {
      // unscrew → lift → drift aside; reverse near the end
      const open = ease(range(p, 0.16, 0.36)) * (1 - ease(range(p, 0.84, 0.96)));
      cap.current.position.y = 1.72 + open * 1.7;
      cap.current.position.x = open * 1.35;
      cap.current.rotation.y = -open * Math.PI * 4;
      cap.current.rotation.z = open * 0.5;
    }

    capsuleRefs.current.forEach((g, i) => {
      if (!g) return;
      const out =
        ease(range(p, 0.3 + i * 0.05, 0.52 + i * 0.05)) *
        (1 - ease(range(p, 0.76 + i * 0.03, 0.9)));
      const [tx, ty, tz] = CAPSULE_TARGETS[i];
      // pull capsules toward the vertical axis on narrow screens so all
      // three stay in frame; give back a little height instead
      const spread = Math.min(1, aspect * 1.05);
      const sx = tx * spread;
      const sy = ty + (1 - spread) * 0.9;
      g.position.set(
        lerp(0, sx, out) + Math.sin(t * 1.4 + i * 2.1) * 0.06 * out,
        lerp(1.1, sy, out) + Math.cos(t * 1.1 + i) * 0.05 * out,
        lerp(0, tz, out),
      );
      const s = 0.15 + out * 0.85;
      g.scale.setScalar(s);
      g.rotation.z = lerp(0, 0.5 - i * 0.5, out);
      g.rotation.y += delta * 0.6 * out;
    });
  });

  return (
    <group ref={root}>
      <group ref={bottle}>
        {/* capsules inside the jar (drawn before the glass shell) */}
        <InteriorFill />
        {/* clear glass body */}
        <mesh>
          <latheGeometry args={[bodyProfile, 64]} />
          <meshPhysicalMaterial
            color="#DCEcE2"
            transparent
            opacity={0.3}
            roughness={0.05}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* product label band */}
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.855, 0.855, 1.52, 64, 1, true]} />
          <meshStandardMaterial map={label} roughness={0.42} />
        </mesh>
      </group>

      {/* white ribbed cap */}
      <group ref={cap}>
        <mesh>
          <cylinderGeometry args={[0.58, 0.58, 0.46, 64]} />
          <meshStandardMaterial map={ribs} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.56, 0.58, 0.05, 64]} />
          <meshStandardMaterial color="#F6F3EB" roughness={0.5} />
        </mesh>
      </group>

      {/* story capsules — AM / NOON / PM */}
      {CAPSULE_COLORS.map((c, i) => (
        <group
          key={c}
          ref={(el) => {
            capsuleRefs.current[i] = el;
          }}
        >
          <TwoToneCapsule color={c} />
        </group>
      ))}
    </group>
  );
}

/* ---------- exported scene ---------- */

export default function BottleScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.1, 8.6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <ambientLight intensity={0.9} color="#FFF7EA" />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#FFFFFF" />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#BFD8CC" />
      <pointLight position={[0, -2, 4]} intensity={0.4} color="#E0A43C" />
      <BottleRig progress={progress} />
      <Particles progress={progress} />
    </Canvas>
  );
}
