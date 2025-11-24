export default async function handler(req, res) {
  // 🔥 Insert your keys here
  const BIN_ID = "6923e199ae596e708f6ceed2";
  const MASTER_KEY = "$2a$10$gsW4zzNGmXVvFclb.hFPheWIZhmqIWRobGSMh55RJaN3JI6.o60rK";

  const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });

  const data = await r.json();
  const messages = data.record.messages || [];

  const html = `
  <!DOCTYPE html>
  <html>
  <head><title>Messages</title></head>
  <body style="font-family: Arial; padding: 20px;">
    <h2>Global Messages</h2>
    ${messages
      .map(m => `<p><b>${m.user}:</b> ${m.message}</p>`)
      .join("")}
  </body>
  </html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
