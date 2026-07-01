"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import UrlInput from "@/components/UrlInput";
import Loader from "@/components/Loader";
import ResultCard from "@/components/ResultCard";

interface Result {
  downloadUrl: string;
  width: number;
  height: number;
  filename: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process panorama.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black">
      <header className="w-full border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-semibold text-lg tracking-tight flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center text-black font-black text-xs leading-none">✦</div>
            PanoFetch
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-neutral-400">
            <a href="/docs" className="hover:text-white transition-colors">Documentation</a>
            <a href="https://github.com/Abubakkar-Khan/PanoFetch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </nav>
        </div>
      </header>

      <div className="flex-grow w-full max-w-3xl mx-auto flex flex-col px-6 pt-24 pb-32">
        <Hero />
        
        <div className="mt-16 w-full">
          <UrlInput onSubmit={handleDownload} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mt-8 text-sm text-red-400 bg-red-950/30 p-4 border border-red-900/50 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-12 w-full">
          {isLoading && <Loader />}
          {result && !isLoading && <ResultCard result={result} />}
        </div>
      </div>

      <footer className="w-full border-t border-neutral-900 bg-black py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <div>PanoFetch &copy; {new Date().getFullYear()}</div>
          <div className="mt-4 md:mt-0">Open Source Tooling</div>
        </div>
      </footer>
    </main>
  );
}
