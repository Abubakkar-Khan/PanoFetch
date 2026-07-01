import sharp from "sharp";
import { Tile } from "./downloadTiles";

export async function stitchTiles(tiles: Tile[], zoom: number = 4): Promise<{buffer: Buffer, width: number, height: number}> {
  if (tiles.length === 0) {
    throw new Error("No tiles provided for stitching");
  }

  const TILE_SIZE = 512;
  
  // Calculate actual dimensions based on max tile coordinates
  const maxX = Math.max(...tiles.map(t => t.x));
  const maxY = Math.max(...tiles.map(t => t.y));
  
  const width = (maxX + 1) * TILE_SIZE;
  const height = (maxY + 1) * TILE_SIZE;

  // Create composite operations for sharp
  const compositeOperations = tiles.map(tile => ({
    input: tile.buffer,
    top: tile.y * TILE_SIZE,
    left: tile.x * TILE_SIZE,
  }));

  // Create a blank image and composite tiles onto it
  const buffer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  })
    .composite(compositeOperations)
    .jpeg({ quality: 90 }) // Optimize for size and quality
    .toBuffer();

  return { buffer, width, height };
}
