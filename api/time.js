// api/time.js
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');  // allow any domain
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Check API key from request headers
  const apiKey = req.headers['x-api-key'];  // client should send 'x-api-key' header
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Return current date/time
  const now = new Date();
  res.status(200).json({ datetime: now.toISOString() });
}
