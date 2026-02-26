export default async function handler(req, res) {

  // ===== CORS =====
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const clientKey = req.headers["x-secret-key"];

  if (!clientKey || clientKey !== process.env.SECRET_KEY) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  return res.status(200).json({
    material_name: "Tri Zinc Citrate Dihydrate",
    manufacturer: "Gadot Biochemical Industries",
    category: "mineral",
    heavy_metals: {
      lead: { found: 0.8, limit: 3.0 },
      cadmium: { found: 0.1, limit: 1.0 },
      mercury: { found: 0.01, limit: 0.1 },
      arsenic: { found: 0.5, limit: 3.0 }
    }
  });
}
