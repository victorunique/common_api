export default function handler(req, res) {
  // ---- CORS headers ----
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-api-key'
  );
  res.setHeader('Cache-Control', 'no-store');

  // ---- Handle preflight ----
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ---- API key auth ----
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ---- Read timezone parameter ----
  const timezone =
    req.query.timezone && req.query.timezone.trim() !== ''
      ? req.query.timezone
      : 'UTC';

  // ---- Generate time ----
  let formattedTime;
  try {
    formattedTime = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());
  } catch (err) {
    return res.status(400).json({
      error: 'Invalid timezone',
      example: 'Europe/Dublin'
    });
  }

  // ---- Response ----
  res.status(200).json({
    timezone,
    datetime: formattedTime,
    iso_utc: new Date().toISOString()
  });
}
