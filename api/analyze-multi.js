import formidable from "formidable";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {

  // 🔐 בדיקת מפתח סודי
  if (req.headers["x-secret-key"] !== process.env.SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // ❌ חסימת מתודות אחרות
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ✅ תגובת בדיקה ראשונית (לבדיקה שהחיבור עובד)
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
