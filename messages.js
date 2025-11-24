export default async function handler(req, res) {
  const BIN_ID = process.env.JSONBIN_ID;
  const MASTER_KEY = process.env.JSONBIN_KEY;

  const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });
  const data = await r.json();
  const msgs = data.record.messages || [];

  const html = `
    <!DOCTYPE html><html><head><title>Messages</title></head>
    <body>${msgs.map(m => `<p><b>${m.user}:</b> ${m.message}</p>`).join("")}</body>
    </html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
