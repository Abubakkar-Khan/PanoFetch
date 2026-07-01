import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black">
      <header className="w-full border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight flex items-center gap-2 hover:text-neutral-300 transition-colors">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center text-black font-black text-xs leading-none">✦</div>
            PanoFetch
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-400">
            <a href="https://github.com/Abubakkar-Khan/PanoFetch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to App
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-grow w-full max-w-3xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Documentation</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-medium mb-4 text-neutral-200">How It Works</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              PanoFetch extracts high-resolution 360° panoramas from standard Google Maps links without requiring an API key. 
              It does this by reverse-engineering the internal panorama IDs embedded in the URL and directly requesting the raw imagery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-neutral-200">Extraction Methods</h2>
            <div className="space-y-6">
              <div className="p-5 border border-neutral-800 bg-neutral-900/30 rounded-lg">
                <h3 className="font-medium text-white mb-2">1. Standard Street View</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  For official Google Street View cars, the imagery is broken into hundreds of small tiles. 
                  PanoFetch determines the maximum zoom level (up to 8192x4096), downloads all the individual grid tiles concurrently, 
                  and stitches them together in-memory using a high-performance image processing library.
                </p>
              </div>
              
              <div className="p-5 border border-neutral-800 bg-neutral-900/30 rounded-lg">
                <h3 className="font-medium text-white mb-2">2. User-Uploaded Photo Spheres</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  For panoramas uploaded by local guides or users (which have different internal IDs), 
                  the app extracts the hidden `lh3.googleusercontent.com` base URL from the map data and requests 
                  the full, un-tiled, native 8K equirectangular image directly from Google's servers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-neutral-200">Limitations</h2>
            <ul className="list-disc list-inside text-neutral-400 space-y-2 text-sm leading-relaxed">
              <li>Some highly obscure rural areas may only have low-resolution data available.</li>
              <li>Google occasionally rotates its undocumented endpoint keys. If a download fails, PanoFetch automatically falls back to lower resolutions.</li>
              <li>Files can be up to 15MB. Ensure you have a stable connection.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
