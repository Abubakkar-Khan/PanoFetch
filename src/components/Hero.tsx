export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-medium text-neutral-400 mb-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        v1.0 Live
      </div>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white max-w-2xl">
        Extract Panoramas.
      </h1>
      <p className="text-lg text-neutral-400 max-w-xl">
        High-resolution Street View extraction. Paste a Google Maps link and download the full equirectangular image.
      </p>
    </div>
  );
}
