# PanoFetch

A minimalist, high-performance web application to extract and download high-resolution 360° Street View panoramas from Google Maps links. 

## Features
- **Zero Database Architecture**: Processes everything in memory and streams directly to disk.
- **Smart Pano ID Extraction**: Reverse-engineers Google Maps URLs to extract internal panorama IDs, including user-uploaded Photo Spheres (`lh3.googleusercontent.com`).
- **Tile Stitching Engine**: Automatically downloads grid tiles for standard Google panoramas and stitches them into a single equirectangular high-resolution image using `sharp`.
- **Direct Flat Extraction**: Detects user-uploaded photospheres and bypasses the tiling engine to fetch the native 8K flat image directly.

---

## Architecture Diagram

```mermaid
sequenceDiagram
    participant User
    participant Next.js API
    participant Google Maps
    participant Tile Engine

    User->>Next.js API: POST /api/download { url }
    Next.js API->>Google Maps: Fetch Maps Page (if needed)
    Google Maps-->>Next.js API: HTML/Redirect
    Next.js API->>Next.js API: Extract Pano ID & lh3Url

    alt Is User-Uploaded (lh3Url exists)
        Next.js API->>Google Maps: GET lh3 flat image (w8192-h4096)
        Google Maps-->>Next.js API: High-Res Buffer
    else Is Standard Street View
        Next.js API->>Tile Engine: Request 8K grid tiles (zoom 4/3/2)
        Tile Engine->>Google Maps: GET streetviewpixels-pa /v1/tile
        Google Maps-->>Tile Engine: Array of JPEGs
        Tile Engine->>Tile Engine: Stitch with sharp
        Tile Engine-->>Next.js API: High-Res Buffer
    end

    Next.js API->>Local Disk: Save to /public/downloads
    Next.js API-->>User: Return download URL
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Usage**
   Open `http://localhost:3000`, paste a Google Maps Street View URL, and click "Extract".

## Technologies Used
- Next.js (App Router)
- React & Tailwind CSS
- Sharp (Image Stitching)
- Axios (HTTP Client)
