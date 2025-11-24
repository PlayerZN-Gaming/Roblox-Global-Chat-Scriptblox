export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const BIN_ID = process.env.JSONBIN_ID;
  const MASTER_KEY = process.env.JSONBIN_KEY;

  const { user, message } = req.body;
  if (!user || !message) return res.status(400).json({ error: "Missing fields" });

  const fetchLatest = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });
  const data = await fetchLatest.json();
  const msgs = data.record.messages || [];
  msgs.push({ user, message, time: "0 seconds ago" });

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
