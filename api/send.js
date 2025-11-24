export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { localplayername, message } = req.body || {};
  if (!localplayername || !message) return res.status(400).end();

  const BIN_ID = "6923e199ae596e708f6ceed2";        // ← PUT YOUR BIN ID
  const MASTER_KEY = "$2a$10$gsW4zzNGmXVvFclb.hFPheWIZhmqIWRobGSMh55RJaN3JI6.o60rK"; // ← PUT YOUR MASTER KEY

  try {
    // Get current messages
    const get = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    const data = await get.json();
    let messages = data.record || [];

    // Add new message
    messages.push({
      localplayername: localplayername.trim(),
      message: message.trim(),
      time: Date.now()
    });

    // Keep only last 500 messages
    if (messages.length > 500) messages.shift();

    // Save back
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      },
      body: JSON.stringify(messages)
    });

    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}

export const config = { api: { bodyParser: true } };