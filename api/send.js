export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ success: false, error: "POST only" });
  }

  // 🔥 Insert your keys here
  const BIN_ID = "6923e199ae596e708f6ceed2";
  const MASTER_KEY = "$2a$10$gsW4zzNGmXVvFclb.hFPheWIZhmqIWRobGSMh55RJaN3JI6.o60rK";

  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({ success: false, error: "Missing user or message" });
  }

  // Get existing messages
  const getReq = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": MASTER_KEY }
  });
  const getData = await getReq.json();
  const messages = getData.record.messages || [];

  // Add the new message
  messages.push({
    user,
    message,
    time: Date.now()
  });

  // Update JSONBin
  const updateReq = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    },
    body: JSON.stringify({ messages })
  });

  const updateData = await updateReq.json();
  res.status(200).json({ success: true, messages });
}
