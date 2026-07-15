const fs = require('fs');

const fileName = 'sample.txt';
const content = 'Hello, this is a simple Node.js file example.';

fs.writeFile(fileName, content, (err) => {
  if (err) {
    console.error('Write error:', err);
    return;
  }

  console.log('File created and written successfully.');

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error('Read error:', err);
      return;
    }

    console.log('File content:', data);
  });
});