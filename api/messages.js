const BIN_ID = "6923e199ae596e708f6ceed2";
const API_KEY = "$2a$10$gsW4zzNGmXVvFclb.hFPheWIZhmqIWRobGSMh55RJaN3JI6.o60rK";

function timeAgo(ts) {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default async function handler(req, res) {
  const current = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });

  const data = await current.json();
  const messages = data.record.messages || [];

  res.json({
    success: true,
    messages: messages.map(m => ({
      user: m.user,
      message: m.message,
      time: timeAgo(m.timestamp)
    }))
  });
}
