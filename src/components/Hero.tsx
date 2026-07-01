export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-12">

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white max-w-2xl">
        Extract Panoramas.
      </h1>
      <p className="text-lg text-neutral-400 max-w-xl">
        High-resolution Street View extraction. Paste a Google Maps link and download the full equirectangular image.
      </p>
    </div>
  );
}
