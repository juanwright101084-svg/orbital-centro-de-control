// Fondo: estrellas + horizonte de la Tierra con resplandor atmosférico.
export function SpaceBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-black"
    >
      <div className="stars absolute inset-0" />
      <div className="absolute left-1/2 top-[78%] h-[160vw] w-[160vw] -translate-x-1/2 rounded-full border-t border-sky-200/50 bg-black shadow-[0_-6px_50px_6px_rgba(56,120,255,0.55),0_-30px_140px_30px_rgba(40,90,220,0.25)]" />
    </div>
  );
}
