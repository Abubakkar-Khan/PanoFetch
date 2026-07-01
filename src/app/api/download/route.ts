import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import axios from "axios";
import { extractPanoInfo } from "@/lib/extractPano";
import { downloadTiles } from "@/lib/downloadTiles";
import { stitchTiles } from "@/lib/stitchTiles";

// Helper to ensure directory exists
async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    // Ignore error if it already exists
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    // 1. Extract Pano ID and optional lh3Url
    const panoInfo = await extractPanoInfo(url);

    if (!panoInfo || !panoInfo.panoId) {
      return NextResponse.json({ success: false, error: "Could not extract Panorama ID from the URL." }, { status: 400 });
    }

    const { panoId, lh3Url } = panoInfo;
    let imageBuffer: Buffer | null = null;
    let zoom = 4;
    let width = 8192;
    let height = 4096;

    // 2. If it's a user-uploaded photosphere, download the flat image directly
    if (lh3Url) {
      try {
        const res = await axios.get(`${lh3Url}=w8192-h4096-k-no`, { responseType: "arraybuffer", timeout: 15000 });
        imageBuffer = Buffer.from(res.data);
      } catch (err) {
        console.warn("Failed to download full flat image, falling back to tiles:", err);
      }
    }

    // 3. Fallback to tile fetching if flat image failed or wasn't available
    if (!imageBuffer) {
      let tiles = await downloadTiles(panoId, zoom);

      // Fallback for panoramas that don't have zoom level 4
      if (tiles.length === 0) {
        zoom = 3;
        tiles = await downloadTiles(panoId, zoom);
      }
      
      // Fallback to zoom 2 if zoom 3 also fails
      if (tiles.length === 0) {
        zoom = 2;
        tiles = await downloadTiles(panoId, zoom);
      }

      if (tiles.length === 0) {
        return NextResponse.json({ success: false, error: "Failed to download panorama tiles. It might not be available at this resolution." }, { status: 404 });
      }

      imageBuffer = await stitchTiles(tiles, zoom);
      width = Math.pow(2, zoom) * 512;
      height = Math.pow(2, zoom - 1) * 512;
    }

    // 4. Save to local disk temporarily
    const publicDownloadsDir = path.join(process.cwd(), "public", "downloads");
    await ensureDir(publicDownloadsDir);

    // Generate safe filename
    const hash = crypto.createHash("md5").update(panoId + Date.now()).digest("hex").substring(0, 8);
    const filename = `pano-${panoId}-${hash}.jpg`;
    const filePath = path.join(publicDownloadsDir, filename);

    await fs.writeFile(filePath, imageBuffer);

    return NextResponse.json({
      success: true,
      filename,
      downloadUrl: `/downloads/${filename}`,
      width,
      height
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
