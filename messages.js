export default async function handler(req, res) {
  // 🔧 Put your JSONBin info here:
  const BIN_ID = "6923e199ae596e708f6ceed2";
  const MASTER_KEY = "$2a$10$gsW4zzNGmXVvFclb.hFPheWIZhmqIWRobGSMh55RJaN3JI6.o60rK";

  const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });

  const data = await r.json();
  const msgs = data.record.messages || [];

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Messages</title>
      <style>
        body { font-family: Arial; background: #111; color: white; padding: 20px; }
        .msg { background: #222; padding: 12px; margin-bottom: 10px; border-radius: 8px; }
        .user { font-weight: bold; }
        .time { opacity: 0.6; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>Messages</h1>
      ${msgs.map(m => `
        <div class="msg">
          <div class="user">${m.user}</div>
          <div>${m.message}</div>
          <div class="time">${m.time}</div>
        </div>
      `).join("")}
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
