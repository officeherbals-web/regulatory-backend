import formidable from "formidable";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {

  // ===== CORS =====
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const form = formidable();

    const { fields } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const clientKey = fields.secret_key;

    if (!clientKey || clientKey !== process.env.SECRET_KEY) {
      return res.status(401).json({
        error: "Unauthorized",
        received: clientKey || "No key received",
        serverHasKey: process.env.SECRET_KEY ? "YES" : "NO"
      });
    }

    // סימולציה רגולטורית
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

  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
      message: error.message
    });
  }
}
