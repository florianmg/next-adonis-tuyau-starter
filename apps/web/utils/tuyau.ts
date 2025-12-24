import { createTuyau } from "@tuyau/client";
import { api } from "@repo/api/api"; // Importer api directement

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export const tuyau = createTuyau({
  api, // Passer l'objet api comme dans la doc
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
