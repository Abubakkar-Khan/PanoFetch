import axios from "axios";
import pLimit from "p-limit";

export interface Tile {
  x: number;
  y: number;
  buffer: Buffer;
}

export async function downloadTiles(panoId: string, zoom: number = 4): Promise<Tile[]> {
  const tiles: Tile[] = [];
  const limit = pLimit(10); // 10 concurrent requests

  // For zoom = 4, there are 2^4 = 16 columns and 2^3 = 8 rows.
  // Actually, standard equirectangular panoramas are exactly 2:1 ratio.
  const cols = Math.pow(2, zoom);
  const rows = Math.pow(2, zoom - 1);

  const tasks: Promise<void>[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      tasks.push(
        limit(async () => {
          const url = `https://streetviewpixels-pa.googleapis.com/v1/tile?cb_client=maps_sv.tactile&panoid=${panoId}&x=${x}&y=${y}&zoom=${zoom}`;
          try {
            const response = await axios.get(url, {
              responseType: "arraybuffer",
              timeout: 10000,
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              }
            });
            
            // If the image is a generic "No image available" tile, we might still get a 200, but typically we want all valid tiles.
            tiles.push({
              x,
              y,
              buffer: Buffer.from(response.data),
            });
          } catch (error: any) {
            console.error(`Failed to fetch tile ${x},${y} for pano ${panoId}:`, error.message, error.response?.status);
            // Depending on strictness, we might throw or just continue. 
            // We'll continue so partial panoramas can still render.
          }
        })
      );
    }
  }

  await Promise.all(tasks);
  
  return tiles;
}
