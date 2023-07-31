const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

// Create a new Express app
const server = express();

// Create a custom API handler route
server.get('/check-api', async (req, res) => {
  // Your API logic goes here
  // Example: const data = await fetchSomeData();
  // res.json(data);
  res.status(200).json({ message: 'Hello from API!' });
});

server.use('/api', async (req, res) => {
  // ADD YOUR API ROUTES HERE
})

// For all other routes, let Next.js handle them
server.get('*', (req, res) => {
  return handle(req, res);
});

app.prepare().then(() => {
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
