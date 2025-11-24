export default async function handler(req, res) {
  const BIN_ID = "6923e199ae596e708f6ceed2";        // ← SAME BIN ID
  const MASTER_KEY = "$2a$10$gsW4zzNGmXVvFclb.hFPheWIZhmqIWRobGSMh55RJaN3JI6.o60rK"; // ← SAME MASTER KEY

  try {
    const r = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { "X-Master-Key": MASTER_KEY }
    });
    const d = await r.json();
    res.json(d.record || []);
  } catch (e) {
    res.json([]);
  }
}