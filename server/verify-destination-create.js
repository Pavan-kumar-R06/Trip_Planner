const http = require('http');

const payload = JSON.stringify({
  slug: 'debug-empty-2',
  name: 'Debug',
  state: 'Test',
  tagline: 'Test',
  image: '/debug.png',
  description: 'Test',
  baseBudget: 1000,
  rating: 4.5,
  bestTime: 'Now',
  idealDays: '1 day',
  attractions: [{ name: '', description: '' }],
  highlights: [''],
  itinerary: [{ title: '', activities: [''], attractions: [''], meals: '', estimatedExpense: 0 }],
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 5000,
    path: '/api/destinations',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      console.log('STATUS', res.statusCode);
      console.log(body);
    });
  }
);

req.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

req.write(payload);
req.end();
