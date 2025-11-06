import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const a = process.env.API_KEY || "";
  const g = process.env.GOOGLE_API_KEY || "";
  const pick = a || g;
  return res.status(200).json({
    hasAPI_KEY: Boolean(a),
    hasGOOGLE_API_KEY: Boolean(g),
    using: a ? "API_KEY" : (g ? "GOOGLE_API_KEY" : "(none)"),
    sample: pick ? pick.slice(0,6) + "…" + pick.slice(-4) : "(empty)",
    looksLikeGoogle: /^AIza/.test(pick),
    length: pick.length
  });
}
