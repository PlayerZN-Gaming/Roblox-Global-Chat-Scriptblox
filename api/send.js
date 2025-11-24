import messages from './_data.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { localplayername, message } = req.body || {};

  if (!localplayername || !message) {
    res.status(400).json({ error: 'Missing localplayername or message' });
    return;
  }

  messages.push({
    localplayername: localplayername.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  });

  // Keep only last 300 messages
  if (messages.length > 300) messages.shift();

  res.status(200).json({ success: true });
}

export const config = {
  api: {
    bodyParser: true,
  },
};