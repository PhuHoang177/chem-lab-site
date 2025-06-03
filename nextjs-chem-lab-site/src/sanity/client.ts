import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "qort1r0u",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});