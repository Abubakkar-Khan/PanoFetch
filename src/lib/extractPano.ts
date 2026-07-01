import axios from "axios";

export interface PanoInfo {
  panoId: string;
  lh3Url?: string;
}

export async function extractPanoInfo(url: string): Promise<PanoInfo | null> {
  try {
    // Basic validation
    if (!url.includes("google.com/maps") && !url.includes("maps.app.goo.gl") && !url.includes("goo.gl/maps")) {
      return null;
    }

    let panoId: string | null = null;
    let lh3Url: string | undefined = undefined;

    // Strategy 1: Look for pano ID in the original URL directly
    const directUrlMatch = url.match(/!1s([^!&?]+)/);
    if (directUrlMatch && directUrlMatch[1] && directUrlMatch[1].length >= 22) {
      panoId = directUrlMatch[1];
    }
    
    if (!panoId) {
      const panoidParamMatch = url.match(/panoid=([^&]+)/);
      if (panoidParamMatch && panoidParamMatch[1] && panoidParamMatch[1].length >= 22) {
        panoId = panoidParamMatch[1];
      }
    }

    // Try to extract lh3Url from the provided URL
    const decodedUrl = decodeURIComponent(url);
    const lh3Regex = /(https:\/\/lh[0-9]?\.googleusercontent\.com\/[^=&\?"\\]+)/;
    
    const lh3Match = decodedUrl.match(lh3Regex);
    if (lh3Match) {
      lh3Url = lh3Match[1];
    }

    if (panoId && lh3Url) {
      return { panoId, lh3Url };
    }

    // If not found in original URL (e.g. short link) or missing lh3Url, fetch to follow redirects
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const finalUrl = response.request?.res?.responseUrl || url;
    const html = response.data;

    // Look for pano ID in the final resolved URL.
    if (!panoId) {
      const urlMatch = finalUrl.match(/!1s([^!&?]+)/);
      if (urlMatch && urlMatch[1] && urlMatch[1].length >= 22) {
        panoId = urlMatch[1];
      }
    }

    if (!panoId) {
      const stateMatch = html.match(/"([^"]{22})",\[\[null,null,[-0-9.]+,[-0-9.]+\]/);
      if (stateMatch && stateMatch[1]) {
          panoId = stateMatch[1];
      }
    }

    if (!panoId) {
      const fallbackMatch = html.match(/\[null,null,"([^"]{22})"\]/);
      if (fallbackMatch && fallbackMatch[1]) {
          panoId = fallbackMatch[1];
      }
    }

    if (!lh3Url) {
      const decodedFinalUrl = decodeURIComponent(finalUrl);
      const finalLh3Match = decodedFinalUrl.match(lh3Regex);
      if (finalLh3Match) {
        lh3Url = finalLh3Match[1];
      }
    }
    
    if (!lh3Url) {
      const htmlLh3Match = html.match(lh3Regex);
      if (htmlLh3Match) {
        lh3Url = htmlLh3Match[1];
      }
    }

    if (panoId) {
      return { panoId, lh3Url };
    }

    return null;
  } catch (error) {
    console.error("Error extracting pano info:", error);
    return null;
  }
}
