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
            <h2 className="text-xl font-medium mb-4 text-neutral-200">Extraction Methods (Deep Dive)</h2>
            <div className="space-y-6">
              <div className="p-6 border border-neutral-800 bg-neutral-900/30 rounded-lg">
                <h3 className="font-medium text-white mb-2 text-lg">1. Standard Street View (The Tiling Engine)</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  For official Google Street View cars (the ones driving on public roads), the 360-degree imagery is far too massive to send as a single file. Google's servers break the image down into hundreds of small 512x512 pixel "tiles" across multiple zoom levels.
                </p>
                <ul className="list-disc list-inside text-sm text-neutral-400 space-y-2">
                  <li><strong>Tile Fetching:</strong> PanoFetch determines the maximum zoom level (usually Zoom 4, which equates to an 8192x4096 canvas). It then asynchronously downloads up to 128 individual tiles concurrently to maximize speed.</li>
                  <li><strong>Dynamic Bounding:</strong> Some older panoramas or restricted areas do not span a full 360 degrees. Instead of creating a massive black canvas with a tiny image in the corner, PanoFetch mathematically maps the coordinates of all successfully downloaded tiles and shrinks the canvas to fit the exact bounds of the available data.</li>
                  <li><strong>Stitching & Trimming:</strong> The tiles are composited in-memory using the <code>sharp</code> image processing engine. A final trimming algorithm actively scans the raw pixel buffer and shaves off any residual black padding baked into the tiles by Google.</li>
                </ul>
              </div>
              
              <div className="p-6 border border-neutral-800 bg-neutral-900/30 rounded-lg">
                <h3 className="font-medium text-white mb-2 text-lg">2. User-Uploaded Photo Spheres (The Flat Extractor)</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  For panoramas uploaded by individual users or local guides (often inside businesses, parks, or off-road trails), Google stores the imagery differently. These do not use the tile grid. Instead, they are stored on Google's highly distributed <code>lh3.googleusercontent.com</code> servers.
                </p>
                <ul className="list-disc list-inside text-sm text-neutral-400 space-y-2">
                  <li><strong>URL Reverse-Engineering:</strong> PanoFetch scans the background network requests or page source of the Google Maps link to intercept the low-resolution thumbnail URL.</li>
                  <li><strong>Parameter Injection:</strong> It strips the low-resolution flags (like <code>=w900-h600</code>) and injects high-resolution flags (<code>=w8192-h4096-k-no</code>) to force Google's servers to return the original, uncompressed flat image file.</li>
                  <li><strong>Direct Download:</strong> This bypasses the stitching engine entirely, resulting in near-instantaneous downloads for user-uploaded spheres.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4 text-neutral-200">Limitations & Troubleshooting</h2>
            <ul className="list-disc list-inside text-neutral-400 space-y-3 text-sm leading-relaxed">
              <li><strong>Rural Areas:</strong> Some highly obscure rural roads may only have low-resolution data available (e.g., Zoom 2 or 3). PanoFetch automatically detects HTTP 404 errors for missing high-res tiles and gracefully falls back to the highest available resolution.</li>
              <li><strong>File Sizes:</strong> High-resolution panoramas can exceed 15MB. Ensure you have a stable network connection when initiating an extraction.</li>
              <li><strong>Image Projections:</strong> Downloaded images are stored in an <strong>Equirectangular Projection</strong> (usually exactly a 2:1 aspect ratio). They will look distorted on a flat screen but are ready to be directly imported into 3D software (Blender, Unity, Unreal) or 360-degree viewers.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
