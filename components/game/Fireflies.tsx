const DEFAULT_POSITIONS = [
  { left: "12%", top: "20%", delay: "0s" },
  { left: "85%", top: "15%", delay: "0.8s" },
  { left: "22%", top: "55%", delay: "1.6s" },
  { left: "70%", top: "40%", delay: "2.2s" },
  { left: "45%", top: "65%", delay: "0.4s" },
  { left: "92%", top: "60%", delay: "1.1s" },
];

/** Small twinkling lights used on top of jungle scenes for a bit of magic. */
export function Fireflies() {
  return (
    <>
      {DEFAULT_POSITIONS.map((fly, i) => (
        <span
          key={i}
          className="animate-firefly absolute h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_8px_3px_rgba(253,224,71,0.7)]"
          style={{ left: fly.left, top: fly.top, animationDelay: fly.delay }}
        />
      ))}
    </>
  );
}
