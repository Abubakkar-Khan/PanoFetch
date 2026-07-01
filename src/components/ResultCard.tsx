"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

interface ResultCardProps {
  result: {
    filename: string;
    downloadUrl: string;
    width: number;
    height: number;
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result.downloadUrl;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full border border-neutral-800 bg-neutral-900/30 rounded-lg overflow-hidden">
      <div className="relative aspect-[2/1] bg-black w-full border-b border-neutral-800">
        <Image
          src={result.downloadUrl}
          alt="Panorama Preview"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-neutral-500 mb-1">
            DIMENSIONS
          </p>
          <p className="font-mono text-lg text-white">
            {result.width} × {result.height} px
          </p>
        </div>
        
        <button
          onClick={handleDownload}
          className="w-full md:w-auto px-6 py-3 bg-white text-black font-medium text-sm hover:bg-neutral-200 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Save to disk
        </button>
      </div>
    </div>
  );
}
