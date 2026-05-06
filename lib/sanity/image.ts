import { createImageUrlBuilder } from "@sanity/image-url";
import { client, sanityConfigured } from "./client";
import type { EditableImage } from "@/lib/content/types";

const builder = createImageUrlBuilder(client);

export function urlForImage(source?: EditableImage) {
  if (!sanityConfigured || !source?.asset?._ref) {
    return undefined;
  }

  return builder.image(source as Parameters<typeof builder.image>[0]);
}
