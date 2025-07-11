const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
}); 