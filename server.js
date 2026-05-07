/* ============================================
   SERVER.JS - NODE.JS BACKEND
   Manages the contact form and stores
   messages in messages.json
   No external dependencies required (no npm install)
   ============================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;

/* ============================================
   CREATE HTTP SERVER
   ============================================ */
const server = http.createServer((req, res) => {
    
    /* ============================================
       CORS HEADERS - Allow requests from any origin
       ============================================ */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    /* ============================================
       HANDLE PREFLIGHT OPTIONS REQUEST
       ============================================ */
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    /* ============================================
       POST /api/contact - SAVE MESSAGE TO JSON
       ============================================ */
    if (req.method === 'POST' && req.url === '/api/contact') {
        let body = '';

        /* Collect request body data */
        req.on('data', chunk => {
            body += chunk.toString();
        });

        /* Process complete request */
        req.on('end', () => {
            try {
                /* Parse JSON body */
                const { email, message } = JSON.parse(body);

                /* Validate required fields */
                if (!email || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Email and message are required' }));
                    return;
                }

                /* Validate email format */
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid email format' }));
                    return;
                }

                /* Read existing messages from JSON file */
                let messages = [];
                const filePath = path.join(__dirname, 'messages.json');

                if (fs.existsSync(filePath)) {
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    messages = JSON.parse(fileContent);
                }

                /* Create new message object */
                const newMessage = {
                    id: Date.now(),
                    email: email,
                    message: message,
                    date: new Date().toLocaleString()
                };

                /* Add to messages array */
                messages.push(newMessage);

                /* Write updated messages to JSON file */
                fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8');

                /* Log to console for verification */
                console.log('New message saved:', newMessage);

                /* Send success response */
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Message saved successfully' }));

            } catch (err) {
                /* Handle JSON parse errors or other exceptions */
                console.error('Error processing request:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            }
        });
        return;
    }

    /* ============================================
       GET /api/messages - RETRIEVE ALL MESSAGES
       (Optional: to view saved messages)
       ============================================ */
    if (req.method === 'GET' && req.url === '/api/messages') {
        const filePath = path.join(__dirname, 'messages.json');

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(fileContent);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([]));
        }
        return;
    }

    /* ============================================
       SERVE STATIC FILES (HTML, CSS, JS, Images)
       ============================================ */
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath).toLowerCase();
    
    /* MIME types for different file extensions */
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.webp': 'image/webp'
    };

    /* Read and serve the requested file */
    fs.readFile(filePath, (err, content) => {
        if (err) {
            /* File not found - return 404 */
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            /* File found - serve with appropriate MIME type */
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

/* ============================================
   START SERVER
   ============================================ */
server.listen(PORT, () => {
    console.log('============================================');
    console.log('Server running at http://localhost:' + PORT);
    console.log('============================================');
    console.log('Press Ctrl+C to stop the server');
});