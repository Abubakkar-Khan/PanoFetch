import sharp from "sharp";
import { Tile } from "./downloadTiles";

export async function stitchTiles(tiles: Tile[], zoom: number = 4): Promise<{buffer: Buffer, width: number, height: number}> {
  if (tiles.length === 0) {
    throw new Error("No tiles provided for stitching");
  }

  const TILE_SIZE = 512;
  
  // Always anchor at 0,0 for standard spherical panoramas
  const maxX = Math.max(...tiles.map(t => t.x));
  const maxY = Math.max(...tiles.map(t => t.y));
  
  const width = (maxX + 1) * TILE_SIZE;
  const height = (maxY + 1) * TILE_SIZE;

  const compositeOperations = tiles.map(tile => ({
    input: tile.buffer,
    top: tile.y * TILE_SIZE,
    left: tile.x * TILE_SIZE,
  }));

  // Create intermediate raw buffer and extract precise channel info to prevent glitching
  const { data: rawBuffer, info } = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  })
    .composite(compositeOperations)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Apply a safe trim using exact channel mapping to avoid byte-skew
  const finalBuffer = await sharp(rawBuffer, { 
    raw: { 
      width: info.width, 
      height: info.height, 
      channels: info.channels 
    } 
  })
    .trim({ background: '#000000', threshold: 15 })
    .jpeg({ quality: 90 })
    .toBuffer();
    
  const metadata = await sharp(finalBuffer).metadata();

  return { 
    buffer: finalBuffer, 
    width: metadata.width || width, 
    height: metadata.height || height 
  };
}
