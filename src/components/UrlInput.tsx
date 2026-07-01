"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative z-20">
      <div className="flex flex-col md:flex-row items-stretch border border-neutral-800 bg-black rounded-lg overflow-hidden focus-within:border-neutral-500 transition-colors">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://maps.google.com/..."
          className="w-full bg-transparent px-5 py-4 text-white focus:outline-none placeholder:text-neutral-600 font-mono text-sm"
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="px-6 py-4 bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-neutral-800 md:border-transparent"
        >
          {isLoading ? "Processing..." : "Extract"}
          {!isLoading && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
  );
}
