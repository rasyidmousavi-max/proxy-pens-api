export default async function handler(req, res) {
  // Set CORS Header agar frontend/aplikasi bisa mengakses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Tangani preflight request dari browser
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const bodyData = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const response = await fetch("https://online.mis.pens.ac.id/API_PENS/v1/read", {
      method: "POST",
      headers: {
        "User-Agent": "Dart/3.4 (dart:io)",
        "Content-Type": "application/json",
        "x-api-key": "PENS-4uT673rV5mCgdttu3Fgyv.3tgnDyNIwe4cTR2k2M.9TbOVNpXeGCi"
      },
      body: bodyData
    });

    const data = await response.text();

    return res.status(response.status).send(data);
  } catch (err) {
    return res.status(500).json({ 
      error: "Gagal terhubung ke API PENS", 
      details: err.message 
    });
  }
}
