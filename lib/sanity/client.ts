import { createClient } from "next-sanity";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-06";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(
  sanityProjectId && sanityDataset && sanityProjectId !== "your-project-id"
);

export const client = createClient({
  projectId: sanityProjectId || "portfolio",
  dataset: sanityDataset,
  apiVersion,
  useCdn: true
});
