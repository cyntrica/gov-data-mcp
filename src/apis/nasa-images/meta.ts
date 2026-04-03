/**
 * nasa-images module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nasa-images",
  displayName: "NASA Image & Video Library",
  category: "Space",
  description: "Search and retrieve NASA's media archive — images, videos, and audio from missions, telescopes, events, and more.",
  workflow: "nasa_image_search to find media → nasa_image_asset to get rendition URLs → nasa_image_metadata or nasa_image_captions for details",
  tips: "Use media_type to filter by image/video/audio. Keywords and center (e.g. 'JSC', 'KSC', 'JPL') help narrow results. Year range filters are useful for historical queries.",
  domains: [],
  reference: {
    docs: {
      "API Docs": "https://images.nasa.gov/docs/images.nasa.gov%20API.pdf",
      "Image Library": "https://images.nasa.gov",
    },
  },
} satisfies ModuleMeta;
