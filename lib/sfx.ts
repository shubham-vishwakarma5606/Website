/**
 * sfx — synthesized sound effects for the samurai cinematic.
 * Pure WebAudio oscillators/noise: zero audio assets, tiny, lazy.
 * Every entry point is failure-safe (autoplay policies, no AudioContext).
 */

let ctx: AudioContext | null = null;

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

function master(c: AudioContext, gain = 0.5): GainNode {
  const g = c.createGain();
  g.gain.value = gain;
  g.connect(c.destination);
  return g;
}

/** Short white-noise buffer, rebuilt per call (cheap enough). */
function noise(c: AudioContext, seconds: number): AudioBufferSourceNode {
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  return src;
}

/** Eyes ignite — low electric drone sweep. */
export function playIgnite() {
  const c = ensureCtx();
  if (!c) return;
  try {
    const t = c.currentTime;
    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.5);
    const filt = c.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 320;
    const g = master(c, 0.34);
    g.gain.setValueAtTime(0.0, t);
    g.gain.linearRampToValueAtTime(0.5, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc.connect(filt).connect(g);
    osc.start(t);
    osc.stop(t + 0.6);
  } catch {}
}

/** Screen knock — deep membrane thump + contact noise. */
export function playKnock() {
  const c = ensureCtx();
  if (!c) return;
  try {
    const t = c.currentTime;
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.22);
    const g = master(c, 0.6);
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    osc.connect(g);
    osc.start(t);
    osc.stop(t + 0.3);

    const n = noise(c, 0.07);
    const nf = c.createBiquadFilter();
    nf.type = "lowpass";
    nf.frequency.value = 900;
    const ng = master(c, 0.28);
    ng.gain.setValueAtTime(0.35, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    n.connect(nf).connect(ng);
    n.start(t);
  } catch {}
}

/** Blade flight — band-passed noise whoosh. */
export function playWhoosh() {
  const c = ensureCtx();
  if (!c) return;
  try {
    const t = c.currentTime;
    const n = noise(c, 0.4);
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.1;
    f.frequency.setValueAtTime(420, t);
    f.frequency.exponentialRampToValueAtTime(2200, t + 0.16);
    f.frequency.exponentialRampToValueAtTime(260, t + 0.38);
    const g = master(c, 0.3);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    n.connect(f).connect(g);
    n.start(t);
  } catch {}
}

/** Blade impact — metallic clink. */
export function playClink() {
  const c = ensureCtx();
  if (!c) return;
  try {
    const t = c.currentTime;
    [2637, 3612].forEach((freq, i) => {
      const osc = c.createOscillator();
      osc.type = i === 0 ? "triangle" : "square";
      osc.frequency.value = freq;
      const g = master(c, i === 0 ? 0.2 : 0.07);
      g.gain.setValueAtTime(0.4, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + (i === 0 ? 0.16 : 0.07));
      osc.connect(g);
      osc.start(t);
      osc.stop(t + 0.2);
    });
    const n = noise(c, 0.05);
    const hf = c.createBiquadFilter();
    hf.type = "highpass";
    hf.frequency.value = 3200;
    const ng = master(c, 0.16);
    ng.gain.setValueAtTime(0.3, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    n.connect(hf).connect(ng);
    n.start(t);
  } catch {}
}