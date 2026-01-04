// api/time.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');  // allow any domain
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const now = new Date();
  res.status(200).json({ datetime: now.toISOString() });
}
