/**
 * AmbientBackground — the 4-layer lighting system that defines the look.
 *
 *  1. Radial base gradient  (depth, top-center light falloff)
 *  2. Floating gradient blobs (cinematic, blurred "pools" of light)
 *  3. Film-grain noise        (prevents banding, adds tactility)
 *  4. Precision grid          (64px, radially masked)
 *
 *  Purely decorative, fixed, and `pointer-events-none`.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Layer 1 — base radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />

      {/* Layer 2 — animated ambient light pools */}
      <div className="animate-float absolute -top-[15%] left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-accent/25 blur-[150px]" />
      <div
        className="animate-float-slow absolute left-[-10%] top-1/4 h-[800px] w-[600px] rounded-full bg-[#8b5cf6]/15 blur-[120px]"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="animate-float absolute right-[-8%] top-1/3 h-[700px] w-[500px] rounded-full bg-[#3b82f6]/12 blur-[100px]"
        style={{ animationDelay: "-7s" }}
      />
      <div className="animate-blob-pulse absolute bottom-[-20%] left-1/3 h-[600px] w-[900px] rounded-full bg-accent/10 blur-[140px]" />

      {/* Layer 3 — noise texture */}
      <div className="noise-overlay absolute inset-0" />

      {/* Layer 4 — technical grid */}
      <div className="grid-overlay absolute inset-0 opacity-60" />
    </div>
  );
}
