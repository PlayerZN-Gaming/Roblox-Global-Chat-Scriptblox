export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { localplayername, message } = req.body || {};
  if (!localplayername || !message) return res.status(400).end();

  const BIN_ID = "67b3f15bad19ca34f815d35f";
  const KEY = "$2b$10$8z8K9k9Xj5vL7pQz3mN2/.exampleKeyDoNotSteal";

  try {
    const get = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": KEY }
    });
    const data = await get.json();
    let messages = data.record || [];

    messages.push({ localplayername, message, time: Date.now() });
    if (messages.length > 300) messages.shift();

    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Master-Key": KEY },
      body: JSON.stringify(messages)
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).end();
  }
}

export const config = { api: { bodyParser: true } };