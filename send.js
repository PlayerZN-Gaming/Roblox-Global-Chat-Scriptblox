export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  // 🔧 Put your JSONBin info here:
  const BIN_ID = "YOUR_BIN_ID_HERE";
  const MASTER_KEY = "YOUR_MASTER_KEY_HERE";

  const { user, message } = req.body;

  if (!user || !message)
    return res.status(400).json({ error: "Missing fields" });

  // 1. Get latest data
  const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });
  const data = await r.json();

  const msgs = data.record.messages || [];
  msgs.push({
    user,
    message,
    time: "0 seconds ago"
  });

  // 2. Save updated list
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    },
    body: JSON.stringify({ messages: msgs })
  });

  res.json({ success: true });
}
