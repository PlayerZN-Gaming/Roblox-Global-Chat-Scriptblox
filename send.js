const BIN_ID = "6923e199ae596e708f6ceed2";
const API_KEY = "PASTE-YOUR-JSONBIN-KEY-HERE";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "POST only" });
  }

  const { user, message } = req.body;
  if (!user || !message) {
    return res.json({ success: false, error: "Missing fields" });
  }

  const current = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });

  const data = await current.json();
  const messages = data.record.messages || [];

  messages.push({ user, message, timestamp: Date.now() });

  if (messages.length > 200) messages.shift();

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
    body: JSON.stringify({ messages })
  });

  res.json({ success: true });
}
