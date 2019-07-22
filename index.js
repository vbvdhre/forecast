const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.use(require('./api'));
app.listen(port, () => {
  console.log(`serevr listening on ${port}`);
})
