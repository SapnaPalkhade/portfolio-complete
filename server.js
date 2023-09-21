const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  let filePath = '.' + req.url;


  if (filePath === './') {
    filePath = './index.html';
  }


  const absPath = path.resolve(filePath);

 
  fs.exists(absPath, (exists) => {
    if (exists) {
     
      fs.readFile(absPath, (err, data) => {
        if (err) {
          
          res.writeHead(500);
          res.end('Server Error');
        } else {
    
          const extname = path.extname(absPath);
          let contentType = 'text/html';
          if (extname === '.js') {
            contentType = 'text/javascript';
          } else if (extname === '.css') {
            contentType = 'text/css';
          }

          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    } else {
      // If the file doesn't exist, return a 404 error
      res.writeHead(404);
      res.end('File Not Found');
    }
  });
});

// Set the port for the server to listen on
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
