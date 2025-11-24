import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), "data.json");
    const file = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // HTML webpage
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Messages</title>
        <style>
            body { 
                font-family: Arial; 
                background: #101010; 
                color: white; 
                padding: 20px; 
            }
            h1 { font-weight: 300; }
            .msg {
                background: #181818;
                padding: 15px;
                margin-bottom: 10px;
                border-radius: 10px;
            }
            .user { font-weight: bold; }
            .time { font-size: 12px; opacity: 0.6; }
        </style>
    </head>
    <body>
        <h1>📩 Messages</h1>
        ${file.messages.map(m => `
            <div class="msg">
                <div class="user">${m.user}</div>
                <div>${m.message}</div>
                <div class="time">${m.time}</div>
            </div>
        `).join("")}
    </body>
    </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
}
